export const R2_BASE = "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik";

export const IMAGES = {
  favicon: `${R2_BASE}/Weber-Kunststofftechnik-Flavicon_03.webp`,
  logoWhite: `${R2_BASE}/weber-logo-1-fbg-weiss-1024x410_11.webp`,
  logoDark: `${R2_BASE}/weber-logo-dark.webp`,
  panorama: `${R2_BASE}/weber-werkshalle-panorama.webp`,
  tanklager: `${R2_BASE}/weber-kunststofftechnik-tanklager17_10.webp`,
  rundbehaelter: `${R2_BASE}/weber-kunststofftechnik-rundbehaelter05_09.webp`,
  rechteckbehaelter: `${R2_BASE}/weber-kunststofftechnik-rechteckbehaelter03_07.webp`,
  rechteckbehaelterAlt: `${R2_BASE}/weber-kunststofftechnik-rechteckbehaelter01.webp`,
  abluft: `${R2_BASE}/weber-kunststofftechnik-abluftreinigungsanlage02_01.webp`,
  rohrleitungen: `${R2_BASE}/weber-kunststofftechnik-rohrleitungsbau01_08.webp`,
  gefahrstoff: `${R2_BASE}/weber-kunststofftechnik-gefahrstofflagerung01_04.webp`,
  oberflaeche: `${R2_BASE}/weber-kunststofftechnik-oberflaechentechnik01_06.webp`,
  feuerverzinkung: `${R2_BASE}/weber-kunststofftechnik-feuerverzinkung06_02.webp`,
  feuerverzinkungAlt: `${R2_BASE}/weber-kunststofftechnik-feuerverzinkung13.webp`,
  armaturen: `${R2_BASE}/weber-kunststofftechnik-handelsware-armaturen01_05.webp`,
  droneShot: `${R2_BASE}/weber-werk-minden-drohne.webp`,
  kaiserBg: `${R2_BASE}/weber-hero-kaiser-bg.webp`,
  heavyTransport: `${R2_BASE}/weber-schwerlast-transport-berlin.webp`,
};

