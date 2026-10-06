import { CropGrowthStage, RiskLevel } from '../types';

export interface CropCatalogItem {
  id: string;
  name: string;
  scientificName: string;
  category: 'Vegetable' | 'Cash Crop' | 'Grain' | 'Legume' | 'Tuber';
  varieties: string[];
  stages: CropGrowthStage[];
  optimalMoistureMin: number;
  optimalMoistureMax: number;
  baseWaterNeedLiters: number;
  economicSensitivity: 'High' | 'Medium' | 'Low';
  defaultStressRisk: RiskLevel;
  iconColor: string;
  description: string;
}

export const cropsCatalog: CropCatalogItem[] = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    varieties: ['Arka Rakshak F1', 'Pusa Ruby', 'Himsona Hybrid'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 35,
    optimalMoistureMax: 50,
    baseWaterNeedLiters: 550,
    economicSensitivity: 'High',
    defaultStressRisk: 'HIGH',
    iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'High-value crop. Highly vulnerable during flowering; water deficit triggers immediate flower drop.'
  },
  {
    id: 'crop-chilli',
    name: 'Chilli',
    scientificName: 'Capsicum annuum',
    category: 'Cash Crop',
    varieties: ['Guntur Sannam', 'Byadgi', 'Pusa Jwala'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 35,
    optimalMoistureMax: 48,
    baseWaterNeedLiters: 350,
    economicSensitivity: 'Medium',
    defaultStressRisk: 'MEDIUM',
    iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
    description: 'Moderate drought tolerance during vegetative growth. Sensitive during fruit set.'
  },
  {
    id: 'crop-groundnut',
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    category: 'Legume',
    varieties: ['Kadiri 6', 'TMV 2', 'TAG 24'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation'],
    optimalMoistureMin: 30,
    optimalMoistureMax: 45,
    baseWaterNeedLiters: 100,
    economicSensitivity: 'Low',
    defaultStressRisk: 'LOW',
    iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Drought-hardy legume with deep taproots. Natural buffer crop during severe reservoir shortages.'
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crop',
    varieties: ['Bt Cotton Hybrid', 'Suraj', 'RCH-2'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation'],
    optimalMoistureMin: 35,
    optimalMoistureMax: 52,
    baseWaterNeedLiters: 620,
    economicSensitivity: 'High',
    defaultStressRisk: 'HIGH',
    iconColor: 'text-sky-700 bg-sky-50 border-sky-200',
    description: 'Long-duration cash crop. Square and boll formation require consistent moisture.'
  },
  {
    id: 'crop-maize',
    name: 'Maize / Corn',
    scientificName: 'Zea mays',
    category: 'Grain',
    varieties: ['Pioneer Hybrid', 'NK-6240', 'Ganga 11'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 38,
    optimalMoistureMax: 55,
    baseWaterNeedLiters: 420,
    economicSensitivity: 'Medium',
    defaultStressRisk: 'MEDIUM',
    iconColor: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    description: 'Tasseling and silking (flowering) phases cannot tolerate water stress without ear yield collapse.'
  },
  {
    id: 'crop-paddy',
    name: 'Paddy / Rice',
    scientificName: 'Oryza sativa',
    category: 'Grain',
    varieties: ['Sona Masuri', 'IR 64', 'Basmati 1121'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 55,
    optimalMoistureMax: 75,
    baseWaterNeedLiters: 850,
    economicSensitivity: 'High',
    defaultStressRisk: 'HIGH',
    iconColor: 'text-teal-700 bg-teal-50 border-teal-200',
    description: 'Heavy water-demanding cereal. Highly sensitive to soil saturation drops below 50%.'
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Grain',
    varieties: ['HD-2967', 'PBW-343', 'Sharbati'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 35,
    optimalMoistureMax: 50,
    baseWaterNeedLiters: 380,
    economicSensitivity: 'Medium',
    defaultStressRisk: 'MEDIUM',
    iconColor: 'text-amber-800 bg-amber-50 border-amber-200',
    description: 'Crown root initiation and flowering are critical moisture milestones.'
  },
  {
    id: 'crop-onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetable',
    varieties: ['Nashik Red', 'Bhima Super', 'Pusa Red'],
    stages: ['Vegetative', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 40,
    optimalMoistureMax: 55,
    baseWaterNeedLiters: 390,
    economicSensitivity: 'High',
    defaultStressRisk: 'HIGH',
    iconColor: 'text-purple-700 bg-purple-50 border-purple-200',
    description: 'Shallow root system requires frequent light irrigations; bulb splitting occurs if stressed.'
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Tuber',
    varieties: ['Kufri Jyoti', 'Kufri Pukhraj', 'Kufri Bahar'],
    stages: ['Vegetative', 'Fruit Formation', 'Ripening'],
    optimalMoistureMin: 45,
    optimalMoistureMax: 60,
    baseWaterNeedLiters: 460,
    economicSensitivity: 'High',
    defaultStressRisk: 'HIGH',
    iconColor: 'text-stone-700 bg-stone-100 border-stone-300',
    description: 'Tuber initiation and bulking demand steady root-zone moisture to avoid misshapen tubers.'
  },
  {
    id: 'crop-soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Legume',
    varieties: ['JS-335', 'JS-9560', 'NRC-37'],
    stages: ['Vegetative', 'Flowering', 'Fruit Formation'],
    optimalMoistureMin: 35,
    optimalMoistureMax: 50,
    baseWaterNeedLiters: 310,
    economicSensitivity: 'Medium',
    defaultStressRisk: 'MEDIUM',
    iconColor: 'text-lime-800 bg-lime-50 border-lime-200',
    description: 'Oilseed legume. Pod-filling stage requires adequate moisture to prevent seed shriveling.'
  }
];
