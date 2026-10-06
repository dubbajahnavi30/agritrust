export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type CropGrowthStage = 'Germination' | 'Vegetative' | 'Flowering' | 'Fruit Formation' | 'Ripening';

export interface FieldSensorData {
  id: string;
  name: string;
  type: 'soil_moisture' | 'temperature' | 'humidity' | 'solar_radiation' | 'ec_salinity';
  currentValue: number;
  unit: string;
  status: 'Reliable' | 'Warning' | 'Anomaly';
  confidence: number; // 0 - 100
  historicalAvg: number;
  anomalyDetected: boolean;
  anomalyReason?: string;
  lastUpdated: string;
}

export interface FieldData {
  id: string;
  name: string;
  cropName: string;
  cropVariety: string;
  areaHectares: number;
  stage: CropGrowthStage;
  soilMoisture: number; // percentage
  soilMoistureOptimalMin: number;
  soilMoistureOptimalMax: number;
  stressRisk: RiskLevel;
  waterRequiredLiters: number;
  priorityRank: number; // 1 = highest
  soilType: string;
  lastIrrigated: string;
  healthScore: number; // 0 - 100
  waterStress: number; // 0 - 100
  nutrientStress: number; // 0 - 100
  heatStress: number; // 0 - 100
  diseaseRisk: RiskLevel;
  sensors: FieldSensorData[];
  moistureHistory: { time: string; moisture: number; threshold: number }[];
  economicSensitivity: 'High' | 'Medium' | 'Low'; // e.g. flowering tomato
}

export interface WeatherData {
  temperatureC: number;
  humidityPercent: number;
  rainProbabilityPercent: number;
  expectedRainfallMm: number;
  windSpeedKmh: number;
  uvIndex: number;
  evapotranspirationMmDay: number;
  rainCondition: 'none' | 'light' | 'heavy';
  forecast24h: {
    hour: string;
    temp: number;
    rainProb: number;
    rainfallMm: number;
    humidity: number;
  }[];
}

export interface FarmConstraints {
  electricityAvailableHours: { start: string; end: string }[];
  pumpCapacityLitersPerMin: number;
  maxDailyWaterBudgetLiters: number;
  preferredIrrigationWindow: 'Early Morning (5-8 AM)' | 'Evening (5-8 PM)' | 'Night (8-11 PM)';
  laborAvailable: boolean;
}

export interface AllocationResult {
  fieldId: string;
  fieldName: string;
  cropName: string;
  idealWaterLiters: number;
  allocatedWaterLiters: number;
  fulfillmentPercent: number;
  irrigationDurationMinutes: number;
  recommendedTime: string;
  priority: number;
  riskIfDeficit: RiskLevel;
  action: 'IRRIGATE' | 'DEFICIT_IRRIGATE' | 'DELAY' | 'SKIP' | 'MONITOR';
  actionNote: string;
  alternativeAction?: string;
}

export interface DecisionFactor {
  name: string;
  score: number; // 0-100
  weight: number; // 0-1
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
}

export interface RecommendationItem {
  id: string;
  fieldId: string;
  fieldName: string;
  cropName: string;
  urgency: 'URGENT' | 'MEDIUM' | 'LOW';
  action: string;
  durationMinutes: number;
  estimatedWaterLiters: number;
  bestTime: string;
  confidence: number;
  riskIfSkipped: RiskLevel;
  reason: string;
  evidenceChips: { label: string; value: string; isWarning?: boolean }[];
  alternativeAction: string;
  constraintsConsidered: string[];
}
