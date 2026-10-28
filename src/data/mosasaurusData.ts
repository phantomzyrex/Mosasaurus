export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  isEstimate?: boolean;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  location: string;
  description: string;
  significance: string;
}

export interface AnatomyHotspot {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  xPercent: number;
  yPercent: number;
  description: string;
  citation?: string;
  isEstimate?: boolean;
}

export interface SizeSubject {
  id: string;
  name: string;
  subtitle: string;
  conservativeMeters: number;
  maximumMeters: number;
  rangeLabelConservative: string;
  rangeLabelMaximum: string;
  isMosasaurus?: boolean;
}

export interface PreyNode {
  id: string;
  name: string;
  scientificGroup: string;
  trophicLevel: string;
  evidence: string;
  huntingMechanic: string;
  x: number;
  y: number;
}

export interface FossilLocation {
  id: string;
  region: string;
  countries: string;
  formation: string;
  speciesFound: string;
  coordinatesLabel: string;
  svgX: number;
  svgY: number;
  notes: string;
}

export interface SpeciesRecord {
  id: string;
  binomial: string;
  authority: string;
  status: string;
  estimatedLength: string;
  horizon: string;
  summary: string;
}

export interface EvolutionStage {
  id: string;
  ma: string;
  epoch: string;
  title: string;
  bodyAdaptation: string;
  description: string;
  isKpgBoundary?: boolean;
}

export interface MythCard {
  id: string;
  index: string;
  myth: string;
  verdict: string;
  realityTitle: string;
  realityDetail: string;
  evidenceRef: string;
}

export interface GalleryItem {
  id: string;
  index: string;
  assetPath: string;
  title: string;
  catalogNumber: string;
  caption: string;
  dimensionsLabel: string;
  specimenType: 'skull' | 'skeleton' | 'quarry' | 'dentition' | 'skin' | 'hunting';
}

export const HERO_CUTOUT_PATH = '/assets/mosasaurus-hero.png';
export const HERO_CUTOUT_FALLBACK = '/assets/aistudio/Mottled_Mosasaur_Predator_Cutout_9dd89b3c.png';
export const SIDE_CUTOUT_PATH = '/assets/mosasaurus-side.png';
export const MOSASAURUS_ROAR_AUDIO_PATH = '/assets/aistudio/roar_mosasaurus_1c4db046.mp3';

export const MENU_CHAPTERS = [
  { number: '01', label: 'Hero — Surface', href: '#hero', depth: '0 m' },
  { number: '02', label: 'Overview — The Meuse Lizard', href: '#overview', depth: '18 m' },
  { number: '03', label: 'Discovery & History', href: '#discovery', depth: '36 m' },
  { number: '04', label: 'Anatomical Atlas', href: '#anatomy', depth: '58 m' },
  { number: '05', label: 'Size & Scale Comparison', href: '#size', depth: '80 m' },
  { number: '06', label: 'Diet & Trophic Web', href: '#diet', depth: '102 m' },
  { number: '07', label: 'Habitat & Distribution', href: '#habitat', depth: '124 m' },
  { number: '08', label: 'Classification & Species', href: '#taxonomy', depth: '142 m' },
  { number: '09', label: 'Evolution & K–Pg Extinction', href: '#extinction', depth: '160 m' },
  { number: '10', label: 'Myth vs. Reality', href: '#myths', depth: '174 m' },
  { number: '11', label: 'Archival Exhibition Gallery', href: '#gallery', depth: '186 m' },
  { number: '12', label: 'Fast Facts & Sources', href: '#facts', depth: '194 m' },
  { number: '13', label: 'Contact & Colophon', href: '#contact', depth: '200 m' },
];

export const OVERVIEW_STATS: StatItem[] = [
  {
    id: 'meaning',
    label: 'Name Meaning',
    value: '“Meuse Lizard”',
    subtext: 'From the Meuse River (Netherlands) + Greek sauros (“lizard”)',
  },
  {
    id: 'temporal',
    label: 'Temporal Range',
    value: '~82 – 66 Ma',
    subtext: 'Late Cretaceous Epoch (Campanian to Maastrichtian stages)',
    isEstimate: true,
  },
  {
    id: 'length',
    label: 'Adult Body Length',
    value: '~11 – 12 m (36 – 40 ft)',
    subtext: 'For M. hoffmannii; older, disputed estimates reach about 17 m',
    isEstimate: true,
  },
  {
    id: 'mass',
    label: 'Estimated Body Mass',
    value: 'Several to 10+ tonnes',
    subtext: 'Volumetric estimates vary widely across specimens',
    isEstimate: true,
  },
  {
    id: 'skull',
    label: 'Cranial Length',
    value: 'About 1.5 m long',
    subtext: 'Robust conical, double-edged marginal & pterygoid dentition',
    isEstimate: true,
  },
  {
    id: 'diet',
    label: 'Trophic Niche',
    value: 'Carnivore · Apex Predator',
    subtext: 'Preyed on fish, sharks, ammonites, turtles & smaller mosasaurs',
  },
  {
    id: 'habitat',
    label: 'Marine Habitat',
    value: 'Warm Shallow-to-Open Seas',
    subtext: 'Epicontinental chalk seas & oceanic margins worldwide',
  },
  {
    id: 'status',
    label: 'Conservation Status',
    value: 'Extinct (66.0 Ma)',
    subtext: 'Wiped out during the end-Cretaceous (K–Pg) mass extinction',
  },
];

