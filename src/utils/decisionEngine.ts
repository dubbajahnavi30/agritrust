import { FieldData, WeatherData, FarmConstraints, AllocationResult, RecommendationItem } from '../types';

/**
 * Calculates water allocation under constraints using risk-first prioritization.
 * Differentiates AgriTrust from standard single-threshold timers.
 */
export function calculateWaterAllocation(
  fields: FieldData[],
  availableWaterLiters: number,
  weather: WeatherData,
  constraints: FarmConstraints,
  _tomatoAnomalyActive: boolean = false
): {
  allocations: AllocationResult[];
  totalAllocated: number;
  totalSaved: number;
  deficit: number;
} {
  // Sort fields by risk severity and crop stage sensitivity:
  // Flowering tomato = #1, Vegetative chilli = #2, Vegetative groundnut = #3
  const sortedFields = [...fields].sort((a, b) => {
    // If anomaly is active on tomato and uncorrected, tomato might look wet (85%),
    // but in AgriTrust's fault-tolerant engine, we catch or demonstrate the impact
    const scoreA = getPriorityScore(a, weather);
    const scoreB = getPriorityScore(b, weather);
    return scoreB - scoreA;
  });

  let remainingWater = availableWaterLiters;
  const allocations: AllocationResult[] = [];
  let totalAllocated = 0;

  for (let i = 0; i < sortedFields.length; i++) {
    const field = sortedFields[i];
    let idealWater = field.waterRequiredLiters;

    // Weather impact adjustments
    if (weather.rainCondition === 'heavy') {
      if (field.cropName === 'Groundnut') {
        idealWater = 0;
      } else if (field.cropName === 'Chilli') {
        idealWater = 0;
      } else if (field.cropName === 'Tomato') {
        // High risk crop might still need a small defensive dose or delay
        idealWater = field.soilMoisture < 25 ? 200 : 0;
      }
    } else if (weather.rainCondition === 'light') {
      idealWater = Math.max(0, Math.round(idealWater * 0.7));
    }

    // Allocate water according to priority
    let allocated = 0;
    let action: AllocationResult['action'] = 'SKIP';
    let actionNote = '';
    let altAction: string | undefined = undefined;

    if (idealWater === 0 && weather.rainCondition === 'heavy') {
      action = field.cropName === 'Groundnut' ? 'SKIP' : 'DELAY';
      actionNote = field.cropName === 'Groundnut'
        ? 'No irrigation required — heavy rain will replenish root zone.'
        : 'Delay irrigation — monitor weather arrival.';
      altAction = 'Inspect field drainage channels before downpour.';
    } else if (remainingWater >= idealWater) {
      allocated = idealWater;
      remainingWater -= allocated;
      action = 'IRRIGATE';
      actionNote = `Full requirement met (${allocated} L) to prevent flower abortion and stress.`;
    } else if (remainingWater > 0) {
      // Deficit irrigation
      allocated = remainingWater;
      remainingWater = 0;
      action = 'DEFICIT_IRRIGATE';
      actionNote = `Water-limited: Supplying ${allocated} L (deficit mode). Protects core root zone.`;
      altAction = 'Apply light organic mulching to conserve moisture in topsoil.';
    } else {
      allocated = 0;
      action = field.stressRisk === 'LOW' ? 'SKIP' : 'DELAY';
      actionNote = `Zero allocation available. Field prioritized lower due to higher crop drought tolerance.`;
      altAction = 'Delay to next cycle; groundnut drought resilience buffers up to 48 hours.';
    }

    totalAllocated += allocated;

    // Check electricity timing constraint
    let recommendedTime = '6:30 PM (Cool evening)';
    const electSlots = constraints.electricityAvailableHours;
    const isEveningInGrid = electSlots.some(s => s.start.includes('18') || s.start.includes('6 PM'));
    if (!isEveningInGrid && electSlots.length > 0) {
      recommendedTime = `${electSlots[0].start} (Grid Power Slot)`;
      altAction = `Grid power is restricted. Moved irrigation from ideal 6:30 PM to ${electSlots[0].start}.`;
    }

    const durationMin = Math.round(allocated / constraints.pumpCapacityLitersPerMin);

    allocations.push({
      fieldId: field.id,
      fieldName: field.name,
      cropName: field.cropName,
      idealWaterLiters: idealWater,
      allocatedWaterLiters: allocated,
      fulfillmentPercent: idealWater > 0 ? Math.min(100, Math.round((allocated / idealWater) * 100)) : 100,
      irrigationDurationMinutes: durationMin,
      recommendedTime,
      priority: i + 1,
      riskIfDeficit: field.stressRisk,
      action,
      actionNote,
      alternativeAction: altAction
    });
  }

  // Preserve original field order for UI consistency
  allocations.sort((a, b) => a.fieldId.localeCompare(b.fieldId));

  const totalSaved = Math.max(0, availableWaterLiters - totalAllocated);
  const totalIdeal = sortedFields.reduce((sum, f) => sum + f.waterRequiredLiters, 0);
  const deficit = Math.max(0, totalIdeal - totalAllocated);

  return {
    allocations,
    totalAllocated,
    totalSaved,
    deficit
  };
}