// 12x Anwendungsgebiete
export const ANWENDUNGSGEBIETE = [
  {
    id: "chemie-tanklaeger",
    title: "Chemie Tankläger",
    desc: "Zugelassene Großtankläger für Säuren, Laugen und wassergefährdende Stoffe nach AwSV.",
    tag: "Schwerindustrie",
    specs: "Volumen bis 100 m³ · DIBt-Zulassung · Doppelwandig",
    image: IMAGES.tanklager
  },
  {
    id: "lebensmittelindustrie",
    title: "Lebensmittelindustrie",
    desc: "FDA-konforme Silos, Rührwerksbehälter und Prozessleitungen für Reinstmedien.",
    tag: "Hygiene & FDA",
    specs: "Physiologisch unbedenklich · PE-100 / PP-H · CIP-reinigbar",
    image: IMAGES.rundbehaelter
  },
  {
    id: "abwasserbehandlung",
    title: "Abwasserbehandlung",
    desc: "Neutralisationsanlagen, Sedimentationsbecken und Schlammeindicker für Industrieabwässer.",
    tag: "Umwelttechnik",
    specs: "Chemisch hochbeständig · pH 0 bis 14 · Schwerer Korrosionsschutz",
    image: IMAGES.gefahrstoff
  },
  {
    id: "abluft-umwelttechnik",
    title: "Abluft- & Umwelttechnik",
    desc: "Thermoplastische Wäscherkolonnen, Aerosolabscheider und säurefeste Lüftungssysteme.",
    tag: "Emissionsschutz",
    specs: "TA-Luft konform · Gegenstromwäscher · Integrierte Tropfenabscheider",
    image: IMAGES.abluft
  },
  {
    id: "hochreine-chemie",
    title: "Hochreine Chemie",
    desc: "Fluorpolymer-Auskleidungen und PVDF/PFA-Systeme für Halbleiter- und Pharmaqualität.",
    tag: "High Purity",
    specs: "Partikelfreie Schweißnähte · PVDF-UHP · PFA Linings",
    image: IMAGES.rohrleitungen
  },
  {
    id: "galvanotechnik",
    title: "Galvanotechnik",
    desc: "Prozessbäder, Spülkaskaden und Eloxalbecken für extrem korrosive Elektrolyte.",
    tag: "Oberflächenbehandlung",
    specs: "Stahlarmierte Thermoplaste · Thermische Beständigkeit bis 95°C",
    image: IMAGES.oberflaeche
  },
  {
    id: "feuerverzinkung",
    title: "Feuerverzinkung / Vorbehandlungsanlagen",
    desc: "Beizbecken, Flussmittelbehälter und Kapselungen für aggressive Salzsäuredämpfe.",
    tag: "Metallverarbeitung",
    specs: "Robuste Dickwandkonstruktion · HCl-resistent · Mechanisch hochbelastbar",
    image: IMAGES.feuerverzinkung
  },
  {
    id: "fuellen-dosieren",
    title: "Füllen & Dosieren",
    desc: "Schlüsselfertige Dosierstationen mit Auffangwanne, Pumpenverrohrung und Leckagesensorik.",
    tag: "Anlagenbau",
    specs: "Kompaktbauweise · DIBt-zertifizierte Wannen · SPS-Anbindung",
    image: IMAGES.armaturen
  },
  {
    id: "passive-lagerung",
    title: "Passive Lagerung von Kleinstgebinden",
    desc: "Sicherheits-Auffangwannen und modulare Gefahrstoffregale für IBCs und Fässer.",
    tag: "Arbeitsschutz",
    specs: "WHG-Konformität · Korrosionsfrei · Staplerbefahrbar",
    image: IMAGES.rechteckbehaelter
  },
  {
    id: "rohrleitungsbau-sektor",
    title: "Rohrleitungsbau",
    desc: "Industrielle Rohrleitungstrassen im Schweiß- und Klebeverfahren nach DVS-Standards.",
    tag: "Medienverteilung",
    specs: "DN 15 bis DN 1200 · Druckstufen bis PN 16 · DVS 2207",
    image: IMAGES.rohrleitungen
  },
  {
    id: "stahlbau",
    title: "Stahlbau & Tragwerke",
    desc: "Integrierte Tragrahmen, Bühnen und Korrosionsschutz-Ummantelungen für Behälteranlagen.",
    tag: "Statik",
    specs: "Verzinkt & kunststoffbeschichtet · Nach EN 1090 · Erdbebensichere Verankerung",
    image: IMAGES.panorama
  },
  {
    id: "sonderbauten",
    title: "Sonderbauten & Prototypen",
    desc: "Individuelle Baugruppen und Spezialapparate nach kundenspezifischen Konstruktionsdaten.",
    tag: "Engineering",
    specs: "CAD/CAM Fertigung · 3D-Scans vor Ort · TÜV-Einzelabnahme",
    image: IMAGES.tanklager
  }
];