export const DISCOVERY_TIMELINE: TimelineEvent[] = [
  {
    id: '1764',
    year: '1764',
    title: 'First Fossil Fragments Unearthed',
    location: 'Maastricht, Netherlands',
    description:
      'Quarry workers excavating limestone blocks near Maastricht report the first partial fossilized jaws and teeth of an unknown marine creature.',
    significance: 'Earliest documented European specimen of a mosasaurid.',
  },
  {
    id: '1770',
    year: 'c. 1770–1780',
    title: 'The Famous Skull of Mount Saint Peter',
    location: 'Sint-Pietersberg Chalk Quarries, Maastricht',
    description:
      'A monumental, articulated fossilized skull—soon dubbed le grand animal fossile de Maestricht—is recovered from the subterranean chalk galleries beneath Mount Saint Peter and studied by surgeon Johann Leonard Hoffmann.',
    significance: 'Holotype specimen MNHN AC 9648; catalyst for vertebrate paleontology.',
  },
  {
    id: '1794',
    year: '1794–1795',
    title: 'Siege of Maastricht & Transfer to Paris',
    location: 'Maastricht to Muséum National, Paris',
    description:
      'Following the capture of Maastricht by French revolutionary forces, the famous fossil skull is claimed as a scientific prize and transported to the Muséum National d’Histoire Naturelle in Paris.',
    significance: 'Placed the specimen directly before Europe’s leading comparative anatomists.',
  },
  {
    id: '1808',
    year: '1808',
    title: 'Georges Cuvier Proves Extinction',
    location: 'Paris, France',
    description:
      'Comparative anatomist Georges Cuvier definitively demonstrates that the Maastricht skull belonged neither to a whale nor a crocodile, but to a giant extinct marine lizard allied to monitor lizards.',
    significance: 'A landmark milestone establishing the scientific reality of biological extinction.',
  },
  {
    id: '1822',
    year: '1822',
    title: 'William Conybeare Names Mosasaurus',
    location: 'London & Oxford, United Kingdom',
    description:
      'English geologist William Conybeare formally coins the genus name Mosasaurus (“Lizard of the Meuse River”) in Parkinson’s Outlines of Oryctology.',
    significance: 'Formal taxonomic establishment of the genus Mosasaurus.',
  },
  {
    id: '1829',
    year: '1829',
    title: 'Gideon Mantell Names Mosasaurus hoffmannii',
    location: 'Sussex, United Kingdom',
    description:
      'Paleontologist Gideon Mantell establishes the type species binomial Mosasaurus hoffmannii, honouring surgeon Johann Leonard Hoffmann’s early anatomical work on the Maastricht fossils.',
    significance: 'Fixes the type species of the family Mosasauridae.',
  },
  {
    id: 'today',
    year: 'Today',
    title: 'Global Discoveries & High-Resolution Paleobiology',
    location: 'Worldwide Marine Basins',
    description:
      'Fossils continue to be excavated from North America, Morocco, Japan, New Zealand, and Europe. Modern synchrotron imaging, isotope geochemistry, and melanosome analysis continue to refine how Mosasaurus swam, hunted, and regulated body heat.',
    significance: 'Ongoing research into endothermy, fluke propulsion, and K–Pg marine collapse.',
  },
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'skull-jaws',
    number: '01',
    title: 'Skull and Jaws',
    shortLabel: '1.5 m Cranial Architecture',
    xPercent: 14,
    yPercent: 17,
    description:
      'A long, heavily ossified ~1.5 m skull armed with robust, cone-shaped, double-edged (bicarinate) teeth engineered for both high-force gripping and slicing through bone and shell.',
    isEstimate: true,
  },
  {
    id: 'double-hinged-jaw',
    number: '02',
    title: 'Double-Hinged Lower Jaw',
    shortLabel: 'Intramandibular Joint',
    xPercent: 26,
    yPercent: 30,
    description:
      'An extra shock-absorbing joint (intramandibular articulation) mid-way along the lower jaw allowed the mandibles to bow outward and open wide to swallow large struggling prey.',
  },
  {
    id: 'palate-teeth',
    number: '03',
    title: 'Palate Teeth (Pterygoid Dentition)',
    shortLabel: 'Roof-of-Mouth Ratchet',
    xPercent: 21,
    yPercent: 22,
    description:
      'A formidable second inner set of recurved teeth anchored on the pterygoid bones of the roof of the mouth helped grip and ratchet slippery prey backward down the throat, similar to modern snakes.',
  },
  {
    id: 'nostrils',
    number: '04',
    title: 'Retracted Dorsal Nostrils',
    shortLabel: 'Air-Breathing Adaptation',
    xPercent: 19,
    yPercent: 10,
    description:
      'External nostrils (nares) were positioned far back along the top of the snout because Mosasaurus breathed atmospheric air and had to surface regularly between dives.',
  },
  {
    id: 'eyes',
    number: '05',
    title: 'Large Sclerotic-Ringed Eyes',
    shortLabel: 'Dim-Water Optics',
    xPercent: 33,
    yPercent: 12,
    description:
      'Large orbits reinforced by a ring of overlapping bony plates (sclerotic ring) maintained eyeball shape under water pressure and were likely adapted to hunting in dim marine light.',
  },
  {
    id: 'flippers',
    number: '06',
    title: 'Hydrofoil Flippers (Hyperphalangy)',
    shortLabel: 'Steering Paddles',
    xPercent: 40,
    yPercent: 66,
    description:
      'Four webbed, paddle-shaped flippers stiffened by extra finger and toe bones (hyperphalangy), used mainly for directional steering, roll control, and rapid ambush pivots.',
  },
  {
    id: 'skin-colour',
    number: '07',
    title: 'Countershaded Scales & Skin',
    shortLabel: 'Melanosome Camouflage',
    xPercent: 56,
    yPercent: 35,
    description:
      'Fossilized skin from related mosasaurs reveals small, keeled diamond scales that reduced hydrodynamic drag and preserved melanosomes indicating dark-backed, lighter-bellied countershading.',
    citation: 'Lindgren et al., 2014',
  },
  {
    id: 'metabolism',
    number: '08',
    title: 'Endothermic Metabolism',
    shortLabel: 'Warm-Blooded Physiology',
    xPercent: 60,
    yPercent: 54,
    description:
      'Oxygen isotope ratios in tooth enamel suggest mosasaurs may have been warm-blooded (endothermic), maintaining elevated core temperatures as active, high-performance predators (still debated).',
    citation: 'Harrell et al., 2016',
    isEstimate: true,
  },
  {
    id: 'body-tail',
    number: '09',
    title: 'Streamlined Body & Fluked Tail',
    shortLabel: 'Primary Propulsion Engine',
    xPercent: 90,
    yPercent: 46,
    description:
      'A muscular, streamlined trunk tapering into a long, powerful tail that ended in a shark-like two-lobed fluke (inferred from preserved soft tissue in related mosasaurs), acting as the main engine for swimming.',
    isEstimate: true,
  },
];

