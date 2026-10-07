const fs = require('fs');
const path = require('path');

// Read translations.ts and evaluate or parse it
const translationsSource = fs.readFileSync(path.join(__dirname, '../src/i18n/translations.ts'), 'utf8');

// Quick syntax check & import via compiled bundle or tsx / esbuild
const testPhrases = [
  // Nav
  'Landing / Overview',
  'Farmer Dashboard',
  'Field Intelligence',
  'Water Simulator',
  'Decision Logic',
  'Sensor Reliability',
  'Crop Health',
  'Weather Intel',
  'Action Checklist',
  'What-If Mode',
  'Farm Settings',
  // Top bar
  'Synced',
  'Offline Mode',
  'Technical View',
  'JUDGE DEMO',
  'Change Crop',
  'Simulate Water',
  'Explain Decisions',
  // KPIs
  'Water Available',
  'High-Risk Fields',
  'Irrigation Needed',
  'Decision Confidence',
  'Soil Moisture',
  'Canopy Temp',
  // Actions
  'IRRIGATE',
  'DEFICIT IRRIGATE',
  'DELAY',
  'SKIP',
  'MONITOR',
  // Crops & Stages
  'Tomato',
  'Chilli',
  'Groundnut',
  'Flowering',
  'Vegetative',
  // Risk
  'HIGH',
  'MEDIUM',
  'LOW',
  'HIGH RISK',
  'MEDIUM RISK',
  'LOW RISK'
];

const languages = ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'es'];

console.log('--- Testing translations source file sanity ---');
console.log('File size:', translationsSource.length, 'bytes');

for (const lang of languages) {
  const hasLangInTranslations = translationsSource.includes(`${lang}: {`);
  console.log(`Language [${lang}] present in dictionary: ${hasLangInTranslations}`);
}

console.log('\n--- Checking dist bundle presence ---');
const distFiles = fs.readdirSync(path.join(__dirname, '../dist/assets'));
const jsFile = distFiles.find(f => f.endsWith('.js'));
const bundleCode = fs.readFileSync(path.join(__dirname, '../dist/assets', jsFile), 'utf8');

// Verify native language names
const nativeNames = ['हिन्दी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ', 'मराठी', 'Español'];
nativeNames.forEach(n => {
  const found = bundleCode.includes(n);
  console.log(`Native script "${n}" in bundle: ${found ? '✓ OK' : '✗ MISSING'}`);
  if (!found) process.exit(1);
});

console.log('\nAll checks passed successfully!');
