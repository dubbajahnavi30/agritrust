export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr' | 'es';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' }
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Brand & Taglines
    appName: 'AGRI-TRUST',
    tagline: 'Risk-Aware Agricultural Decision Intelligence',
    secondaryTagline: "Don't just irrigate. Prioritize risk.",
    subHero: 'AgriTrust combines soil, weather, crop-health and water-availability signals to recommend the safest farming action — even when resources are limited or data is uncertain.',
    
    // Navigation
    navOverview: 'Landing / Overview',
    navDashboard: 'Farmer Dashboard',
    navFields: 'Field Intelligence',
    navSimulator: 'Water Simulator',
    navExplanation: 'Decision Logic',
    navSensors: 'Sensor Reliability',
    navCrops: 'Crop Health',
    navWeather: 'Weather Intel',
    navRecommendations: 'Action Checklist',
    navWhatIf: 'What-If Mode',
    navSettings: 'Farm Settings',

    // Top Bar & Controls
    goodMorning: 'Good Morning, Farmer',
    greenValleyFarm: 'Green Valley Farm',
    demoFarm: 'Demo Farm',
    onlineSynced: 'Synced',
    offlineMode: 'Offline Mode',
    technicalView: 'Technical View',
    judgeDemo: 'JUDGE DEMO',
    changeCropBtn: 'Change Crop',

    // Dashboard KPIs
    waterAvailable: 'Water Available',
    highRiskFields: 'High-Risk Fields',
    irrigationNeeded: 'Irrigation Needed',
    decisionConfidence: 'Decision Confidence',
    todaysFarmDecision: "TODAY'S HIGHEST-PRIORITY DECISION",
    whyThisAction: 'WHY THIS ACTION? (EVIDENCE CHIPS)',
    riskIfSkipped: 'Risk if skipped',

    // Flow
    flowWater: 'Water',
    flowRisk: 'Risk',
    flowPriority: 'Priority',
    flowAction: 'Action',
    flowHeading: 'Visual Decision Flow: Water → Risk → Priority → Action',

    // Actions
    actionIrrigate: 'IRRIGATE',
    actionDeficit: 'DEFICIT IRRIGATE',
    actionDelay: 'DELAY',
    actionSkip: 'SKIP',
    actionMonitor: 'MONITOR',

    // Simulator
    simulatorTitle: 'Where Should Every Litre Go?',
    simulatorSub: 'See how AgriTrust reallocates limited water according to crop-loss risk.',
    sliderLabel: 'Available Water (Liters)',
    rainTomorrow: 'Forecast: Rain Tomorrow',
    noRain: 'No Rain',
    lightRain: 'Light Rain',
    heavyRain: 'Heavy Rain',

    // Crop Selector Modal
    cropSelectorTitle: "Farmer's Choice of Crop",
    cropSelectorSub: 'Select your crop and growth stage to dynamically recalculate irrigation priorities.',
    selectField: 'Select Field Zone',
    selectCrop: 'Choose Crop',
    selectStage: 'Growth Stage',
    applyChanges: 'Apply & Recalculate Decision',
    cancel: 'Cancel',

    // Languages
    languageLabel: 'Language'
  },

  hi: {
    appName: 'एग्री-ट्रस्ट',
    tagline: 'जोखिम-जागरूक कृषि निर्णय प्रणाली',
    secondaryTagline: 'सिर्फ सिंचाई मत करें। जोखिम को प्राथमिकता दें।',
    subHero: 'एग्री-ट्रस्ट मिट्टी, मौसम, फसल स्वास्थ्य और पानी की उपलब्धता के संकेतों को मिलाकर सबसे सुरक्षित कार्रवाई की सिफारिश करता है।',

    navOverview: 'अवलोकन / मुख्य पृष्ठ',
    navDashboard: 'किसान डैशबोर्ड',
    navFields: 'खेत की स्थिति',
    navSimulator: 'जल आवंटन सिमुलेटर',
    navExplanation: 'निर्णय का कारण',
    navSensors: 'सेंसर विश्वसनीयता',
    navCrops: 'फसल स्वास्थ्य',
    navWeather: 'मौसम जानकारी',
    navRecommendations: 'कार्रवाई सूची',
    navWhatIf: 'क्या-अगर मोड',
    navSettings: 'फार्म सेटिंग्स',

    goodMorning: 'शुभ प्रभात, किसान भाई',
    greenValleyFarm: 'ग्रीन वैली फार्म',
    demoFarm: 'डेमो फार्म',
    onlineSynced: 'सिंक किया गया',
    offlineMode: 'ऑफ़लाइन मोड',
    technicalView: 'तकनीकी दृश्य',
    judgeDemo: 'जज डेमो',
    changeCropBtn: 'फसल बदलें',

    waterAvailable: 'उपलब्ध पानी',
    highRiskFields: 'उच्च जोखिम वाले खेत',
    irrigationNeeded: 'सिंचाई की आवश्यकता',
    decisionConfidence: 'निर्णय विश्वास',
    todaysFarmDecision: 'आज का सबसे महत्वपूर्ण निर्णय',
    whyThisAction: 'यह निर्णय क्यों? (सबूत)',
    riskIfSkipped: 'सिंचाई न करने पर जोखिम',

    flowWater: 'पानी',
    flowRisk: 'जोखिम',
    flowPriority: 'प्राथमिकता',
    flowAction: 'कार्रवाई',
    flowHeading: 'निर्णय प्रवाह: पानी → जोखिम → प्राथमिकता → कार्रवाई',

    actionIrrigate: 'सिंचाई करें',
    actionDeficit: 'कम मात्रा में सिंचाई',
    actionDelay: 'सिंचाई टालें',
    actionSkip: 'सिंचाई छोड़ें',
    actionMonitor: 'निगरानी रखें',

    simulatorTitle: 'हर लीटर पानी कहाँ जाना चाहिए?',
    simulatorSub: 'देखें कैसे एग्री-ट्रस्ट सीमित पानी का जोखिम के अनुसार पुनर्वितरण करता है।',
    sliderLabel: 'उपलब्ध पानी (लीटर)',
    rainTomorrow: 'पूर्वानुमान: कल बारिश',
    noRain: 'बारिश नहीं',
    lightRain: 'हल्की बारिश',
    heavyRain: 'भारी बारिश',

    cropSelectorTitle: 'किसान की फसल का चयन',
    cropSelectorSub: 'सिंचाई प्राथमिकताओं की पुनर्गणना के लिए अपनी फसल और वृद्धि अवस्था चुनें।',
    selectField: 'खेत क्षेत्र चुनें',
    selectCrop: 'फसल चुनें',
    selectStage: 'वृद्धि अवस्था',
    applyChanges: 'लागू करें और पुनर्गणना करें',
    cancel: 'रद्द करें',

    languageLabel: 'भाषा'
  },

  te: {
    appName: 'అగ్రి-ట్రస్ట్',
    tagline: 'ప్రమాద-అవగాహన వ్యవసాయ నిర్ణయ మేధస్సు',
    secondaryTagline: 'కేవలం నీరు పెట్టడమే కాదు. నష్ట తీవ్రతకు ప్రాధాన్యత ఇవ్వండి.',
    subHero: 'అగ్రి-ట్రస్ట్ నేల తేమ, వాతావరణం, పంట ఆరోగ్యం మరియు నీటి లభ్యత ఆధారంగా సురక్షితమైన నిర్ణయాన్ని సిఫార్సు చేస్తుంది.',

    navOverview: 'ప్రధాన పరిచయం',
    navDashboard: 'రైతు డ్యాష్‌బోర్డ్',
    navFields: 'పొలం సమాచారం',
    navSimulator: 'నీటి కేటాయింపు సిమ్యులేటర్',
    navExplanation: 'నిర్ణయ కారణాలు',
    navSensors: 'సెన్సార్ల విశ్వసనీయత',
    navCrops: 'పంట ఆరోగ్యం',
    navWeather: 'వాతావరణం',
    navRecommendations: 'సిఫార్సులు',
    navWhatIf: 'పరిస్థితుల విశ్లేషణ',
    navSettings: 'సెట్టింగ్‌లు',

    goodMorning: 'శుభోదయం, రైతు సోదరా',
    greenValleyFarm: 'గ్రీన్ వ్యాలీ ఫార్మ్',
    demoFarm: 'డెమో ఫార్మ్',
    onlineSynced: 'కనెక్ట్ అయింది',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    technicalView: 'సాంకేతిక దృశ్యం',
    judgeDemo: 'జడ్జి డెమో',
    changeCropBtn: 'పంట మార్చండి',

    waterAvailable: 'అందుబాటులో ఉన్న నీరు',
    highRiskFields: 'తీవ్ర నష్ట భయం ఉన్న పొలాలు',
    irrigationNeeded: 'నీరు అవసరమైన పొలాలు',
    decisionConfidence: 'నిర్ణయ ఖచ్చితత్వం',
    todaysFarmDecision: 'నేటి అత్యంత ముఖ్యమైన నిర్ణయం',
    whyThisAction: 'ఎందుకు ఈ నిర్ణయం? (ఆధారాలు)',
    riskIfSkipped: 'నీరు పెట్టకపోతే నష్టం',

    flowWater: 'నీరు',
    flowRisk: 'ప్రమాదం',
    flowPriority: 'ప్రాధాన్యత',
    flowAction: 'చర్య',
    flowHeading: 'నిర్ణయ ప్రవాహం: నీరు → ప్రమాదం → ప్రాధాన్యత → చర్య',

    actionIrrigate: 'నీరు పెట్టండి',
    actionDeficit: 'కొద్దిగా నీరు పెట్టండి',
    actionDelay: 'వాయిదా వేయండి',
    actionSkip: 'నీరు అవసరం లేదు',
    actionMonitor: 'పరిశీలించండి',

    simulatorTitle: 'ప్రతి లీటరు నీరు ఎక్కడికి వెళ్ళాలి?',
    simulatorSub: 'తక్కువ నీరు ఉన్నప్పుడు అగ్రి-ట్రస్ట్ ఎలా ప్రాధాన్యత ఇస్తుందో చూడండి.',
    sliderLabel: 'అందుబాటులో ఉన్న నీరు (లీటర్లు)',
    rainTomorrow: 'రేపటి వర్ష సూచన',
    noRain: 'వర్షం లేదు',
    lightRain: 'తేలికపాటి వర్షం',
    heavyRain: 'భారీ వర్షం',

    cropSelectorTitle: 'రైతు ఎంపిక చేసుకునే పంట',
    cropSelectorSub: 'సిఫార్సులను మార్చడానికి మీ పంటను మరియు పంట దశను ఎంచుకోండి.',
    selectField: 'పొలం ఎంచుకోండి',
    selectCrop: 'పంట ఎంచుకోండి',
    selectStage: 'పంట దశ',
    applyChanges: 'మార్పులను వర్తింపజేయండి',
    cancel: 'రద్దు చేయండి',

    languageLabel: 'భాష'
  },

  ta: {
    appName: 'அக்ரி-ட்ரஸ்ட்',
    tagline: 'இடர்-அறிவார்ந்த விவசாய முடிவு நுண்ணறிவு',
    secondaryTagline: 'வெறும் பாசனம் செய்யாதீர்கள். இடருக்கு முன்னுரிமை கொடுங்கள்.',
    subHero: 'அக்ரி-ட்ரஸ்ட் மண், வானிலை, பயிர் ஆரோக்கியம் மற்றும் நீர் இருப்பு சிக்னல்களை இணைத்து பாதுகாப்பான முடிவை பரிந்துரைக்கிறது.',

    navOverview: 'கண்ணோட்டம்',
    navDashboard: 'விவசாயி டாஷ்போர்டு',
    navFields: 'வயல் தகவல்',
    navSimulator: 'நீர் பகிர்வு சிமுலேட்டர்',
    navExplanation: 'முடிவு விளக்கம்',
    navSensors: 'சென்சார் நம்பகத்தன்மை',
    navCrops: 'பயிர் ஆரோக்கியம்',
    navWeather: 'வானிலை நுண்ணறிவு',
    navRecommendations: 'பரிந்துரைகள்',
    navWhatIf: 'நிலைமை சோதனை',
    navSettings: 'அமைப்புகள்',

    goodMorning: 'காலை வணக்கம், விவசாயி',
    greenValleyFarm: 'கிரீன் வேலி பண்ணை',
    demoFarm: 'டெமோ பண்ணை',
    onlineSynced: 'இணைக்கப்பட்டது',
    offlineMode: 'ஆஃப்லைன் முறை',
    technicalView: 'தொழில்நுட்ப பார்வை',
    judgeDemo: 'நீதிபதி டெமோ',
    changeCropBtn: 'பயிர் மாற்றவும்',

    waterAvailable: 'இருக்கும் நீர்',
    highRiskFields: 'அதிக ஆபத்துள்ள வயல்கள்',
    irrigationNeeded: 'பாசனம் தேவைப்படும் வயல்கள்',
    decisionConfidence: 'முடிவு நம்பகத்தன்மை',
    todaysFarmDecision: 'இன்றைய முக்கிய முடிவு',
    whyThisAction: 'இந்த முடிவு ஏன்? (ஆதாரங்கள்)',
    riskIfSkipped: 'தவிர்த்தால் ஏற்படும் இழப்பு',

    flowWater: 'நீர்',
    flowRisk: 'இடர்',
    flowPriority: 'முன்னுரிமை',
    flowAction: 'செயல்',
    flowHeading: 'முடிவு ஓட்டம்: நீர் → இடர் → முன்னுரிமை → செயல்',

    actionIrrigate: 'பாசனம் செய்க',
    actionDeficit: 'பகுதி பாசனம்',
    actionDelay: 'தாமதிக்கவும்',
    actionSkip: 'தவிர்க்கவும்',
    actionMonitor: 'கண்காணிக்கவும்',

    simulatorTitle: 'ஒவ்வொரு லிட்டர் நீரும் எங்கு செல்ல வேண்டும்?',
    simulatorSub: 'குறைந்த நீர் இருக்கும் போது பயிர் இழப்பு அடிப்படையில் எவ்வாறு பிரிக்கப்படுகிறது என்று பாருங்கள்.',
    sliderLabel: 'இருப்பில் உள்ள நீர் (லிட்டர்)',
    rainTomorrow: 'நாளை மழை முன்னறிவிப்பு',
    noRain: 'மழை இல்லை',
    lightRain: 'லேசான மழை',
    heavyRain: 'கனமழை',

    cropSelectorTitle: 'விவசாயியின் பயிர் தேர்வு',
    cropSelectorSub: 'பாசன முன்னுரிமைகளை மறுபரிசீலனை செய்ய உங்கள் பயிர் மற்றும் வளர்ச்சி நிலையை தேர்வு செய்யவும்.',
    selectField: 'வயல் மண்டலத்தை தேர்வு செய்',
    selectCrop: 'பயிர் தேர்வு செய்',
    selectStage: 'வளர்ச்சி நிலை',
    applyChanges: 'பொருத்துக மற்றும் கணக்கிடுக',
    cancel: 'ரத்து செய்',

    languageLabel: 'மொழி'
  },

  kn: {
    appName: 'ಅಗ್ರಿ-ಟ್ರಸ್ಟ್',
    tagline: 'ಅಪಾಯ-ಅರಿವಿನ ಕೃಷಿ ನಿರ್ಧಾರ ಬುದ್ಧಿಮತ್ತೆ',
    secondaryTagline: 'ಕೇವಲ ನೀರಾವರಿ ಮಾಡಬೇಡಿ. ಅಪಾಯಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿ.',
    subHero: 'ಅಗ್ರಿ-ಟ್ರಸ್ಟ್ ಮಣ್ಣು, ಹವಾಮಾನ, ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ನೀರಿನ ಲಭ್ಯತೆಯನ್ನು ಪರಿಗಣಿಸಿ ಸುರಕ್ಷಿತ ನಿರ್ಧಾರವನ್ನು ಸೂಚಿಸುತ್ತದೆ.',

    navOverview: 'ಅವಲೋಕನ',
    navDashboard: 'ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navFields: 'ಕ್ಷೇತ್ರ ಮಾಹಿತಿ',
    navSimulator: 'ನೀರು ಹಂಚಿಕೆ ಸಿಮ್ಯುಲೇಟರ್',
    navExplanation: 'ನಿರ್ಧಾರ ವಿವರಣೆ',
    navSensors: 'ಸೆನ್ಸಾರ್ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    navCrops: 'ಬೆಳೆ ಆರೋಗ್ಯ',
    navWeather: 'ಹವಾಮಾನ ವಿವರ',
    navRecommendations: 'ಶಿಫಾರಸುಗಳು',
    navWhatIf: 'ಸನ್ನಿವೇಶ ಪರೀಕ್ಷೆ',
    navSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',

    goodMorning: 'ಶುಭೋದಯ, ರೈತ ಮಿತ್ರ',
    greenValleyFarm: 'ಗ್ರೀನ್ ವ್ಯಾಲಿ ಫಾರ್ಮ್',
    demoFarm: 'ಡೆಮೊ ಫಾರ್ಮ್',
    onlineSynced: 'ಸಿಂಕ್ ಆಗಿದೆ',
    offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    technicalView: 'ತಾಂತ್ರಿಕ ನೋಟ',
    judgeDemo: 'ಜಡ್ಜ್ ಡೆಮೊ',
    changeCropBtn: 'ಬೆಳೆ ಬದಲಾಯಿಸಿ',

    waterAvailable: 'ಲಭ್ಯವಿರುವ ನೀರು',
    highRiskFields: 'ಹೆಚ್ಚು ಅಪಾಯವಿರುವ ಹೊಲಗಳು',
    irrigationNeeded: 'ನೀರಾವರಿ ಅಗತ್ಯವಿರುವ ಹೊಲಗಳು',
    decisionConfidence: 'ನಿರ್ಧಾರದ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    todaysFarmDecision: 'ಇಂದಿನ ಪ್ರಮುಖ ನಿರ್ಧಾರ',
    whyThisAction: 'ಈ ನಿರ್ಧಾರ ಏಕೆ? (ಪುರಾವೆಗಳು)',
    riskIfSkipped: 'ನೀರು ನೀಡದಿದ್ದರೆ ಅಪಾಯ',

    flowWater: 'ನೀರು',
    flowRisk: 'ಅಪಾಯ',
    flowPriority: 'ಆದ್ಯತೆ',
    flowAction: 'ಕ್ರಮ',
    flowHeading: 'ನಿರ್ಧಾರ ಹರಿವು: ನೀರು → ಅಪಾಯ → ಆದ್ಯತೆ → ಕ್ರಮ',

    actionIrrigate: 'ನೀರಾವರಿ ಮಾಡಿ',
    actionDeficit: 'ಭಾಗಶಃ ನೀರಾವರಿ',
    actionDelay: 'ಮುಂದೂಡಿ',
    actionSkip: 'ಅಗತ್ಯವಿಲ್ಲ',
    actionMonitor: 'ಗಮನಿಸಿ',

    simulatorTitle: 'ಪ್ರತಿ ಲೀಟರ್ ನೀರು ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?',
    simulatorSub: 'ಸೀಮಿತ ನೀರು ಇದ್ದಾಗ ಬೆಳೆ ನಷ್ಟದ ಆಧಾರದ ಮೇಲೆ ನೀರನ್ನು ಹೇಗೆ ಹಂಚಲಾಗುತ್ತದೆ ನೋಡಿ.',
    sliderLabel: 'ಲಭ್ಯವಿರುವ ನೀರು (ಲೀಟರ್)',
    rainTomorrow: 'ನಾಳೆಯ ಮಳೆಯ ಮುನ್ಸೂಚನೆ',
    noRain: 'ಮಳೆ ಇಲ್ಲ',
    lightRain: 'ಹಗುರ ಮಳೆ',
    heavyRain: 'ಭಾರಿ ಮಳೆ',

    cropSelectorTitle: 'ರೈತನ ಬೆಳೆ ಆಯ್ಕೆ',
    cropSelectorSub: 'ನೀರಾವರಿ ಆದ್ಯತೆಗಳನ್ನು ಮರುಲೆಕ್ಕಾಚಾರ ಮಾಡಲು ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಹಂತವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    selectField: 'ಹೊಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectCrop: 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectStage: 'ಬೆಳವಣಿಗೆಯ ಹಂತ',
    applyChanges: 'ಅನ್ವಯಿಸಿ ಮತ್ತು ಲೆಕ್ಕಹಾಕಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',

    languageLabel: 'ಭಾಷೆ'
  },

  mr: {
    appName: 'अ‍ॅग्री-ट्रस्ट',
    tagline: 'जोखीम-सजग कृषी निर्णय बुद्धिमत्ता',
    secondaryTagline: 'केवळ पाणी देऊ नका. जोखमीला प्राधान्य द्या.',
    subHero: 'अ‍ॅग्री-ट्रस्ट माती, हवामान, पीक आरोग्य आणि पाण्याच्या उपलब्धतेवर आधारित सुरक्षित निर्णय सुचवते.',

    navOverview: 'मुख्य पृष्ठ',
    navDashboard: 'शेतकरी डॅशबोर्ड',
    navFields: 'शेत माहिती',
    navSimulator: 'पाणी वाटप सिम्युलेटर',
    navExplanation: 'निर्णयाचे कारण',
    navSensors: 'सेन्सर विश्वासार्ಹता',
    navCrops: 'पीक आरोग्य',
    navWeather: 'हवामान अंदाज',
    navRecommendations: 'शिफारशी',
    navWhatIf: 'परिस्थिती नियोजन',
    navSettings: 'सेटिंग्ज',

    goodMorning: 'शुभ प्रभात, शेतकरी बंधू',
    greenValleyFarm: 'ग्रीन व्हॅली फार्म',
    demoFarm: 'डेमो फार्म',
    onlineSynced: 'सिंक झाले',
    offlineMode: 'ऑफलाइन मोड',
    technicalView: 'तांत्रिक दृश्य',
    judgeDemo: 'परीक्षक डेमो',
    changeCropBtn: 'पीक बदला',

    waterAvailable: 'उपलब्ध पाणी',
    highRiskFields: 'जास्त जोखीम असलेले शेत',
    irrigationNeeded: 'पाण्याची गरज',
    decisionConfidence: 'निर्णय विश्वास',
    todaysFarmDecision: 'आजचा सर्वात महत्त्वाचा निर्णय',
    whyThisAction: 'हा निर्णय का? (पुरावे)',
    riskIfSkipped: 'पाणी न दिल्यास होणारे नुकसान',

    flowWater: 'पाणी',
    flowRisk: 'जोखीम',
    flowPriority: 'प्राधान्य',
    flowAction: 'कृती',
    flowHeading: 'निर्णय प्रवाह: पाणी → जोखीम → प्राधान्य → कृती',

    actionIrrigate: 'पाणी द्या',
    actionDeficit: 'मर्यादित पाणी द्या',
    actionDelay: 'पाणी देणे पुढे ढकला',
    actionSkip: 'पाण्याची गरज नाही',
    actionMonitor: 'निरीक्षण करा',

    simulatorTitle: 'प्रत्येक लिटर पाणी कुठे गेले पाहिजे?',
    simulatorSub: 'कमी पाणी असताना अ‍ॅग्री-ट्रस्ट पिकाच्या जोखमीनुसार पाण्याचे पुनर्वाटप कसे करते ते पहा.',
    sliderLabel: 'उपलब्ध पाणी (लिटर)',
    rainTomorrow: 'उद्याचा पाऊस अंदाज',
    noRain: 'पाऊस नाही',
    lightRain: 'हलका पाऊस',
    heavyRain: 'मुसळधार पाऊस',

    cropSelectorTitle: 'शेतकऱ्याची पिकाची निवड',
    cropSelectorSub: 'पाणी वाटपाची पुनर्गणना करण्यासाठी आपले पीक आणि वाढीची अवस्था निवडा.',
    selectField: 'शेत निवडा',
    selectCrop: 'पीक निवडा',
    selectStage: 'वाढीची अवस्था',
    applyChanges: 'लागू करा आणि मोजा',
    cancel: 'रद्द करा',

    languageLabel: 'भाषा'
  },

  es: {
    appName: 'AGRI-TRUST',
    tagline: 'Inteligencia de Decisiones Agrícolas Consciente del Riesgo',
    secondaryTagline: 'No se limite a regar. Priorice el riesgo.',
    subHero: 'AgriTrust combina señales de suelo, clima, salud del cultivo y disponibilidad hídrica para recomendar la acción más segura.',

    navOverview: 'Inicio / Visión General',
    navDashboard: 'Panel del Agricultor',
    navFields: 'Inteligencia de Parcelas',
    navSimulator: 'Simulador de Riego',
    navExplanation: 'Lógica de Decisión',
    navSensors: 'Fiabilidad de Sensores',
    navCrops: 'Salud del Cultivo',
    navWeather: 'Inteligencia Climática',
    navRecommendations: 'Recomendaciones',
    navWhatIf: 'Modo ¿Qué Pasaría Si?',
    navSettings: 'Configuración',

    goodMorning: 'Buenos días, Agricultor',
    greenValleyFarm: 'Finca Valle Verde',
    demoFarm: 'Finca Demo',
    onlineSynced: 'Sincronizado',
    offlineMode: 'Modo Offline',
    technicalView: 'Vista Técnica',
    judgeDemo: 'DEMO JUECES',
    changeCropBtn: 'Cambiar Cultivo',

    waterAvailable: 'Agua Disponible',
    highRiskFields: 'Campos de Alto Riesgo',
    irrigationNeeded: 'Riego Requerido',
    decisionConfidence: 'Confianza de Decisión',
    todaysFarmDecision: 'DECISIÓN DE MÁXIMA PRIORIDAD DE HOY',
    whyThisAction: '¿POR QUÉ ESTA ACCIÓN? (EVIDENCIAS)',
    riskIfSkipped: 'Riesgo si se omite',

    flowWater: 'Agua',
    flowRisk: 'Riesgo',
    flowPriority: 'Prioridad',
    flowAction: 'Acción',
    flowHeading: 'Flujo de Decisión: Agua → Riesgo → Prioridad → Acción',

    actionIrrigate: 'REGAR',
    actionDeficit: 'RIEGO DEFICITARIO',
    actionDelay: 'POSTPONER',
    actionSkip: 'OMITIR',
    actionMonitor: 'MONITOREAR',

    simulatorTitle: '¿A Dónde Debe Ir Cada Litro?',
    simulatorSub: 'Vea cómo AgriTrust reasigna el agua limitada según el riesgo de pérdida del cultivo.',
    sliderLabel: 'Agua Disponible (Litros)',
    rainTomorrow: 'Pronóstico: Lluvia Mañana',
    noRain: 'Sin Lluvia',
    lightRain: 'Lluvia Ligera',
    heavyRain: 'Lluvia Fuerte',

    cropSelectorTitle: 'Elección de Cultivo del Agricultor',
    cropSelectorSub: 'Seleccione su cultivo y etapa fenológica para recalcular las prioridades de riego.',
    selectField: 'Seleccionar Zona de Campo',
    selectCrop: 'Elegir Cultivo',
    selectStage: 'Etapa de Crecimiento',
    applyChanges: 'Aplicar y Recalcular',
    cancel: 'Cancelar',

    languageLabel: 'Idioma'
  }
};
