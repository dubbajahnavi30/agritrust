import { FieldData, WeatherData, FarmConstraints, DecisionFactor } from '../types';

export const initialFields: FieldData[] = [
  {
    id: 'field-a',
    name: 'Field A (North Slope)',
    cropName: 'Tomato',
    cropVariety: 'Arka Rakshak F1',
    areaHectares: 1.2,
    stage: 'Flowering',
    soilMoisture: 27,
    soilMoistureOptimalMin: 35,
    soilMoistureOptimalMax: 50,
    stressRisk: 'HIGH',
    waterRequiredLiters: 550,
    priorityRank: 1,
    soilType: 'Sandy Loam (Fast Draining)',
    lastIrrigated: '48 hours ago',
    healthScore: 82,
    waterStress: 78,
    nutrientStress: 18,
    heatStress: 65,
    diseaseRisk: 'LOW',
    economicSensitivity: 'High',
    sensors: [
      {
        id: 'sens-sm-a1',
        name: 'Root Zone Moisture Sensor A1',
        type: 'soil_moisture',
        currentValue: 27,
        unit: '%',
        status: 'Reliable',
        confidence: 94,
        historicalAvg: 33,
        anomalyDetected: false,
        lastUpdated: '5 mins ago'
      },
      {
        id: 'sens-tmp-a1',
        name: 'Canopy Temp Probe A1',
        type: 'temperature',
        currentValue: 34.2,
        unit: '°C',
        status: 'Reliable',
        confidence: 98,
        historicalAvg: 32.5,
        anomalyDetected: false,
        lastUpdated: '5 mins ago'
      },
      {
        id: 'sens-hum-a1',
        name: 'Microclimate Humidity A1',
        type: 'humidity',
        currentValue: 41,
        unit: '%',
        status: 'Warning',
        confidence: 62,
        historicalAvg: 48,
        anomalyDetected: false,
        anomalyReason: 'Slight drift detected compared to regional station',
        lastUpdated: '5 mins ago'
      }
    ],
    moistureHistory: [
      { time: '00:00', moisture: 34, threshold: 35 },
      { time: '04:00', moisture: 33, threshold: 35 },
      { time: '08:00', moisture: 31, threshold: 35 },
      { time: '12:00', moisture: 29, threshold: 35 },
      { time: '16:00', moisture: 28, threshold: 35 },
      { time: '20:00', moisture: 27, threshold: 35 }
    ]
  },
  {
    id: 'field-b',
    name: 'Field B (East Terraces)',
    cropName: 'Chilli',
    cropVariety: 'Guntur Sannam',
    areaHectares: 1.5,
    stage: 'Vegetative',
    soilMoisture: 34,
    soilMoistureOptimalMin: 35,
    soilMoistureOptimalMax: 48,
    stressRisk: 'MEDIUM',
    waterRequiredLiters: 350,
    priorityRank: 2,
    soilType: 'Red Loam',
    lastIrrigated: '36 hours ago',
    healthScore: 89,
    waterStress: 42,
    nutrientStress: 14,
    heatStress: 48,
    diseaseRisk: 'LOW',
    economicSensitivity: 'Medium',
    sensors: [
      {
        id: 'sens-sm-b1',
        name: 'Root Zone Moisture Sensor B1',
        type: 'soil_moisture',
        currentValue: 34,
        unit: '%',
        status: 'Reliable',
        confidence: 93,
        historicalAvg: 36,
        anomalyDetected: false,
        lastUpdated: '7 mins ago'
      },
      {
        id: 'sens-tmp-b1',
        name: 'Canopy Temp Probe B1',
        type: 'temperature',
        currentValue: 33.8,
        unit: '°C',
        status: 'Reliable',
        confidence: 97,
        historicalAvg: 32.0,
        anomalyDetected: false,
        lastUpdated: '7 mins ago'
      }
    ],
    moistureHistory: [
      { time: '00:00', moisture: 38, threshold: 35 },
      { time: '04:00', moisture: 37, threshold: 35 },
      { time: '08:00', moisture: 36, threshold: 35 },
      { time: '12:00', moisture: 35, threshold: 35 },
      { time: '16:00', moisture: 34, threshold: 35 },
      { time: '20:00', moisture: 34, threshold: 35 }
    ]
  },
  {
    id: 'field-c',
    name: 'Field C (South Basin)',
    cropName: 'Groundnut',
    cropVariety: 'Kadiri 6 (Drought Hardy)',
    areaHectares: 1.5,
    stage: 'Vegetative',
    soilMoisture: 42,
    soilMoistureOptimalMin: 30,
    soilMoistureOptimalMax: 45,
    stressRisk: 'LOW',
    waterRequiredLiters: 100,
    priorityRank: 3,
    soilType: 'Deep Sandy Clay Loam',
    lastIrrigated: '24 hours ago',
    healthScore: 94,
    waterStress: 14,
    nutrientStress: 11,
    heatStress: 36,
    diseaseRisk: 'LOW',
    economicSensitivity: 'Low',
    sensors: [
      {
        id: 'sens-sm-c1',
        name: 'Root Zone Moisture Sensor C1',
        type: 'soil_moisture',
        currentValue: 42,
        unit: '%',
        status: 'Reliable',
        confidence: 96,
        historicalAvg: 40,
        anomalyDetected: false,
        lastUpdated: '3 mins ago'
      },
      {
        id: 'sens-tmp-c1',
        name: 'Canopy Temp Probe C1',
        type: 'temperature',
        currentValue: 33.5,
        unit: '°C',
        status: 'Reliable',
        confidence: 98,
        historicalAvg: 32.2,
        anomalyDetected: false,
        lastUpdated: '3 mins ago'
      }
    ],
    moistureHistory: [
      { time: '00:00', moisture: 45, threshold: 30 },
      { time: '04:00', moisture: 44, threshold: 30 },
      { time: '08:00', moisture: 43, threshold: 30 },
      { time: '12:00', moisture: 43, threshold: 30 },
      { time: '16:00', moisture: 42, threshold: 30 },
      { time: '20:00', moisture: 42, threshold: 30 }
    ]
  }
];