export const SIZE_SUBJECTS: SizeSubject[] = [
  {
    id: 'human',
    name: 'Adult Human Diver',
    subtitle: 'Homo sapiens (reference scale)',
    conservativeMeters: 1.7,
    maximumMeters: 1.7,
    rangeLabelConservative: '1.7 m (5.6 ft)',
    rangeLabelMaximum: '1.7 m (5.6 ft)',
  },
  {
    id: 'shark',
    name: 'Great White Shark',
    subtitle: 'Carcharodon carcharias (modern ocean apex)',
    conservativeMeters: 5.5,
    maximumMeters: 5.5,
    rangeLabelConservative: 'About 5–6 m (16–20 ft) estimate',
    rangeLabelMaximum: 'About 5–6 m (16–20 ft) estimate',
  },
  {
    id: 'orca',
    name: 'Orca (Killer Whale)',
    subtitle: 'Orcinus orca (largest modern oceanic delphinid)',
    conservativeMeters: 7.5,
    maximumMeters: 7.5,
    rangeLabelConservative: 'About 6–8 m (20–26 ft) estimate',
    rangeLabelMaximum: 'About 6–8 m (20–26 ft) estimate',
  },
  {
    id: 'bus',
    name: 'Standard City Transit Bus',
    subtitle: 'Single-deck urban transit vehicle',
    conservativeMeters: 12.0,
    maximumMeters: 12.0,
    rangeLabelConservative: 'About 12.0 m (39.4 ft)',
    rangeLabelMaximum: 'About 12.0 m (39.4 ft)',
  },
  {
    id: 'mosasaurus',
    name: 'Mosasaurus hoffmannii',
    subtitle: 'Late Cretaceous Squamate Apex Predator',
    conservativeMeters: 11.5,
    maximumMeters: 17.0,
    rangeLabelConservative: 'About 11–12 m (36–40 ft) peer-reviewed estimate',
    rangeLabelMaximum: 'About 17 m (56 ft) older, disputed maximum estimate',
    isMosasaurus: true,
  },
];

