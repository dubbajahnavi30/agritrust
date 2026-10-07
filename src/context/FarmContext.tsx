import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { FieldData, WeatherData, FarmConstraints, AllocationResult, RecommendationItem, CropGrowthStage, RiskLevel } from '../types';
import { initialFields, initialWeather, initialConstraints } from '../data/mockData';
import { calculateWaterAllocation, generateRecommendations } from '../utils/decisionEngine';
import { LanguageCode, translations, translateText } from '../i18n/translations';
import { cropsCatalog } from '../data/cropsCatalog';

export type AppPage =
  | 'landing'
  | 'dashboard'
  | 'fields'
  | 'simulator'
  | 'explanation'
  | 'sensors'
  | 'crops'
  | 'weather'
  | 'recommendations'
  | 'whatif'
  | 'settings';

interface FarmContextType {
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isCropModalOpen: boolean;
  setIsCropModalOpen: (open: boolean) => void;
  targetFieldForCropChange: string | null;
  setTargetFieldForCropChange: (fieldId: string | null) => void;
  openCropModalForField: (fieldId: string) => void;
  changeFieldCrop: (
    fieldId: string,
    cropId: string,
    variety: string,
    stage: CropGrowthStage
  ) => void;
  availableWater: number;
  setAvailableWater: (liters: number) => void;
  rainCondition: 'none' | 'light' | 'heavy';
  setRainCondition: (condition: 'none' | 'light' | 'heavy') => void;
  tomatoAnomalyActive: boolean;
  setTomatoAnomalyActive: (active: boolean) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isTechnicalView: boolean;
  setIsTechnicalView: (tech: boolean) => void;
  isJudgeTourOpen: boolean;
  setIsJudgeTourOpen: (open: boolean) => void;
  judgeTourStep: number;
  setJudgeTourStep: (step: number) => void;
  fields: FieldData[];
  setFields: React.Dispatch<React.SetStateAction<FieldData[]>>;
  weather: WeatherData;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData>>;
  constraints: FarmConstraints;
  setConstraints: React.Dispatch<React.SetStateAction<FarmConstraints>>;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  allocationsResult: {
    allocations: AllocationResult[];
    totalAllocated: number;
    totalSaved: number;
    deficit: number;
  };
  recommendations: RecommendationItem[];
  highRiskCount: number;
  avgConfidence: number;
  irrigationNeededCount: number;
  resetToDefaultDemo: () => void;
  applyJudgeScenarioStep: (stepIndex: number) => void;
  syncNow: () => void;
  lastSyncTime: string;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<AppPage>('landing');
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('agritrust_language');
      if (saved && ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'es'].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('agritrust_language', lang);
    } catch {
      // ignore
    }
  }, []);

  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [targetFieldForCropChange, setTargetFieldForCropChange] = useState<string | null>(null);

  const [availableWater, setAvailableWater] = useState<number>(2000);
  const [rainCondition, setRainCondition] = useState<'none' | 'light' | 'heavy'>('none');
  const [tomatoAnomalyActive, setTomatoAnomalyActive] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isTechnicalView, setIsTechnicalView] = useState<boolean>(false);
  const [isJudgeTourOpen, setIsJudgeTourOpen] = useState<boolean>(false);
  const [judgeTourStep, setJudgeTourStep] = useState<number>(0);
  const [fields, setFields] = useState<FieldData[]>(initialFields);
  const [weather, setWeather] = useState<WeatherData>(initialWeather);
  const [constraints, setConstraints] = useState<FarmConstraints>(initialConstraints);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Universal translation helper
  const t = useCallback(
    (keyOrText: string): string => {
      return translateText(keyOrText, language);
    },
    [language]
  );

  // Farmer's Choice of Crop function
  const openCropModalForField = (fieldId: string) => {
    setTargetFieldForCropChange(fieldId);
    setIsCropModalOpen(true);
  };

  const changeFieldCrop = (
    fieldId: string,
    cropId: string,
    variety: string,
    stage: CropGrowthStage
  ) => {
    const cropInfo = cropsCatalog.find((c) => c.id === cropId);
    if (!cropInfo) return;

    setFields((prev) =>
      prev.map((field) => {
        if (field.id === fieldId) {
          // Determine stress risk based on moisture vs new optimal
          let stressRisk: RiskLevel = cropInfo.defaultStressRisk;
          if (field.soilMoisture < cropInfo.optimalMoistureMin - 5) {
            stressRisk = 'HIGH';
          } else if (field.soilMoisture < cropInfo.optimalMoistureMin) {
            stressRisk = 'MEDIUM';
          } else {
            stressRisk = 'LOW';
          }

          // Stage vulnerability multiplier
          if (stage === 'Flowering' && stressRisk === 'MEDIUM') {
            stressRisk = 'HIGH';
          }

          return {
            ...field,
            cropName: cropInfo.name,
            cropVariety: variety,
            stage,
            soilMoistureOptimalMin: cropInfo.optimalMoistureMin,
            soilMoistureOptimalMax: cropInfo.optimalMoistureMax,
            waterRequiredLiters: cropInfo.baseWaterNeedLiters,
            economicSensitivity: cropInfo.economicSensitivity,
            stressRisk,
            moistureHistory: field.moistureHistory.map((m) => ({
              ...m,
              threshold: cropInfo.optimalMoistureMin
            }))
          };
        }
        return field;
      })
    );

    setIsCropModalOpen(false);
  };

  // Keep weather in sync with rain condition toggle
  const activeWeather = useMemo(() => {
    let rainProb = 18;
    let expRain = 2;
    if (rainCondition === 'heavy') {
      rainProb = 85;
      expRain = 28;
    } else if (rainCondition === 'light') {
      rainProb = 50;
      expRain = 6;
    }
    return {
      ...weather,
      rainCondition,
      rainProbabilityPercent: rainProb,
      expectedRainfallMm: expRain
    };
  }, [weather, rainCondition]);

  // Adjust fields based on tomato anomaly state
  const activeFields = useMemo(() => {
    return fields.map((f) => {
      if (f.id === 'field-a') {
        const sensors = f.sensors.map((s) => {
          if (s.type === 'soil_moisture') {
            return {
              ...s,
              currentValue: tomatoAnomalyActive ? 85 : 27,
              status: tomatoAnomalyActive ? ('Anomaly' as const) : ('Reliable' as const),
              confidence: tomatoAnomalyActive ? 58 : 94,
              anomalyDetected: tomatoAnomalyActive,
              anomalyReason: tomatoAnomalyActive
                ? 'Sensor reports 85% (saturated), but air is 34°C, 0mm rain, and ET model predicts 27%.'
                : undefined
            };
          }
          return s;
        });

        return {
          ...f,
          soilMoisture: tomatoAnomalyActive ? 85 : 27,
          sensors
        };
      }
      return f;
    });
  }, [fields, tomatoAnomalyActive]);

  // Dynamic calculations
  const allocationsResult = useMemo(() => {
    return calculateWaterAllocation(
      activeFields,
      availableWater,
      activeWeather,
      constraints,
      tomatoAnomalyActive
    );
  }, [activeFields, availableWater, activeWeather, constraints, tomatoAnomalyActive]);

  const recommendations = useMemo(() => {
    return generateRecommendations(
      activeFields,
      allocationsResult.allocations,
      activeWeather,
      constraints,
      tomatoAnomalyActive
    );
  }, [activeFields, allocationsResult, activeWeather, constraints, tomatoAnomalyActive]);

  const highRiskCount = useMemo(() => {
    return activeFields.filter((f) => f.stressRisk === 'HIGH' || f.stressRisk === 'CRITICAL').length;
  }, [activeFields]);

  const irrigationNeededCount = useMemo(() => {
    return allocationsResult.allocations.filter((a) => a.action === 'IRRIGATE' || a.action === 'DEFICIT_IRRIGATE').length;
  }, [allocationsResult]);

  const avgConfidence = useMemo(() => {
    if (tomatoAnomalyActive) return 74;
    return 87;
  }, [tomatoAnomalyActive]);

  const resetToDefaultDemo = () => {
    setAvailableWater(2000);
    setRainCondition('none');
    setTomatoAnomalyActive(false);
    setIsOffline(false);
    setFields(initialFields);
    setWeather(initialWeather);
    setConstraints(initialConstraints);
    setLastSyncTime('Just now');
  };

  const syncNow = () => {
    setLastSyncTime('Just now');
  };

  const applyJudgeScenarioStep = (stepIndex: number) => {
    setJudgeTourStep(stepIndex);
    switch (stepIndex) {
      case 0: // Baseline 2,000L
        setAvailableWater(2000);
        setRainCondition('none');
        setTomatoAnomalyActive(false);
        setActivePage('dashboard');
        break;
      case 1: // 3 fields review
        setActivePage('fields');
        break;
      case 2: // Crop risks explanation
        setActivePage('crops');
        break;
      case 3: // Reduce water to 1,000L
        setAvailableWater(1000);
        setActivePage('simulator');
        break;
      case 4: // Automatic reprioritization view
        setActivePage('simulator');
        break;
      case 5: // Heavy rain tomorrow
        setRainCondition('heavy');
        setActivePage('simulator');
        break;
      case 6: // Recommendations change
        setActivePage('recommendations');
        break;
      case 7: // Faulty sensor reading 85%
        setTomatoAnomalyActive(true);
        setActivePage('sensors');
        break;
      case 8: // Anomaly detected
        setActivePage('sensors');
        break;
      case 9: // Final explainable recommendation & summary
        setActivePage('explanation');
        break;
      default:
        break;
    }
  };

  return (
    <FarmContext.Provider
      value={{
        activePage,
        setActivePage,
        language,
        setLanguage,
        t,
        isCropModalOpen,
        setIsCropModalOpen,
        targetFieldForCropChange,
        setTargetFieldForCropChange,
        openCropModalForField,
        changeFieldCrop,
        availableWater,
        setAvailableWater,
        rainCondition,
        setRainCondition,
        tomatoAnomalyActive,
        setTomatoAnomalyActive,
        isOffline,
        setIsOffline,
        isTechnicalView,
        setIsTechnicalView,
        isJudgeTourOpen,
        setIsJudgeTourOpen,
        judgeTourStep,
        setJudgeTourStep,
        fields: activeFields,
        setFields,
        weather: activeWeather,
        setWeather,
        constraints,
        setConstraints,
        selectedFieldId,
        setSelectedFieldId,
        allocationsResult,
        recommendations,
        highRiskCount,
        avgConfidence,
        irrigationNeededCount,
        resetToDefaultDemo,
        applyJudgeScenarioStep,
        syncNow,
        lastSyncTime
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