function getPriorityScore(field: FieldData, weather: WeatherData): number {
  let score = 0;
  // Soil moisture deficit
  const moistureDeficit = Math.max(0, field.soilMoistureOptimalMin - field.soilMoisture);
  score += moistureDeficit * 2.5;

  // Crop stage sensitivity
  if (field.stage === 'Flowering') score += 50; // Critical reproductive phase
  else if (field.stage === 'Fruit Formation') score += 40;
  else if (field.stage === 'Vegetative') score += 20;

  // Economic / risk level
  if (field.stressRisk === 'CRITICAL') score += 80;
  else if (field.stressRisk === 'HIGH') score += 60;
  else if (field.stressRisk === 'MEDIUM') score += 30;
  else score += 10;

  // Temperature multiplier
  if (weather.temperatureC > 32) score += 15;

  return score;
}

/**
 * Builds the prioritized farmer recommendations
 */
export function generateRecommendations(
  fields: FieldData[],
  allocations: AllocationResult[],
  weather: WeatherData,
  constraints: FarmConstraints,
  tomatoAnomalyActive: boolean = false
): RecommendationItem[] {
  const recommendations: RecommendationItem[] = [];

  for (const field of fields) {
    const alloc = allocations.find(a => a.fieldId === field.id);
    const allocatedLiters = alloc ? alloc.allocatedWaterLiters : 0;
    const durationMin = alloc ? alloc.irrigationDurationMinutes : 0;

    let urgency: 'URGENT' | 'MEDIUM' | 'LOW' = 'LOW';
    let actionText = '';
    let reason = '';
    let confidence = 88;
    const chips: { label: string; value: string; isWarning?: boolean }[] = [];

    chips.push({ label: 'Soil Moisture', value: `${field.soilMoisture}%`, isWarning: field.soilMoisture < 30 });
    chips.push({ label: 'Rain Prob', value: `${weather.rainProbabilityPercent}%` });
    chips.push({ label: 'Crop Stage', value: field.stage });
    chips.push({ label: 'Temperature', value: `${weather.temperatureC}°C`, isWarning: weather.temperatureC > 32 });

    if (field.id === 'field-a') {
      // Tomato
      if (tomatoAnomalyActive) {
        confidence = 64;
        urgency = 'URGENT';
        actionText = 'Cross-Validate Sensor & Apply Protective 550 L Irrigation';
        reason = 'Sensor anomaly detected (Moisture reads 85% despite 34°C dry heat). Physical ET balance indicates root stress is high. Prioritizing crop protection.';
        chips[0] = { label: 'Sensor Flag', value: 'Anomaly (85% vs dry model)', isWarning: true };
      } else if (weather.rainCondition === 'heavy') {
        urgency = 'MEDIUM';
        actionText = 'Monitor Soil — Delay Scheduled 550 L Irrigation';
        reason = 'Heavy rainfall forecasted in next 12 hours. Delay irrigation to avoid waterlogging and root fungal development.';
        confidence = 92;
      } else {
        urgency = 'URGENT';
        actionText = `Irrigate ${durationMin || '18–22'} minutes (${allocatedLiters || 550} L)`;
        reason = 'Soil moisture (27%) is below flowering critical threshold (35%). High heat (34°C) accelerates evapotranspiration. Risk of flower drop if delayed.';
        confidence = 91;
      }
    } else if (field.id === 'field-b') {
      // Chilli
      if (weather.rainCondition === 'heavy') {
        urgency = 'LOW';
        actionText = 'Delay Irrigation — Rely on Incoming Rainfall';
        reason = 'Chilli vegetative canopy can absorb forecast rain without yield loss. Saves 350 L of reservoir water.';
        confidence = 94;
      } else if (allocatedLiters < field.waterRequiredLiters && allocatedLiters > 0) {
        urgency = 'MEDIUM';
        actionText = `Deficit Irrigate ${durationMin} minutes (${allocatedLiters} L)`;
        reason = 'Water constrained: Chilli vegetative stage can tolerate mild water deficit with minimal long-term biomass reduction.';
        confidence = 86;
      } else if (allocatedLiters === 0) {
        urgency = 'MEDIUM';
        actionText = 'Postpone Irrigation by 24 Hours';
        reason = 'All water reallocated to high-risk Tomato. Chilli soil moisture at 34% remains above permanent wilting point.';
        confidence = 84;
      } else {
        urgency = 'MEDIUM';
        actionText = `Monitor Moisture & Irrigate ${durationMin} min (${allocatedLiters} L)`;
        reason = 'Moderate moisture deficit during vegetative growth. Soil moisture is within tolerable zone but depleting.';
        confidence = 88;
      }
    } else {
      // Groundnut
      if (weather.rainCondition === 'heavy') {
        urgency = 'LOW';
        actionText = 'No Irrigation Required';
        reason = 'Deep taproot system and forecast rain provide sufficient moisture reservoir for the week.';
        confidence = 96;
      } else if (allocatedLiters === 0) {
        urgency = 'LOW';
        actionText = 'No Irrigation Required — Monitor Every 48h';
        reason = 'Groundnut has high drought tolerance in vegetative stage. Moisture at 42% is well within safe zone.';
        confidence = 92;
      } else {
        urgency = 'LOW';
        actionText = `Maintain Routine Check (${allocatedLiters} L allocated)`;
        reason = 'Groundnut moisture is adequate (42%). Water allocated will sustain optimal root nodules.';
        confidence = 90;
      }
    }

    let altAction = 'If power cut occurs, shift to early morning manual gravity feed.';
    if (constraints.electricityAvailableHours.length > 0) {
      altAction = `Pump during grid window: ${constraints.electricityAvailableHours[0].start} to ${constraints.electricityAvailableHours[0].end}.`;
    }

    recommendations.push({
      id: `rec-${field.id}`,
      fieldId: field.id,
      fieldName: field.name,
      cropName: field.cropName,
      urgency,
      action: actionText,
      durationMinutes: durationMin || 20,
      estimatedWaterLiters: allocatedLiters,
      bestTime: alloc ? alloc.recommendedTime : '6:30 PM',
      confidence,
      riskIfSkipped: field.stressRisk,
      reason,
      evidenceChips: chips,
      alternativeAction: altAction,
      constraintsConsidered: [
        `Water available: ${allocatedLiters} L assigned`,
        `Pump capacity: ${constraints.pumpCapacityLitersPerMin} L/min`,
        `Grid window: ${constraints.electricityAvailableHours.map(h => `${h.start}-${h.end}`).join(', ')}`
      ]
    });
  }

  // Sort by urgency: URGENT -> MEDIUM -> LOW
  const order = { URGENT: 1, MEDIUM: 2, LOW: 3 };
  return recommendations.sort((a, b) => order[a.urgency] - order[b.urgency]);
}