export const PREY_NODES: PreyNode[] = [
  {
    id: 'fish',
    name: 'Large Bony Fishes',
    scientificGroup: 'Pachyrhizodus, Enchodus & Xiphactinus',
    trophicLevel: 'Secondary Consumers',
    evidence: 'Partially digested teleost vertebrae and skull elements preserved inside mosasaur ribcages.',
    huntingMechanic: 'Seized mid-water with rapid lateral head snaps and swallowed head-first using pterygoid palate teeth.',
    x: 18,
    y: 26,
  },
  {
    id: 'sharks',
    name: 'Cretaceous Sharks',
    scientificGroup: 'Squalicorax & Cretoxyrhina',
    trophicLevel: 'Mesopredators & Rival Predators',
    evidence: 'Mutual bite trauma on fossilized cartilage and shed shark teeth associated with mosasaur skeletons.',
    huntingMechanic: 'Overpowered via sheer cranial mass and ambush acceleration from below.',
    x: 82,
    y: 26,
  },
  {
    id: 'ammonites',
    name: 'Ammonites & Cephalopods',
    scientificGroup: 'Pachydiscus, Placenticeras & Belemnites',
    trophicLevel: 'Pelagic Nekton',
    evidence: 'Conical, perforated tooth rows matching mosasaur jaw geometry stamped into fossilized ammonite shells.',
    huntingMechanic: 'Robust posterior teeth crushed coiled aragonite shells to extract the soft mollusc within.',
    x: 14,
    y: 68,
  },
  {
    id: 'turtles',
    name: 'Giant Sea Turtles',
    scientificGroup: 'Allopleuron hoffmanni & Protostegids',
    trophicLevel: 'Large Marine Herbivores / Omnivores',
    evidence: 'Healed and unhealed circular puncture wounds preserved across fossilized Maastrichtian turtle carapaces.',
    huntingMechanic: 'Bicarinate teeth sheared through leathery carapaces and flippers.',
    x: 86,
    y: 68,
  },
  {
    id: 'seabirds',
    name: 'Diving Seabirds',
    scientificGroup: 'Hesperornis & Baptornis',
    trophicLevel: 'Piscivorous Avian Divers',
    evidence: 'Hesperornithiform bones documented within Late Cretaceous mosasaur gut contents.',
    huntingMechanic: 'Snatched near the sunlit surface zone when birds dove for schooling fish.',
    x: 32,
    y: 84,
  },
  {
    id: 'mosasaurs',
    name: 'Smaller Mosasaurs (Cannibalism)',
    scientificGroup: 'Juvenile Mosasaurus, Plioplatecarpus & Prognathodon',
    trophicLevel: 'Intraguild Predation',
    evidence: 'Documented fatal mosasaur bite gauges on smaller mosasaur skulls and articulated stomach remains.',
    huntingMechanic: 'Territorial and opportunistic predation; skull-crushing strikes targeted the braincase and neck.',
    x: 68,
    y: 84,
  },
];