// 11x Produkte
export const PRODUKTE = [
  {
    id: "lager-prozessbehaelter-rund",
    title: "Lager- & Prozessbehälter Rund",
    subtitle: "Bauartzugelassen nach DIBt Z-40.21 bis 100 m³",
    desc: "Zylindrische Flachboden-, Schrägboden- und Standzargenbehälter aus PE 100 oder PP-H für die sichere Lagerung aggressiver Chemikalien.",
    specs: ["Volumen: 1 m³ bis 100 m³", "Durchmesser bis 4.000 mm", "Zulassung: DIBt Z-40.21", "Werkstoffe: PE 100, PP-H, PVDF"],
    image: IMAGES.rundbehaelter,
    features: ["Nahtlose Zylinderschweißung auf modernsten Stumpfschweißmaschinen", "Statische Bemessung nach DIN EN 12573", "Inkl. Mannloch, Füllstutzen, Entlüftung und Füllstandsanzeige"]
  },
  {
    id: "lager-prozessbehaelter-rechteck",
    title: "Lager- & Prozessbehälter Rechteck",
    subtitle: "Platzsparende Becken mit statischer Stahlrohrarmierung",
    desc: "Rechteckbehälter und Kaskadenbäder für Galvanik, Beizanlagen und industrielle Prozessbäder mit maßgeschneiderter Raumausnutzung.",
    specs: ["Individuelle Maße bis 12 m Länge", "Stahlverstärkung kunststoffummantelt", "Thermische Belastbarkeit bis +100 °C", "Optionale Heiz-/Kühlregister"],
    image: IMAGES.rechteckbehaelter,
    features: ["Optimal für Vorbehandlungs- und Galvaniklinien", "Vollständige Umhüllung der Stahlrohre gegen Korrosion", "Verschweißung nach DVS 2207"]
  },
  {
    id: "verbundbehaelter",
    title: "Verbundbehälter (Dual-Laminate)",
    subtitle: "Thermoplastischer Liner mit GFK-Verstärkung",
    desc: "Kombiniert die unübertroffene chemische Resistenz von PVDF, ECTFE, FEP oder PFA mit der hohen mechanischen Festigkeit von glasfaserverstärktem Kunststoff.",
    specs: ["Druck- und Vakuumbeständig", "Temperaturen bis +140 °C", "Liner: PVDF, ECTFE, PFA", "Außenhaut: GFK mit Chemieschutzschicht"],
    image: IMAGES.tanklager,
    features: ["Höchste Betriebssicherheit bei extremen Medien", "Leichtes Eigengewicht bei maximaler Stabilität", "Überwachbare Doppelwandigkeit"]
  },
  {
    id: "abluftwaescher",
    title: "Abluftwäscher, Einhausungen & Rohrleitungen",
    subtitle: "Emissionsminderung nach TA-Luft",
    desc: "Chemische Gegenstrom- und Kreuzstromwäscher zur Abscheidung saurer, alkalischer oder toxischer Gaskomponenten aus der Prozessabluft.",
    specs: ["Volumenstrom bis 60.000 m³/h", "Integrierte Tropfenabscheider", "Sprühsysteme mit Vollkegeldüsen", "Abluftrohre bis DN 1200"],
    image: IMAGES.abluft,
    features: ["Hoher Wirkungsgrad bis > 98 % Abscheidegrad", "Automatische pH- und Redox-Regelung", "UV- und witterungsbeständige Außenaufstellung"]
  },
  {
    id: "dosierstationen",
    title: "Dosierstationen & Befülleinrichtungen",
    subtitle: "Schlüsselfertige Dosierkabinette nach Maß",
    desc: "Kompakte, geschlossene Schränke und Einheiten mit Membran- oder Schlauchdosierpumpen, Verrohrung, Überströmeinrichtungen und Sicherheitsauffangwanne.",
    specs: ["Plug & Play Anschlüsse", "Transparente Schutzverglasung", "Integrierte Leckagewarnung", "Vollständige AwSV-Konformität"],
    image: IMAGES.armaturen,
    features: ["Höchster Arbeitsschutz für Bedienpersonal", "Vorkonfektioniert und im Werk druckgeprüft", "Anschlussfertig verdrahtet"]
  },
  {
    id: "auffangwannen",
    title: "Auffangwannen & Sicherheitspaletten",
    subtitle: "Sicherer Rückhalt für wassergefährdende Stoffe",
    desc: "Bauartzugelassene Thermoplast-Auffangwannen nach WHG / AwSV für IBC-Container, Fässer und mobile Dosiergebinde.",
    specs: ["Volumen von 200 l bis 10.000 l", "Erhältlich mit PE- oder Gitterrost", "Unterfahrbar für Gabelstapler", "Korrosionsresistent"],
    image: IMAGES.gefahrstoff,
    features: ["Kein Rosten, kein Abplatzen wie bei beschichtetem Stahl", "Leicht zu reinigen und inspektionsfreundlich", "DIBt-zugelassen"]
  },
  {
    id: "schwimmbecken",
    title: "Schwimmbecken & Kommunalbecken",
    subtitle: "Robuste Thermoplast-Beckenkonstruktionen",
    desc: "Langlebige Becken und Auskleidungen für öffentliche Bäder, Reha-Zentren und Spezialanwendungen aus physiologisch unbedenklichen Kunststoffen.",
    specs: ["100 % UV- und chlorbeständig", "Glänzende, porenfreie Oberfläche", "Keine Osmose-Gefahr wie bei GFK", "Individuelle Einbauten"],
    image: IMAGES.rechteckbehaelterAlt,
    features: ["Dauerhaft dicht ohne Fugenverguss", "Hygienisch und mikrobiologisch neutral", "Schnelle Bauzeit durch Vorfertigung"]
  },
  {
    id: "leitern-begehungen",
    title: "Leitern & Begehungsanlagen",
    subtitle: "Sicherer Aufstieg nach DIN EN ISO 14122",
    desc: "GFK- und Thermoplast-Steigleitern mit Rückenschutz, Laufstege, Podeste und Geländer für den chemikalienresistenten Zugang zu Behälterkronen.",
    specs: ["Rutschhemmung R13", "Vollisolierend gegen Strom", "Wartungsfrei ohne Anstrich", "Witterungs- & UV-beständig"],
    image: IMAGES.feuerverzinkungAlt,
    features: ["Keine Korrosion durch saure Umgebungsdämpfe", "Leichte Montage an Behältern und Bauwerken", "Ergonomisch nach Arbeitsstättenverordnung"]
  },
  {
    id: "montage",
    title: "Industriemontage vor Ort",
    subtitle: "Eigene Schweißfachkräfte bundesweit im Einsatz",
    desc: "Fachgerechte Einbringung, Rohrleitungsverlegung, Heizkeilschweißung und Schweißnahtprüfungen durch zertifizierte Weber-Monteure.",
    specs: ["DVS 2212 zertifizierte Schweißer", "Eigene Schweißaggregate & Hebezeuge", "SCC** Sicherheitsstandards", "AwSV Fachbetriebszulassung"],
    image: IMAGES.feuerverzinkung,
    features: ["Lückenlose Schweißprotokolle", "Kurze Anlagenstillstände durch präzise Vorfertigung", "Schlüsselfertige Übergabe mit Abnahmeprüfung"]
  },
  {
    id: "transport",
    title: "Werkslogistik & Schwerlasttransport",
    subtitle: "Sicherer Direkttransport ab Werk Minden",
    desc: "Eigene und spezialisierte Tieflader für Großbehälter bis 4 m Durchmesser mit behördlicher Überbreiten- und Überhöhenbegleitung.",
    specs: ["Transport bis 4.000 mm Durchmesser", "Bundesweite und europäische Gestellung", "Just-in-time Baustellenanlieferung", "Kran- und Entladekoordination"],
    image: IMAGES.tanklager,
    features: ["Keine Zwischenlagerung oder Umschlagsrisiken", "Erfahrene Speditionslogistik für sensible Thermoplaste", "Direkte Zufahrt zur Fundamentplatte"]
  },
  {
    id: "engineering",
    title: "Statik & Engineering",
    subtitle: "Berechnung nach DIN EN 12573 & DIBt-Richtlinien",
    desc: "Eigene Ingenieure und Statiker berechnen Wanddicken, Stutzenbelastungen, Wind- und Schneelasten sowie Erdbebenzonen vor Fertigungsbeginn.",
    specs: ["3D-CAD Konstruktion (SolidWorks)", "Statikprüffähige Dokumentation", "Finite-Elemente-Berechnung (FEM)", "DVS-konforme Dimensionierung"],
    image: IMAGES.panorama,
    features: ["Maximale Werkstoffeffizienz bei 100 % Sicherheit", "Berechnung für Standzeiten bis 25 Jahre", "Vollständige Werksprüfzeugnisse nach DIN EN 10204-3.1"]
  }
];