export const initialWeather: WeatherData = {
  temperatureC: 34,
  humidityPercent: 42,
  rainProbabilityPercent: 18,
  expectedRainfallMm: 2,
  windSpeedKmh: 14,
  uvIndex: 8.4,
  evapotranspirationMmDay: 5.6,
  rainCondition: 'none',
  forecast24h: [
    { hour: '06:00', temp: 26, rainProb: 5, rainfallMm: 0, humidity: 65 },
    { hour: '09:00', temp: 30, rainProb: 10, rainfallMm: 0, humidity: 55 },
    { hour: '12:00', temp: 34, rainProb: 18, rainfallMm: 0.5, humidity: 42 },
    { hour: '15:00', temp: 35, rainProb: 20, rainfallMm: 1.0, humidity: 40 },
    { hour: '18:00', temp: 32, rainProb: 15, rainfallMm: 0.5, humidity: 48 },
    { hour: '21:00', temp: 29, rainProb: 10, rainfallMm: 0, humidity: 58 },
    { hour: '00:00', temp: 27, rainProb: 8, rainfallMm: 0, humidity: 62 },
    { hour: '03:00', temp: 25, rainProb: 5, rainfallMm: 0, humidity: 68 }
  ]
};

export const initialConstraints: FarmConstraints = {
  electricityAvailableHours: [
    { start: '07:00 AM', end: '09:00 AM' },
    { start: '06:00 PM', end: '10:00 PM' }
  ],
  pumpCapacityLitersPerMin: 25,
  maxDailyWaterBudgetLiters: 2500,
  preferredIrrigationWindow: 'Evening (5-8 PM)',
  laborAvailable: true
};

export const decisionFactorsTomato: DecisionFactor[] = [
  {
    name: 'Soil Moisture Level',
    score: 80,
    weight: 0.30,
    impact: 'HIGH',
    description: 'Current moisture (27%) is 8% below the critical flowering threshold of 35%.'
  },
  {
    name: 'Rain Probability',
    score: 20,
    weight: 0.20,
    impact: 'HIGH',
    description: '18% chance of rain (2 mm) is insufficient to recharge root zone moisture.'
  },
  {
    name: 'Crop Growth Stage',
    score: 90,
    weight: 0.25,
    impact: 'HIGH',
    description: 'Flowering stage has highest economic sensitivity; moisture stress causes flower drop.'
  },
  {
    name: 'Ambient Temperature',
    score: 70,
    weight: 0.15,
    impact: 'MEDIUM',
    description: 'High 34°C heat elevates evapotranspiration to 5.6 mm/day, accelerating drying.'
  },
  {
    name: 'Available Water Constraints',
    score: 40,
    weight: 0.10,
    impact: 'HIGH',
    description: 'Limited reservoir water must be directed to highest-risk yield protection.'
  }
];