export const FOSSIL_LOCATIONS: FossilLocation[] = [
  {
    id: 'europe-maastricht',
    region: 'Maastricht & Limburg Basin (Europe)',
    countries: 'Netherlands & Belgium',
    formation: 'Maastricht Formation (Subterranean Chalk Quarries)',
    speciesFound: 'Mosasaurus hoffmannii (Type Locality), M. lemonnieri',
    coordinatesLabel: '50.85° N, 5.69° E',
    svgX: 495,
    svgY: 145,
    notes: 'Site of the historic 1764 and c. 1770–1780 Mount Saint Peter discoveries in shallow warm chalk seas.',
  },
  {
    id: 'europe-scandinavia',
    region: 'Boreal Chalk Basin (Northern Europe)',
    countries: 'Denmark & Sweden',
    formation: 'Kristianstad Basin & Stevns Klint Chalk',
    speciesFound: 'Mosasaurus hoffmannii, M. lemonnieri',
    coordinatesLabel: '55.99° N, 14.15° E',
    svgX: 518,
    svgY: 118,
    notes: 'Demonstrates Mosasaurus hunted across high-latitude European epicontinental seas right up to the K–Pg boundary.',
  },
  {
    id: 'na-atlantic',
    region: 'Atlantic Coastal Plain (North America)',
    countries: 'New Jersey, USA',
    formation: 'Navesink & Hornerstown Greensand Formations',
    speciesFound: 'Mosasaurus hoffmannii (incl. M. maximus), M. conodon',
    coordinatesLabel: '40.05° N, 74.40° W',
    svgX: 282,
    svgY: 180,
    notes: 'Rich glauconitic greensand beds preserving huge Maastrichtian jaws and skulls along the proto-Atlantic shelf.',
  },
  {
    id: 'na-interior',
    region: 'Western Interior Seaway (North America)',
    countries: 'Kansas & South Dakota, USA',
    formation: 'Pierre Shale & Niobrara Chalk Horizons',
    speciesFound: 'Mosasaurus missouriensis, M. conodon',
    coordinatesLabel: '43.96° N, 100.18° W',
    svgX: 215,
    svgY: 168,
    notes: 'A vast warm inland sea that split North America in two, hosting dense populations of mosasaurs, ammonites, and seabirds.',
  },
  {
    id: 'na-gulf',
    region: 'Gulf Coastal Plain (North America)',
    countries: 'Alabama & Mississippi, USA',
    formation: 'Selma Group & Demopolis Chalk',
    speciesFound: 'Mosasaurus hoffmannii, M. missouriensis, M. conodon',
    coordinatesLabel: '32.80° N, 86.79° W',
    svgX: 248,
    svgY: 206,
    notes: 'Subtropical carbonate shelf sediments preserving articulated skulls and isolated shed teeth.',
  },
  {
    id: 'africa-morocco',
    region: 'Oulad Abdoun & Ganntour Basins (North Africa)',
    countries: 'Morocco',
    formation: 'Upper Couche III Maastrichtian Phosphates',
    speciesFound: 'Mosasaurus beaugei, M. hoffmannii',
    coordinatesLabel: '32.88° N, 6.90° W',
    svgX: 468,
    svgY: 218,
    notes: 'Upwelling-driven Late Cretaceous marine ecosystem teeming with multiple coexisting apex mosasaur species.',
  },
  {
    id: 'asia-japan',
    region: 'Northwestern Pacific Margin (Asia)',
    countries: 'Japan (Hokkaido & Honshu)',
    formation: 'Yezo Group & Izumi Group Marine Mudstones',
    speciesFound: 'Mosasaurus hobetsuensis, M. prismaticus',
    coordinatesLabel: '42.82° N, 142.06° E',
    svgX: 836,
    svgY: 175,
    notes: 'Confirms Mosasaurus expanded into the open North Pacific basin during the Campanian and Maastrichtian.',
  },
  {
    id: 'oceania-nz',
    region: 'Southern Ocean Margin (Oceania)',
    countries: 'New Zealand (South Island)',
    formation: 'Conway Siltstone, Haumuri Bluff & Waipara',
    speciesFound: 'Mosasaurus flemingi, Mosasaurus sp.',
    coordinatesLabel: '43.15° S, 172.73° E',
    svgX: 895,
    svgY: 425,
    notes: 'High-southern-latitude fossils demonstrating a virtually global oceanic distribution prior to 66 Ma.',
  },
];

export const TAXONOMY_RANKS = [
  { rank: 'Kingdom', taxon: 'Animalia', detail: 'Multicellular eukaryotic organisms' },
  { rank: 'Phylum', taxon: 'Chordata', detail: 'Vertebrates with dorsal nerve cord' },
  { rank: 'Class', taxon: 'Reptilia', detail: 'Amniote sauropsids' },
  { rank: 'Order', taxon: 'Squamata', detail: 'Scaled reptiles — lizards and snakes (NOT dinosaurs)' },
  { rank: 'Family', taxon: 'Mosasauridae', detail: 'Extinct Late Cretaceous marine lizards' },
  { rank: 'Subfamily', taxon: 'Mosasaurinae', detail: 'Hydropedal mosasaurs with well-developed tail flukes' },
  { rank: 'Genus', taxon: 'Mosasaurus', detail: 'Conybeare, 1822 · Roughly 5–8 recognised species (taxonomy debated)' },
];