// 7x Werkstoffe
export const WERKSTOFFE = [
  {
    id: "pe-polyethylen",
    code: "PE 100 / PE-HD",
    name: "Polyethylen",
    temp: "-40 °C bis +60 °C",
    acids: "Sehr gut",
    alkalis: "Hervorragend",
    solvents: "Bedingt",
    color: "Schwarz / Natur",
    desc: "Der wirtschaftliche Industriestandard für Laugen, wässrige Medien und Abwässer. UV-stabilisiert mit hoher Kerbschlagzähigkeit auch bei Minustemperaturen.",
    highlights: ["Hervorragende Zähigkeit", "Sehr hohe Bruchdehnung", "Trinkwasser- und lebensmittelecht"]
  },
  {
    id: "pp-polypropylen",
    code: "PP-H / PP-B / PP-s",
    name: "Polypropylen",
    temp: "0 °C bis +100 °C",
    acids: "Hervorragend",
    alkalis: "Hervorragend",
    solvents: "Gut",
    color: "Grau (RAL 7032)",
    desc: "Höhere Steifigkeit und Wärmebeständigkeit als PE. Ideal für Beizbäder, Galvanik und Prozessbehälter mit erhöhten Betriebstemperaturen. Auch schwerentflammbar (PP-s).",
    highlights: ["Dauerbetrieb bis +100 °C", "Hohe Steifigkeit & Härte", "Ausgezeichnet gegen anorganische Säuren"]
  },
  {
    id: "pvc-polyvinylchlorid",
    code: "PVC-U / PVC-C",
    name: "Polyvinylchlorid",
    temp: "0 °C bis +60 °C / +85 °C (PVC-C)",
    acids: "Hervorragend",
    alkalis: "Hervorragend",
    solvents: "Mäßig",
    color: "Dunkelgrau",
    desc: "Sehr hoher chemischer Widerstand gegenüber oxidierenden Medien, Chromsäure und Halogenen. Selbstverlöschend und klebbar.",
    highlights: ["Schwer entflammbar (DIN 4102 B1)", "Hervorragend für Abluftrohre & Wäscher", "Hoher E-Modul"]
  },
  {
    id: "pvdf",
    code: "PVDF (Polyvinylidenfluorid)",
    name: "Fluorpolymer PVDF",
    temp: "-30 °C bis +140 °C",
    acids: "Exzellent",
    alkalis: "Sehr gut (pH < 12)",
    solvents: "Exzellent",
    color: "Natur (Elfenbein)",
    desc: "High-Performance-Thermoplast für hochkonzentrierte Säuren, Salpetersäure, Halogene und Reinstwasseranwendungen in der Halbleiterindustrie.",
    highlights: ["Maximaler Reinstheitsgrad", "Physiologisch unbedenklich", "Sehr hohe Abriebfestigkeit"]
  },
  {
    id: "ectfe",
    code: "ECTFE (Halar®)",
    name: "Ethylen-Chlortrifluorethylen",
    temp: "-76 °C bis +150 °C",
    acids: "Exzellent",
    alkalis: "Exzellent",
    solvents: "Exzellent",
    color: "Transluzent",
    desc: "Universelle Chemikalienbeständigkeit gegenüber starken Säuren, Laugen und aggressiven Lösemitteln. Hervorragende Diffusionsbarriere.",
    highlights: ["Extrem geringe Permeation", "Sehr glatte Oberfläche", "Exzellent für Chlorgas & Bleichlauge"]
  },
  {
    id: "pfa",
    code: "PFA (Perfluoralkoxy)",
    name: "Perfluoralkoxy-Polymer",
    temp: "-190 °C bis +260 °C",
    acids: "Ultimativ",
    alkalis: "Ultimativ",
    solvents: "Ultimativ",
    color: "Transluzent",
    desc: "Nahezu universelle chemische Inertheit über den gesamten pH-Bereich von 0 bis 14. Extrem glatte Oberfläche gegen Anbackungen.",
    highlights: ["Höchste Temperaturbeständigkeit", "Nicht haftend (Anti-Adhäsiv)", "Reinraum-Qualität"]
  },
  {
    id: "mfa",
    code: "MFA",
    name: "Modifiziertes Fluoralkoxy",
    temp: "-100 °C bis +240 °C",
    acids: "Ultimativ",
    alkalis: "Ultimativ",
    solvents: "Ultimativ",
    color: "Transluzent",
    desc: "Verbesserte Schweißbarkeit und Biegefestigkeit im Vergleich zu Standard-PFA, ideal für anspruchsvollste Verbundbehälter-Liner.",
    highlights: ["Hervorragende Schweißnahtfestigkeit", "Geringe Rissbildung", "Höchste Prozesssicherheit"]
  }
];