export const SPECIES_LIST: SpeciesRecord[] = [
  {
    id: 'hoffmannii',
    binomial: 'Mosasaurus hoffmannii',
    authority: 'Mantell, 1829',
    status: 'Type Species · Valid',
    estimatedLength: '~11–12 m estimate (older disputed estimates ~17 m)',
    horizon: 'Late Maastrichtian (Europe, North America, Morocco, South Atlantic)',
    summary:
      'The type and largest well-known species of the genus, characterized by a massive ~1.5 m skull, barrel-chested trunk, and faceted bicarinate teeth built for overpowering large marine vertebrates.',
  },
  {
    id: 'lemonnieri',
    binomial: 'Mosasaurus lemonnieri',
    authority: 'Dollo, 1889',
    status: 'Recognised (Taxonomic status debated)',
    estimatedLength: '~7–10 m estimate',
    horizon: 'Late Campanian to Maastrichtian (Belgium, Netherlands)',
    summary:
      'Represented by multiple exceptionally complete skeletons in Brussels; features a narrower snout and more sinusoidal jaw profile, though some researchers debate whether certain specimens represent subadult M. hoffmannii.',
  },
  {
    id: 'missouriensis',
    binomial: 'Mosasaurus missouriensis',
    authority: 'Harlan, 1834',
    status: 'Recognised · Valid',
    estimatedLength: '~8–10 m estimate',
    horizon: 'Campanian to Maastrichtian (Western Interior Seaway, North America)',
    summary:
      'Famous in early American paleontology (the Goldfuss-Maximilian skull); slightly smaller and more gracile than M. hoffmannii with a prominent premaxillary rostrum.',
  },
  {
    id: 'conodon',
    binomial: 'Mosasaurus conodon',
    authority: 'Cope, 1881',
    status: 'Recognised (Generic placement debated)',
    estimatedLength: '~7–9 m estimate',
    horizon: 'Late Campanian to Maastrichtian (North America & Europe)',
    summary:
      'A slender-bodied predator with smoother, more laterally compressed piercing teeth suited for fast-swimming pelagic fish and cephalopods.',
  },
  {
    id: 'beaugei',
    binomial: 'Mosasaurus beaugei',
    authority: 'Arambourg, 1952',
    status: 'Recognised · Valid',
    estimatedLength: '~9–11 m estimate',
    horizon: 'Late Maastrichtian (Phosphates of Morocco)',
    summary:
      'An apex predator of the North African phosphate seas equipped with fewer, strongly compressed, blade-like teeth with sharp cutting edges.',
  },
];

export const EVOLUTION_STAGES: EvolutionStage[] = [
  {
    id: 'cenomanian',
    ma: '~100 – 94 Ma',
    epoch: 'Cenomanian (Early Late Cretaceous)',
    title: 'Semi-Aquatic Squamate Ancestors',
    bodyAdaptation: ' ~1–2 m lizard-like coastal swimmers (Aigialosaurs)',
    description:
      'Mosasauroids diverge from small, semi-aquatic terrestrial lizards related to monitor lizards and snakes, entering warm shallow Tethyan lagoons while retaining functional clawed limbs.',
  },
  {
    id: 'turonian-santonian',
    ma: '~90 – 83 Ma',
    epoch: 'Turonian to Santonian',
    title: 'Open-Ocean Transition & Viviparity',
    bodyAdaptation: 'Webbed hydrofoil paddles, retracted nostrils & live birth',
    description:
      'Limbs transform into true steering flippers (hyperphalangy) and tails develop hypocercal flukes. Fossil evidence from related mosasaurids confirms live birth (viviparity) in open water—never returning to land to lay eggs.',
  },
  {
    id: 'campanian-maastrichtian',
    ma: '~82 – 66.1 Ma',
    epoch: 'Campanian to Maastrichtian',
    title: 'Global Apex Dominance of Mosasaurus',
    bodyAdaptation: '11–12 m endothermic-grade oceanic top predators',
    description:
      'Within roughly 30 million years of leaving land, the genus Mosasaurus achieves worldwide supremacy across epicontinental and open oceans, outcompeting earlier marine reptile guilds.',
  },
  {
    id: 'kpg-extinction',
    ma: '66.0 Ma',
    epoch: 'End-Cretaceous (K–Pg) Mass Extinction Boundary',
    title: 'Chicxulub Impact & Marine Trophic Collapse',
    bodyAdaptation: 'Total extinction of Mosasauridae, Plesiosauria & Ammonidea',
    description:
      'Triggered by the Chicxulub asteroid impact (~66 million years ago), prolonged impact darkness halted marine photosynthesis, collapsing plankton and ammonite food webs and wiping out Mosasaurus alongside plesiosaurs and non-avian dinosaurs.',
    isKpgBoundary: true,
  },
];

export const MYTH_CARDS: MythCard[] = [
  {
    id: 'dinosaur',
    index: '01',
    myth: '“Mosasaurus was a swimming dinosaur.”',
    verdict: 'FALSE · MARINE SQUAMATE LIZARD',
    realityTitle: 'No, it was a giant marine lizard.',
    realityDetail:
      'Dinosaurs belong to the archosaur clade (alongside birds and crocodilians). Mosasaurus belonged to Order Squamata—making it a true lizard closely related to modern monitor lizards (varanids) and snakes.',
    evidenceRef: 'Order Squamata · Conybeare (1822)',
  },
  {
    id: 'breathing',
    index: '02',
    myth: '“It could breathe underwater with gills.”',
    verdict: 'FALSE · PULMONARY AIR-BREATHER',
    realityTitle: 'No, it was an air-breathing reptile.',
    realityDetail:
      'Like whales and sea turtles today, Mosasaurus breathed atmospheric air using lungs. Its nostrils were shifted backward on the top of its snout so it could inhale rapidly at the ocean surface.',
    evidenceRef: 'Retracted dorsal nares · Comparative osteology',
  },
  {
    id: 'jurassic-world-size',
    index: '03',
    myth: '“It was 20+ metres long, as shown in Jurassic World.”',
    verdict: 'EXAGGERATED · ~11–12 M REAL ESTIMATE',
    realityTitle: 'Cinema exaggerates its scale; real estimates are about 11–12 m.',
    realityDetail:
      'Blockbuster films depict a whale-dwarfing 25–30 m kaiju. Peer-reviewed osteological scaling places large Mosasaurus hoffmannii adults at about 11–12 m (36–40 ft), with older disputed estimates reaching about 17 m.',
    evidenceRef: 'Grigoriev (2014) · Street & Caldwell (2017)',
  },
  {
    id: 'trex-coexistence',
    index: '04',
    myth: '“It lived in a completely different era from T. rex.”',
    verdict: 'CONTEMPORARY · DIFFERENT REALMS',
    realityTitle: 'It lived at the exact same time as T. rex, but in the oceans.',
    realityDetail:
      'Mosasaurus hoffmannii and Tyrannosaurus rex both reigned during the final two million years of the Maastrichtian stage (68–66 million years ago)—one ruling the continents, the other ruling the seas.',
    evidenceRef: 'Late Maastrichtian Chronostratigraphy (68–66 Ma)',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-01',
    index: '01',
    assetPath: '/assets/gallery-01.jpg',
    title: 'The Grand Skull of Maastricht (MNHN AC 9648)',
    catalogNumber: 'ARCHIVE PLATE I · MAASTRICHTIAN',
    caption:
      'Historic holotype jaws of Mosasaurus hoffmannii recovered c. 1770–1780 beneath Mount Saint Peter, displaying bicarinate marginal teeth and exposed pterygoid dentition.',
    dimensionsLabel: '1.5 m cranial length (estimate)',
    specimenType: 'skull',
  },
  {
    id: 'gallery-02',
    index: '02',
    assetPath: '/assets/gallery-02.jpg',
    title: 'Articulated Skeletal Reconstruction',
    catalogNumber: 'ARCHIVE PLATE II · AXIAL OSTEOLOGY',
    caption:
      'Full axial profile showing the streamlined vertebral column, hyperphalangic steering paddles, and downward-deflected caudal vertebrae supporting a two-lobed tail fluke.',
    dimensionsLabel: '11–12 m total body length (estimate)',
    specimenType: 'skeleton',
  },
  {
    id: 'gallery-03',
    index: '03',
    assetPath: '/assets/gallery-03.jpg',
    title: 'Subterranean Chalk Galleries of Sint-Pietersberg',
    catalogNumber: 'ARCHIVE PLATE III · TYPE LOCALITY',
    caption:
      'Late Cretaceous bioclastic limestone strata along the Meuse River valley where shallow warm seas preserved the earliest known mosasaur fossils in 1764.',
    dimensionsLabel: '67.0 – 66.0 Ma Maastrichtian horizon',
    specimenType: 'quarry',
  },
  {
    id: 'gallery-04',
    index: '04',
    assetPath: '/assets/gallery-04.jpg',
    title: 'Pterygoid Palate & Intramandibular Hinge Detail',
    catalogNumber: 'ARCHIVE PLATE IV · FEEDING MECHANICS',
    caption:
      'Close-up cranial biomechanics illustrating the recurved roof-of-mouth teeth and flexible lower jaw joint that enabled swallowing large pelagic prey.',
    dimensionsLabel: 'Bicarinate enamel crowns',
    specimenType: 'dentition',
  },
  {
    id: 'gallery-05',
    index: '05',
    assetPath: '/assets/gallery-05.jpg',
    title: 'Keeled Scale Impressions & Countershading',
    catalogNumber: 'ARCHIVE PLATE V · INTEGUMENTARY RECORD',
    caption:
      'Micro-anatomical reconstruction of diamond-shaped keeled squamate scales and melanosome-derived dark dorsal / pale ventral pelagic camouflage (Lindgren et al., 2014).',
    dimensionsLabel: '2–4 mm scale carinae',
    specimenType: 'skin',
  },
  {
    id: 'gallery-06',
    index: '06',
    assetPath: '/assets/gallery-06.jpg',
    title: 'Late Cretaceous Epipelagic Ambush Reconstruction',
    catalogNumber: 'ARCHIVE PLATE VI · PALEOECOLOGY',
    caption:
      'Mosasaurus hoffmannii ascending from the dim mesopelagic zone into sunlit surface waters in pursuit of ammonites and diving hesperornithiform seabirds.',
    dimensionsLabel: '0 – 200 m epipelagic water column',
    specimenType: 'hunting',
  },
];