// Chemikalien-Datenbank für die intelligente Sofortsuche
export const CHEMICAL_DATABASE = [
  { name: "Salzsäure (HCl)", concentration: "bis 37%", empfohlenerWerkstoff: "PE-HD, PP-H, PVDF", behälter: "Rundbehälter Flachboden", beständig: "Ja (vollständig)" },
  { name: "Schwefelsäure (H2SO4)", concentration: "bis 70%", empfohlenerWerkstoff: "PE-HD, PP-H", behälter: "Standzargenbehälter DIBt", beständig: "Ja (bis 60°C)" },
  { name: "Schwefelsäure hochkonzentriert", concentration: "70% bis 98%", empfohlenerWerkstoff: "PVDF, ECTFE", behälter: "Verbundbehälter mit Liner", beständig: "Ja" },
  { name: "Natronlauge (NaOH)", concentration: "bis 50%", empfohlenerWerkstoff: "PE 100, PP-H", behälter: "Rundbehälter isoliert mit Begleitheizung", beständig: "Ja (kristallisationssicher)" },
  { name: "Salpetersäure (HNO3)", concentration: "bis 65%", empfohlenerWerkstoff: "PVDF, PVC-U", behälter: "Sonderbehälter DIBt", beständig: "Ja (oxidationsstabil)" },
  { name: "Flusssäure (HF)", concentration: "bis 40%", empfohlenerWerkstoff: "PE-HD, PVDF, PFA", behälter: "Rundbehälter mit Leckageüberwachung", beständig: "Ja (kein Glasfaser-Kontakt)" },
  { name: "Eisen-III-Chlorid", concentration: "wässrig", empfohlenerWerkstoff: "PE 100, PVC", behälter: "Abwasser-Dosiertank", beständig: "Ja" },
  { name: "Natriumhypochlorit (Bleichlauge)", concentration: "12-15% Aktivchlor", empfohlenerWerkstoff: "PVC-U, PVDF, ECTFE", behälter: "Dunkelwandiger PE/PVC Behälter", beständig: "Ja (UV-geschützt)" },
  { name: "Phosphorsäure", concentration: "bis 85%", empfohlenerWerkstoff: "PE 100, PP-H", behälter: "Standard-Lagerbehälter", beständig: "Ja bis 60°C" },
  { name: "Ammoniakwasser", concentration: "bis 25%", empfohlenerWerkstoff: "PE-HD, PP", behälter: "Druckloser Rundbehälter gasdicht", beständig: "Ja" },
  { name: "Wasserstoffperoxid", concentration: "bis 35%", empfohlenerWerkstoff: "PE-HD Reinstqualität", behälter: "Lagerbehälter mit Entlüfter", beständig: "Ja" },
  { name: "Galvanikbäder (Chrom / Nickel)", concentration: "Prozessmischung", empfohlenerWerkstoff: "PP, PVDF, ECTFE", behälter: "Rechteckbad mit Stahlarmierung", beständig: "Ja" }
];

export const TRUST_FACTORS = [
  { value: "55+", label: "Jahre Handwerk & Fertigung", sub: "Gegründet 1969 in Minden" },
  { value: "100 m³", label: "Maximales Behältervolumen", sub: "Zylindrisch & Rechteckig" },
  { value: "AwSV", label: "Zertifizierter Fachbetrieb", sub: "Geprüft nach Wasserhaushaltsgesetz" },
  { value: "DIBt", label: "Bauartzulassungen", sub: "Z-40.21 für wassergefährdende Stoffe" },
];

export const COMPANY_FACTS = {
  name: "Kunststofftechnik Weber GmbH",
  headquarters: "Minden / Westfalen (Region OWL)",
  secondaryLocation: "Nienburg / Weser",
  phone: "+49 (0) 571 93309-0",
  email: "info@weber-kunststofftechnik.de",
  salesEmail: "vertrieb@weber-kunststofftechnik.de",
  address: "Potsdamer Straße 11, 32423 Minden",
  workingHours: "Mo. – Fr.: 07:30 – 16:30 Uhr",
};