export const FAST_FACTS: { number: string; title: string; detail: string }[] = [
  {
    number: '01',
    title: 'First Giant Reptile Known to Science',
    detail:
      'Discovered in 1764—decades before Iguanodon or Megalosaurus were described—Mosasaurus was the fossil that convinced Georges Cuvier in 1808 that entire species could go extinct.',
  },
  {
    number: '02',
    title: 'A Second Set of Teeth on its Palate',
    detail:
      'Like snakes, Mosasaurus carried curved pterygoid teeth on the roof of its mouth to grip slippery prey and walk it down the oesophagus without letting go.',
  },
  {
    number: '03',
    title: 'Named After a Dutch River',
    detail:
      '“Mosasaurus” translates to “Lizard of the Meuse” (from Mosa, the Latin name for the Meuse River flowing past Maastricht, + Greek sauros).',
  },
  {
    number: '04',
    title: 'Live Birth in the Open Ocean',
    detail:
      'Fossils of related mosasaurs show they gave birth to live young (viviparity) tail-first in open water rather than crawling onto beaches to lay eggs.',
  },
  {
    number: '05',
    title: 'Warm-Blooded Marine Cruiser',
    detail:
      'Oxygen isotope signatures in tooth enamel (Harrell et al., 2016) indicate mosasaurs likely maintained warm internal body temperatures higher than the surrounding sea.',
  },
  {
    number: '06',
    title: 'Countershaded Like a Great White Shark',
    detail:
      'Fossil pigment organelles (melanosomes) analyzed by Lindgren et al. (2014) reveal mosasaurs had dark backs and light bellies for open-ocean camouflage.',
  },
  {
    number: '07',
    title: 'Shark-Style Tail Fluke Engine',
    detail:
      'Rather than swimming purely like an eel, derived mosasaurs possessed a downward kink at the end of the tail backbone supporting a two-lobed fleshy tail fluke.',
  },
  {
    number: '08',
    title: 'Reigned Until the Day the Asteroid Struck',
    detail:
      'Mosasaurus was not in decline; it remained a cosmopolitan ocean apex predator right up until the Chicxulub impact terminated the Cretaceous Period 66 million years ago.',
  },
];

export const SCIENTIFIC_SOURCES = [
  {
    id: 'naturalis',
    institution: 'Naturalis Biodiversity Center, Leiden',
    reference: 'Dutch National Paleontological Archives & Maastrichtian Reference Collection',
    year: 'Institutional Repository',
  },
  {
    id: 'nhm',
    institution: 'Natural History Museum, London',
    reference: 'Fossil Marine Reptiles Collection & Mantell (1829) Taxonomic Records',
    year: 'Institutional Repository',
  },
  {
    id: 'smithsonian',
    institution: 'Smithsonian National Museum of Natural History (NMNH)',
    reference: 'Western Interior Seaway & Atlantic Coastal Plain Mosasaurid Holdings, Washington D.C.',
    year: 'Institutional Repository',
  },
  {
    id: 'cuvier-1808',
    institution: 'Cuvier, G. (1808)',
    reference: 'Sur le grand animal fossile des carrières de Maestricht. Annales du Muséum National d’Histoire Naturelle, Paris, 12, 145–176.',
    year: 'Primary Monograph · 1808',
  },
  {
    id: 'lindgren-2014',
    institution: 'Lindgren, J. et al. (2014)',
    reference: 'Skin pigmentation provides evidence of convergent melanism in extinct marine reptiles. Nature, 506(7489), 484–488.',
    year: 'Peer-Reviewed Study · 2014',
  },
  {
    id: 'harrell-2016',
    institution: 'Harrell, T. L., Pérez-Huerta, A., & Suarez, C. A. (2016)',
    reference: 'Endothermic mosasaurs? Possible thermoregulation of Late Cretaceous mosasaurs (Reptilia, Squamata) indicated by stable oxygen isotopes. Palaeontology, 59(3), 351–363.',
    year: 'Peer-Reviewed Study · 2016',
  },
];
