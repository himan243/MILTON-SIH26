import {
  TraditionalGame,
  TraditionalCraft,
  ArtisanProduct,
  FoodStory,
  NostalgicBuild,
  GameSession,
  CulturalChallenge,
  BadgeInfo,
  CommunityPreserveItem,
  AdminAnalytics,
  UserContact,
  ActiveUserSession,
  SiteMediaItem,
  ArtisanWaitlistEntry
} from '@/types';

export const INITIAL_GAMES: TraditionalGame[] = [
  {
    id: 'pittu-seven-stones',
    name: 'Pittu (Seven Stones / Lagori)',
    vernacularNames: {
      hi: 'पिट्ठू / सात पत्थर',
      as: 'সাত শিলগুটি (Xaat Xil)',
      bn: 'সাত চাড়া (Sat Chara)',
      bodo: 'अन्थाय गेलेमु'
    },
    region: 'Pan-India & Assam Valley',
    tagline: 'Stack seven flat river stones, strike them with a ball, and rebuild the tower under fire.',
    story: 'Played on dusty afternoon alleys and riverbanks for centuries, Pittu tests speed, hand-eye coordination, and strategic team shielding. The seeking team aims to hit players with a soft ball while the seekers sprint to stack the fallen stones before getting tagged out.',
    historicalEra: 'Ancient / Traditional Street Heritage',
    playersCount: '2 Teams (4 to 8 players per team)',
    difficultyLevel: 3,
    equipmentNeeded: ['7 flat river stones of decreasing sizes', '1 soft rubber or woven cloth ball', 'Chalk or stick to mark boundary circle'],
    playingArea: 'Open courtyard, backyard, or school field (min 15m x 15m)',
    howToPlay: [
      'Stack the 7 stones in a vertical tower inside a small circle.',
      'Team A throws the ball from the crease to knock down the tower.',
      'Once the tower falls, Team A players must restack all 7 stones in order.',
      'Team B collects the ball and tries to hit (tag) Team A runners below the waist before the tower is rebuilt.',
      'If Team A stacks all stones and shouts "PITTU!", they score a victory point.'
    ],
    rules: [
      'Throws must be from behind the throwing crease.',
      'No running with the ball: Team B must pass to each other to tag.',
      'Only hits below the shoulders are valid tags.',
      'Rebuilt tower must stand unsupported for 3 seconds.'
    ],
    skillsDeveloped: ['Agility & Sprinting', 'Throwing Accuracy', 'Teamwork & Strategy', 'Spatial Awareness'],
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1600&q=80',
    relatedMarketplaceItemIds: ['prod-bamboo-ball-set', 'prod-river-stone-set'],
    activePlayersNearbyCount: 14,
    featured: true
  },
  {
    id: 'shollo-ana-sixteen-soldiers',
    name: 'Shollo Ana (16 Soldiers / Sholo Guti)',
    vernacularNames: {
      as: 'ষোল গুটি (Xolo Guti)',
      bn: 'ষোল ঘুঁটি (Sholo Guti)',
      hi: 'सोलह गोटी',
      bodo: 'जिस्नि गुटि'
    },
    region: 'Assam, Bengal, Meghalaya',
    tagline: 'An ancient tactical board game of kings, tiger traps, and village courtyards.',
    story: 'Dating back to medieval agrarian kingdoms across the Brahmaputra and Surma valleys, Sholo Guti was traditionally etched with chalk onto stone veranda floors or woven into jute mats using tamarind seeds and pebbles as pawns.',
    historicalEra: '14th Century Heritage',
    playersCount: '2 Players',
    difficultyLevel: 4,
    equipmentNeeded: ['Grid board with 37 intersecting points', '16 dark pawns (beads/pebbles)', '16 light pawns (cowrie shells/stones)'],
    playingArea: 'Tabletop or courtyard floor',
    howToPlay: [
      'Each player arranges their 16 pawns on their side of the board leaving the middle horizontal line vacant.',
      'Players take turns moving one piece along connected lines to an adjacent empty spot.',
      'Capture an opponent piece by jumping over it into an immediate vacant spot along a straight line.',
      'Multiple jumps are permitted in a single turn if valid capture chains exist.',
      'The player who captures all 16 enemy pieces wins.'
    ],
    rules: [
      'No backward jumping unless entering adjacent triangular court.',
      'Pieces can only move along designated straight grid lines.',
      'Mandatory capture rules may apply in traditional village tournaments.'
    ],
    skillsDeveloped: ['Strategic Foresight', 'Pattern Recognition', 'Mathematical Thinking', 'Patience'],
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1600&q=80',
    relatedMarketplaceItemIds: ['prod-handwoven-sholo-guti-mat'],
    activePlayersNearbyCount: 9,
    featured: true
  },
  {
    id: 'gilli-danda-chela-bata',
    name: 'Gilli Danda (Chela-Bata / Dang-Guli)',
    vernacularNames: {
      as: 'চেলা-বাটা (Chela-Bata)',
      bn: 'ডাঙ্গুলি (Danguli)',
      hi: 'गिल्ली डंडा',
      bodo: 'दां-गुलि'
    },
    region: 'Pan-Northeast & Assam Riverbanks',
    tagline: 'The timeless ancestor of cricket and baseball carved from seasoned bamboo sticks.',
    story: 'Played during harvesting breaks on vast paddy fields, players use a long bamboo stick (Danda) to flick a tapered short peg (Gilli) airborne, then strike it as far as possible before opponents catch it.',
    historicalEra: 'Over 2,500 Years Ancient Heritage',
    playersCount: '2 or more individual players or 2 teams',
    difficultyLevel: 3,
    equipmentNeeded: ['1 long bamboo striking stick (Danda ~ 2ft)', '1 small tapered bamboo spindle (Gilli ~ 4 inches)', 'Small dugout pivot hole (Gaddi)'],
    playingArea: 'Open grass field or harvested paddy field',
    howToPlay: [
      'Place the gilli across a small shallow ground pivot hole.',
      'Insert the tip of the danda under the gilli and flip it into the air.',
      'While in mid-air, hit the gilli forcefully with the danda towards the outfield.',
      'If an opponent catches the gilli in mid-air, the striker is out.',
      'If not caught, the striker measures the distance using danda lengths to accumulate points.'
    ],
    rules: [
      'Three failed flick attempts result in an out.',
      'Fielders must stay beyond the 10-meter striking perimeter.',
      'Outfield measurements must follow a continuous straight line.'
    ],
    skillsDeveloped: ['Hand-Eye Coordination', 'Timing & Strike Velocity', 'Outfield Reflexes'],
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 18,
    featured: true
  },
  {
    id: 'dhop-khel-rubber-ball',
    name: 'Dhop Khel (Indigenous Tag Dodgeball)',
    vernacularNames: {
      as: 'ঢোপ খেল (Dhop Khel)',
      hi: 'धोप खेल',
      bodo: 'धप गेलेमु'
    },
    region: 'Assam & Bodo Territorial Region',
    tagline: 'The royal Bihu field sport of dodging, sprint-tagging, and rubber ball volleys.',
    story: 'Historically patronized by Ahom monarchs during Rongali Bihu celebrations in the open amphitheater of Rang Ghar. Two teams throw a woven dhop (cloth or rubber ball) across opposing courts, sending a sprinter (Katia) to tag opponents before dodging back safely.',
    historicalEra: '17th Century Royal Ahom Court',
    playersCount: '2 Teams of 11 players each',
    difficultyLevel: 4,
    equipmentNeeded: ['1 traditional woven cloth/rubber Dhop ball', 'Rectangular field (125m x 80m) marked with central border line'],
    playingArea: 'Large outdoor grass sports pitch',
    howToPlay: [
      'Teams take positions on either side of the center line.',
      'A player throws the dhop into the opponent court.',
      'If caught, a designated Katia enters opponent territory holding their breath or racing to tag defenders.',
      'Defenders attempt to dodge the Katia without stepping out of bounds.',
      'Tagged players must leave the field; surviving teams score points based on successful returns.'
    ],
    rules: [
      'Katia must not step over boundary lines while chasing.',
      'Defenders cannot physically restrain the Katia, only evade.',
      'Ball throws must clear the center line without touching ground.'
    ],
    skillsDeveloped: ['High-Intensity Cardiovascular Stamina', 'Agile Footwork', 'Breath Control & Focus'],
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 6,
    featured: false
  },
  {
    id: 'koni-juj-egg-clash',
    name: 'Koni Juj (Bihu Spring Egg Clash)',
    vernacularNames: {
      as: 'কণী যুঁজ (Koni Juj)',
      hi: 'अंडा युद्ध',
      bodo: 'दै गेलेमु'
    },
    region: 'Assam Brahmaputra Valley',
    tagline: 'Springtime Bihu duel of hard-boiled duck eggs, shell acoustics, and festive pride.',
    story: 'Held during Goru Bihu and Rongali Bihu dawn gatherings. Villagers carefully select free-range duck and hen eggs, tapping the tips against their front teeth to test shell density before competing in pairwise egg-striking duels.',
    historicalEra: 'Ancient Agrarian Bihu Festival',
    playersCount: '2 Players (Tournament Ladder)',
    difficultyLevel: 2,
    equipmentNeeded: ['Hard-boiled indigenous duck or country hen eggs'],
    playingArea: 'Village courtyard, tea stall benches, or community fields',
    howToPlay: [
      'Both players hold their boiled egg firmly, exposing only the pointed tip (koni-muri).',
      'One player holds their egg stationary while the opponent delivers a single direct strike tip-to-tip.',
      'The player whose eggshell fractures loses their egg to the victor.',
      'The winner advances to challenge others until only the undefeated champion egg remains.'
    ],
    rules: [
      'Only natural eggs allowed (no wax, plaster, or synthetic hardening).',
      'Strikes must be direct tip-to-tip; glancing hits are void.',
      'Loser must hand over the broken egg to the winner.'
    ],
    skillsDeveloped: ['Material Acoustic Testing', 'Precision Grip', 'Community Camaraderie'],
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 22,
    featured: false
  },
  {
    id: 'tang-guti-stick-strike',
    name: 'Tang Guti (Seven-Hole Pebble Jump)',
    vernacularNames: {
      as: 'টাং গুটি (Tang Guti)',
      hi: 'तांग गोटी',
      bodo: 'थां गुटि'
    },
    region: 'Lower Assam & Meghalaya Border',
    tagline: 'A rhythm of tossed bamboo pegs, rapid finger scooping, and courtyard arithmetic.',
    story: 'Played under the cool shade of courtyard mango trees, children toss bamboo tokens into consecutive circular pits dug into earth, retrieving them without touching pit edges.',
    historicalEra: 'Pre-colonial Village Play',
    playersCount: '2 to 4 Players',
    difficultyLevel: 2,
    equipmentNeeded: ['7 small excavated earth pits', '14 smooth river stones or polished bamboo cylinders'],
    playingArea: 'Firm flat courtyard soil',
    howToPlay: [
      'Excavate 7 small shallow pits in a straight row.',
      'Toss tokens rhythmically from the starting crease into target pits.',
      'Hop on one foot through the track to retrieve tokens in designated combinations.'
    ],
    rules: [
      'Stepping on pit boundaries forfeits the turn.',
      'Must maintain balance on single foot while retrieving.'
    ],
    skillsDeveloped: ['Balance & Proprioception', 'Fine Motor Dexterity', 'Tactical Counting'],
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 11,
    featured: false
  }
];

export const INITIAL_CRAFTS: TraditionalCraft[] = [
  {
    id: 'craft-assamese-japi',
    name: 'Assamese Ceremonial Japi (Conical Sun Hat)',
    indigenousName: 'অসমীয়া জাপি (Japi)',
    category: 'Bamboo & Cane',
    region: 'Nalbari & Majuli',
    state: 'Assam',
    culturalSignificance: 'A symbol of respect, cultural honor, and rural dignity, the Japi is woven from tightly layered Tokou paat (palm leaves) and seasoned bamboo strips, adorned with red and green felt motifs.',
    materialsUsed: ['Tokou palm leaves', 'Fine bamboo splints (Bhaluka Bah)', 'Natural dyes', 'Velvet border fabric'],
    traditionalCraftingMethod: [
      'Split bamboo poles into paper-thin flexible ribs.',
      'Weave an inner and outer conical frame.',
      'Sandwich water-resistant dried Tokou leaves between the frames.',
      'Stitch borders with red yarn and apply hand-cut geometric felt flowers.'
    ],
    preservationStatus: 'Thriving',
    imageUrl: 'https://images.unsplash.com/photo-1605883746291-0a852ff8f0ed?auto=format&fit=crop&w=1200&q=80',
    artisanCountInRegion: 450,
    marketplaceListingIds: ['prod-japi-ceremonial-medium', 'prod-japi-souvenir-small'],
    featured: true
  },
  {
    id: 'craft-jakoi-khaloi',
    name: 'Jakoi & Khaloi (Bamboo Wetland Fishing Gears)',
    indigenousName: 'জাকৈ আৰু খালৈ (Jakoi & Khaloi)',
    category: 'Household Tools',
    region: 'Brahmaputra Floodplains',
    state: 'Assam & Meghalaya',
    culturalSignificance: 'Triangular scoop traps (Jakoi) and hourglass-shaped waist baskets (Khaloi) have sustained indigenous fishing communities for millennia without harming aquatic ecosystems.',
    materialsUsed: ['Mature Jati Bamboo splints', 'Cane binding cordage (Bet)'],
    traditionalCraftingMethod: [
      'Soak mature bamboo in river mud for 3 weeks to prevent insect damage.',
      'Shave splints with a traditional dao (machete).',
      'Weave fine hexagonal mesh to let water escape while retaining small river fish.'
    ],
    preservationStatus: 'Revived',
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80',
    artisanCountInRegion: 320,
    marketplaceListingIds: ['prod-jakoi-eco-basket'],
    featured: true
  },
  {
    id: 'craft-longpi-black-pottery',
    name: 'Longpi Hampai (Black Stone Pottery)',
    indigenousName: 'Longpi Hampai',
    category: 'Pottery & Clay',
    region: 'Ukhrul District',
    state: 'Manipur',
    culturalSignificance: 'Crafted without a pottery wheel by the Tangkhul Naga tribe using crushed serpentine rock and weathered clay, polished with specialized wild Machi leaves for a lustrous metallic black finish.',
    materialsUsed: ['Black Serpentine stone powder', 'Weathered brown river clay', 'Machi wild leaf extract', 'Cane wrapping on handles'],
    traditionalCraftingMethod: [
      'Pound serpentine rock and mix 50:50 with clay and water.',
      'Hand-shape using wooden molds and bamboo spatulas (no wheel).',
      'Open-air kiln firing at 1200°C.',
      'Rub hot vessels immediately with wild leaves to achieve natural non-stick black patina.'
    ],
    preservationStatus: 'Endangered',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    artisanCountInRegion: 85,
    marketplaceListingIds: ['prod-longpi-kettle-tea-set'],
    featured: true
  },
  {
    id: 'craft-muga-eri-silk',
    name: 'Muga & Eri Ahimsa Peace Silk',
    indigenousName: 'মুগা আৰু এৰী কাপোৰ (Muga & Eri)',
    category: 'Handloom & Weaving',
    region: 'Sualkuchi (Manchester of Assam)',
    state: 'Assam',
    culturalSignificance: 'Golden Muga silk is endemic only to Assam and shines brighter with each wash. Eri silk is produced without killing the silkworm, revered for its warm thermal comfort.',
    materialsUsed: ['Antheraea assamensis natural golden silk', 'Samia ricini open-cocoon eri yarn', 'Natural madder & indigo dyes'],
    traditionalCraftingMethod: [
      'Reel golden filaments from wild fed cocoons on traditional bhir reels.',
      'Hand-spin Eri yarn with takli drop spindles.',
      'Weave on traditional throw-shuttle floor looms with Kingkhap and floral jaal motifs.'
    ],
    preservationStatus: 'Thriving',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
    artisanCountInRegion: 1200,
    marketplaceListingIds: ['prod-muga-stole-handwoven'],
    featured: true
  }
];

export const INITIAL_PRODUCTS: ArtisanProduct[] = [
  {
    id: 'prod-japi-ceremonial-medium',
    title: 'Authentic Handwoven Tokou Ceremonial Japi',
    craftId: 'craft-assamese-japi',
    craftName: 'Assamese Japi',
    artisanId: 'artisan-rupam-das',
    artisanName: 'Rupam Das & Family',
    artisanLocation: 'Nalbari, Assam',
    artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    priceInr: 1250,
    stockAvailable: 24,
    description: 'Masterfully woven ceremonial Japi featuring pristine dried Tokou leaves, seasoned bhaluka bamboo skeleton, and hand-embroidered velvet rosette center.',
    dimensions: '18 inches diameter x 8 inches cone height',
    materialDetails: '100% Bio-degradable Assam Bamboo, Palm Leaf, Red Wool Twine',
    estimatedCraftingDays: 4,
    supportsBulkOrders: true,
    minBulkQuantity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1605883746291-0a852ff8f0ed?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    commissionRate: 5,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'prod-longpi-kettle-tea-set',
    title: 'Longpi Black Serpentine Clay Teapot with Cane Handle',
    craftId: 'craft-longpi-black-pottery',
    craftName: 'Longpi Black Stone Pottery',
    artisanId: 'artisan-chanre-tangkhul',
    artisanName: 'Chanre Tangkhul',
    artisanLocation: 'Ukhrul, Manipur',
    artisanAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    priceInr: 2850,
    stockAvailable: 8,
    description: 'Hand-molded without a wheel using ancient Naga mountain rock powder. Naturally non-toxic and retains heat for over an hour. Bound with fine cane insulation.',
    dimensions: '850ml capacity, 18cm x 14cm',
    materialDetails: 'Serpentine Rock Powder, Clay, Wild Machi Leaf Finish, Natural Cane',
    estimatedCraftingDays: 7,
    supportsBulkOrders: true,
    minBulkQuantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    commissionRate: 5,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'prod-jakoi-eco-basket',
    title: 'Heritage Jakoi River Fishing Scoop & Planter',
    craftId: 'craft-jakoi-khaloi',
    craftName: 'Jakoi & Khaloi',
    artisanId: 'artisan-biren-borah',
    artisanName: 'Biren Borah Guild',
    artisanLocation: 'Majuli Island, Assam',
    artisanAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    priceInr: 850,
    stockAvailable: 15,
    description: 'Traditional river wetland scoop crafted with micro-split cane weave. Perfect as an authentic cultural tool or organic living room hanging planter.',
    dimensions: '22 inches length x 14 inches width',
    materialDetails: 'Seasoned Jati Bamboo, Wild River Cane Binding',
    estimatedCraftingDays: 3,
    supportsBulkOrders: true,
    minBulkQuantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    commissionRate: 5,
    rating: 4.8,
    reviewsCount: 12
  }
];

export const INITIAL_FOOD_STORIES: FoodStory[] = [
  {
    id: 'food-assamese-khar',
    name: 'Omita Khar (Alkaline Green Papaya Ancestral Stew)',
    indigenousName: 'অমিতাৰ খাৰ (Omita Khar)',
    region: 'Brahmaputra Valley',
    state: 'Assam',
    story: 'Khar is the undisputed signature of an authentic Assamese meal, traditionally served first with warm rice and a drizzle of raw mustard oil. Prepared using filtered water poured through the sun-dried ashes of charred wild banana peels (Bhimkol Kola-Khar), it imparts a deep alkaline flavor that cleanses the digestive palate.',
    culturalOccasions: ['Traditional Assamese Thali', 'Bihu Lunch Gatherings', 'Daily Midday Sustenance'],
    flavorProfile: ['Alkaline', 'Earthly Mineral', 'Astringent Piquant', 'Aromatic Mustard Finish'],
    ingredients: [
      { name: 'Raw green papaya (diced)', quantity: '350g' },
      { name: 'Bhimkol banana ash extract (Khar water)', quantity: '2 tablespoons' },
      { name: 'Panch Phoron (Assamese five spice)', quantity: '1/2 teaspoon' },
      { name: 'Pure cold-pressed mustard oil', quantity: '1.5 tablespoons' },
      { name: 'Green chillies (slit)', quantity: '2 pieces' },
      { name: 'Ginger paste', quantity: '1 teaspoon' },
      { name: 'Salt', quantity: 'to taste (keep light with khar)' }
    ],
    preparationSteps: [
      'Heat virgin mustard oil in an iron skillet until fragrant.',
      'Temper with panch phoron and slit green chillies until they splutter.',
      'Add diced raw green papaya and sauté with ginger paste on medium heat for 4 minutes.',
      'Pour in the pure Bhimkol Khar water along with half a cup of warm water.',
      'Cover and simmer gently for 12 minutes until papaya turns melt-in-mouth tender.',
      'Serve steaming hot with fragrant Joha rice.'
    ],
    healthAndWisdom: 'Traditional Kola-Khar serves as an alkaline digestive balancer, neutralizing acids from heavy seasonal diets.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'food-naga-smoked-pork-bamboo',
    name: 'Smoked Pork with Fermented Bamboo Shoot (Axone / Khorisa)',
    indigenousName: 'Nagaland Smoked Heritage Stew',
    region: 'Naga Hills',
    state: 'Nagaland',
    story: 'In Naga kitchens, meat is smoked gently for weeks above family woodfire hearths (Mezhu), absorbing the rich aroma of oak and pine. Stewed with tangy fermented bamboo shoots (Bas-tenga) and fiery Raja Mircha (Ghost Pepper), this dish is a warm testament to high-altitude mountain living.',
    culturalOccasions: ['Hornbill Festival', 'Sekrenyi Celebrations', 'Winter Hearth Evenings'],
    flavorProfile: ['Smoky Wood Aroma', 'Pungent Fermented Zing', 'Fiery Ghost Pepper Heat', 'Umami Richness'],
    ingredients: [
      { name: 'Traditional Wood-Smoked Pork chunks', quantity: '500g' },
      { name: 'Fermented Bamboo Shoots (wet preserved)', quantity: '100g' },
      { name: 'Bhut Jolokia (Ghost Pepper)', quantity: '1 small piece (adjust carefully)' },
      { name: 'Fresh Ginger and Garlic paste', quantity: '2 tablespoons' },
      { name: 'Naga Wild Coriander (Phak-pai)', quantity: '1 handful' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    preparationSteps: [
      'Wash the smoked pork in warm water to clean surface soot, cutting into thick bite-sized cubes.',
      'In a heavy-bottom pot, cook pork in its own rendered fat with crushed ginger-garlic.',
      'Add fermented bamboo shoots and half cup of warm water, allowing the sour aroma to permeate the pork.',
      'Puncture the ghost pepper lightly and simmer covered for 30 minutes on low embers.',
      'Garnish with torn wild coriander leaves and serve alongside warm sticky rice.'
    ],
    healthAndWisdom: 'Fermented bamboo shoots provide abundant gut-friendly probiotics, perfectly balancing rich smoked meats in cold highland winters.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'food-assam-masor-tenga',
    name: 'Masor Tenga (Tangy River Fish Broth with Elephant Apple / Thekera)',
    indigenousName: 'মাছৰ টেঙা (Masor Tenga)',
    region: 'Majuli & Brahmaputra Catchment',
    state: 'Assam',
    story: 'The quintessential summer soul food of Assam. Fresh Brahmaputra sweetwater fish like Rohu or Borali is gently stewed in a light, cooling broth soured with sun-dried Thekera fruit (Garcinia pedunculata), Elephant Apple (Ou Tenga), or ripe country tomatoes.',
    culturalOccasions: ['Summer Midday Feasts', 'Post-Harvest Gatherings', 'Family Sunday Lunches'],
    flavorProfile: ['Tangy', 'Light & Refreshing', 'Herbal', 'Clean River Sweetness'],
    ingredients: [
      { name: 'Fresh Rohu / Catla river fish steaks', quantity: '4 pieces' },
      { name: 'Thekera slices (soaked in warm water) or Diced Ou Tenga', quantity: '3 pieces' },
      { name: 'Fenugreek (Methi) seeds', quantity: '1/2 teaspoon' },
      { name: 'Mustard oil', quantity: '2 tablespoons' },
      { name: 'Turmeric and salt', quantity: '1 teaspoon each' },
      { name: 'Fresh Coriander (Manimuni / cilantro)', quantity: '1/2 cup chopped' }
    ],
    preparationSteps: [
      'Marinate fish with turmeric and salt; lightly shallow fry in mustard oil for 2 minutes per side.',
      'In the remaining oil, add fenugreek seeds until they crackle (do not burn).',
      'Pour the soaked Thekera sour water and bring to a gentle simmer.',
      'Add the fried fish pieces, green chillies, and simmer for 6 minutes.',
      'Finish with abundant fresh greens and serve lukewarm over Joha rice.'
    ],
    healthAndWisdom: 'Thekera fruit is known in Ayurvedic medicine as a natural cardio-protective antioxidant and coolant during hot monsoon days.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    featured: true
  }
];

export const INITIAL_NOSTALGIC_BUILDS: NostalgicBuild[] = [
  {
    id: 'build-bottle-cap-spinner',
    title: 'Flattened Bottle-Cap Humming Spinner (Chor-Chori)',
    subhead: 'A roaring pocket gyroscope crafted from discarded metal soda caps and jute thread.',
    materials: ['1 discarded metal crown bottle cap', '1 meter sturdy cotton or jute thread', '1 small hammer or smooth heavy river stone', '1 nail for punching holes'],
    toolsNeeded: ['Hammer / Stone', 'Nail'],
    estimatedTime: '10 Minutes',
    difficulty: 'Easy',
    steps: [
      'Place the metal bottle cap flat on hard ground and tap firmly with a hammer until completely flattened like a circular coin.',
      'Using a nail and hammer, punch two small symmetrical holes approximately 5mm apart right through the center of the cap.',
      'Thread a 90cm string through one hole and loop it back through the second hole.',
      'Tie the two loose ends of string in a secure double knot.',
      'Hold the string loops with both hands, wind the cap by twirling in circular motions, then rhythmically pull your hands apart and relax—the cap will spin and hum with a high-pitched buzzing roar!'
    ],
    nostalgiaStory: 'Before fidget spinners existed, children across every Northeast village competed to see whose bottle-cap spinner produced the loudest mechanical buzz and cut through stray paper strips.',
    skillsLearned: ['Centrifugal Dynamics', 'Tension Resonance', 'Recycling Creativity'],
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'build-bamboo-slingshot',
    title: 'Y-Branch Bamboo Guleti (Slingshot)',
    subhead: 'A precision balance catapult carved from natural fork branches and inner tyre tubes.',
    materials: ['1 naturally forked hardwood or bamboo Y-branch', '2 strips of discarded bicycle tyre rubber tube (25cm each)', '1 small square leather or denim pouch', 'Twine for binding'],
    toolsNeeded: ['Pocket knife or craft cutter', 'Sandpaper'],
    estimatedTime: '25 Minutes',
    difficulty: 'Medium',
    steps: [
      'Find a sturdy symmetrical Y-shaped branch with a 60-degree spread.',
      'Peel the bark and smooth the grip using sandpaper.',
      'Carve two small notch grooves near the tips of each fork arm.',
      'Cut 2 identical elastic strips from an old bicycle inner tube.',
      'Tie the elastic firmly to the fork notches and attach the leather pouch at the opposite ends using tightly wound twine.',
      'Practice target shooting at empty tin cans using mud pellets (never aim at birds or people).'
    ],
    nostalgiaStory: 'Every countryside group had its master slingshot craftsman who spent days hunting for the perfectly balanced natural tree fork.',
    skillsLearned: ['Elastic Potential Energy', 'Woodcarving', 'Target Trajectory'],
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'build-banana-leaf-horn',
    title: 'Spiral Banana Leaf Horn (Pip-Pipi / Pepa Toy)',
    subhead: 'A trumpet of the monsoons wound from fresh banana shoots and palm reeds.',
    materials: ['1 tender fresh banana leaf stalk', '1 thin strip of bamboo skin or needle'],
    toolsNeeded: ['Scissors or hands'],
    estimatedTime: '5 Minutes',
    difficulty: 'Easy',
    steps: [
      'Tear a long 2-inch wide continuous ribbon along the length of a fresh green banana leaf.',
      'Roll the tip into a tight conical mouthpiece with a tiny vibration slit.',
      'Continue winding the ribbon spirally outward to create an expanding megaphone cone.',
      'Pin the outer end with a tiny bamboo sliver to lock the spiral in place.',
      'Blow firmly through the narrow tip to create a cheerful celebratory trumpet sound!'
    ],
    nostalgiaStory: 'During Bihu and harvest fairs, countryside paths echoed with the joyful drone of hundreds of handmade leaf trumpets made on the spot.',
    skillsLearned: ['Acoustic Wind Vibrations', 'Natural Origami', 'Resourcefulness'],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_CONTACTS: UserContact[] = [
  {
    id: 'cont-1',
    name: 'Diganta Hazarika (Uncle & Guardian)',
    phone: '+91 98640 11234',
    email: 'diganta@family.org',
    relationship: 'Parent/Guardian',
    isVerified: true,
    safetyTier: 'family',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    addedAt: 'Verified 2 weeks ago'
  },
  {
    id: 'cont-2',
    name: 'Bikramjit Bora (Neighborhood Classmate)',
    phone: '+91 94350 78901',
    email: 'bikram@cotton.edu.in',
    relationship: 'Schoolmate',
    isVerified: true,
    safetyTier: 'verified_peer',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    addedAt: 'Verified 1 month ago'
  },
  {
    id: 'cont-3',
    name: 'Ananya Saikia (Heritage Club Member)',
    phone: '+91 98540 65432',
    email: 'ananya@heritage.in',
    relationship: 'Family Friend',
    isVerified: true,
    safetyTier: 'trusted',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    addedAt: 'Verified 3 days ago'
  },
  {
    id: 'cont-4',
    name: 'Rupjyoti Medhi (Cousin)',
    phone: '+91 98642 99887',
    email: 'rupjyoti@medhi.org',
    relationship: 'Cousin',
    isVerified: true,
    safetyTier: 'family',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    addedAt: 'Verified 2 months ago'
  }
];

export const INITIAL_SESSIONS: GameSession[] = [
  {
    id: 'session-guwahati-pittu',
    gameId: 'pittu-seven-stones',
    gameTitle: 'Pittu (Seven Stones) - Neighborhood Safe Meet',
    hostId: 'user-arunav-barua',
    hostName: 'Arunav Barua',
    hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    date: 'Tomorrow, 4:30 PM',
    time: '4:30 PM - 6:00 PM',
    locality: 'Dighalipukhuri Park Courtyard',
    state: 'Guwahati, Assam',
    privacyMode: 'approximate',
    joinMode: 'contacts_only',
    minAgeRequired: 0,
    childSafe: true,
    maxPlayers: 10,
    currentPlayers: 4,
    participants: [
      { id: 'user-arunav-barua', name: 'Arunav Barua', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', team: 'A', isContact: true },
      { id: 'cont-1', name: 'Diganta Hazarika', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', team: 'A', isContact: true },
      { id: 'cont-2', name: 'Bikramjit Bora', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80', team: 'B', isContact: true },
      { id: 'cont-3', name: 'Ananya Saikia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', team: 'B', isContact: true }
    ],
    notes: 'Bringing seven flat river stones and a soft rubber ball. Family & verified contacts only.',
    status: 'open',
    messages: [
      { id: 'm1', senderId: 'user-arunav-barua', senderName: 'Arunav', text: 'Hey everyone! Setting up the boundaries near the north banyan tree at 4:15 PM.', timestamp: '2 hours ago' },
      { id: 'm2', senderId: 'cont-2', senderName: 'Bikramjit', text: 'Awesome, bringing water bottles for Team A!', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'session-shillong-sholo-guti',
    gameId: 'shollo-ana-sixteen-soldiers',
    gameTitle: 'Shollo Ana Open Tournament (18+ Age Verified)',
    hostId: 'user-ban-khongwir',
    hostName: 'Ban Khongwir',
    hostAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    date: 'Saturday, 3:00 PM',
    time: '3:00 PM - 5:30 PM',
    locality: 'Ward’s Lake Wooden Gazebo',
    state: 'Shillong, Meghalaya',
    privacyMode: 'approximate',
    joinMode: 'open_strangers',
    minAgeRequired: 18,
    childSafe: false,
    maxPlayers: 6,
    currentPlayers: 2,
    participants: [
      { id: 'user-ban-khongwir', name: 'Ban Khongwir', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80', isContact: false },
      { id: 'user-samar-paul', name: 'Samar Paul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', isContact: false }
    ],
    notes: 'Friendly open tactical tournament on hand-painted pine boards. Open to age-verified adults.',
    status: 'open',
    messages: [
      { id: 'm3', senderId: 'user-ban-khongwir', senderName: 'Ban', text: 'Board is freshly waxed. Ready for good tactics.', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'session-gilli-danda-cotton',
    gameId: 'gilli-danda-chela-bata',
    gameTitle: 'Gilli Danda Weekend Revival - Saved Contacts Only',
    hostId: 'user-deb-choudhury',
    hostName: 'Deb Choudhury',
    hostAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    date: 'Sunday, 7:30 AM',
    time: '7:30 AM - 9:30 AM',
    locality: 'Judges Field, Panbazar',
    state: 'Guwahati, Assam',
    privacyMode: 'precise',
    joinMode: 'contacts_only',
    minAgeRequired: 0,
    childSafe: true,
    maxPlayers: 12,
    currentPlayers: 3,
    participants: [
      { id: 'user-deb-choudhury', name: 'Deb Choudhury', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', isContact: true }
    ],
    notes: 'Morning fresh air match for kids, teens & family friends. Parent supervision available.',
    status: 'open',
    messages: []
  }
];

export const INITIAL_ACTIVE_SESSIONS: ActiveUserSession[] = [
  {
    id: 'sess-1',
    userId: 'user-arunav-barua',
    userName: 'Arunav Barua',
    userEmail: 'arunav.barua@nostalgichub.org',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'user',
    ipAddress: '103.28.12.84',
    deviceInfo: 'Chrome 128 / Windows 11',
    location: 'Guwahati, Assam',
    loginAt: '35 minutes ago',
    lastActiveAt: 'Active Just now',
    isOnline: true,
    ageVerified: true,
    childSafetyMode: false
  },
  {
    id: 'sess-2',
    userId: 'user-priya-sharma',
    userName: 'Priya Sharma (Minor Explorer)',
    userEmail: 'priya.sharma@safekids.in',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'user',
    ipAddress: '103.28.14.92',
    deviceInfo: 'Safari 18 / iPadOS',
    location: 'Shillong, Meghalaya',
    loginAt: '1 hour ago',
    lastActiveAt: 'Active 4m ago',
    isOnline: true,
    ageVerified: false,
    childSafetyMode: true
  },
  {
    id: 'sess-3',
    userId: 'user-curator-admin',
    userName: 'Heritage Curator Admin',
    userEmail: 'curator@nostalgichub.org',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    ipAddress: '14.139.222.10',
    deviceInfo: 'Firefox 130 / macOS Sequoia',
    location: 'State Museum, Guwahati',
    loginAt: '2 hours ago',
    lastActiveAt: 'Active Just now',
    isOnline: true,
    ageVerified: true,
    childSafetyMode: false
  },
  {
    id: 'sess-4',
    userId: 'user-bikram-bora',
    userName: 'Bikramjit Bora',
    userEmail: 'bikram@cotton.edu.in',
    userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    role: 'user',
    ipAddress: '103.28.12.89',
    deviceInfo: 'Chrome Mobile / Android 14',
    location: 'Jorhat, Assam',
    loginAt: '12 minutes ago',
    lastActiveAt: 'Active 2m ago',
    isOnline: true,
    ageVerified: false,
    childSafetyMode: true
  }
];

export const INITIAL_SITE_MEDIA: SiteMediaItem[] = [
  {
    id: 'med-game-pittu',
    entityType: 'game',
    entityId: 'pittu-seven-stones',
    title: 'Pittu (Seven Stones) Primary Image',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    altText: 'Seven river stones tower in an open village field',
    placement: 'card_thumbnail',
    updatedAt: 'Today',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-game-sholo',
    entityType: 'game',
    entityId: 'shollo-ana-sixteen-soldiers',
    title: 'Shollo Ana Tactical Board Game',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80',
    altText: 'Traditional wooden board with sixteen stones',
    placement: 'card_thumbnail',
    updatedAt: 'Today',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-game-gilli',
    entityType: 'game',
    entityId: 'gilli-danda-chela-bata',
    title: 'Gilli Danda Flying Spindle',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    altText: 'Bamboo stick striking the flying spindle',
    placement: 'card_thumbnail',
    updatedAt: 'Yesterday',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-craft-japi',
    entityType: 'craft',
    entityId: 'craft-assamese-japi',
    title: 'Assamese Conical Japi Sun Hat',
    imageUrl: 'https://images.unsplash.com/photo-1605883746291-0a852ff8f0ed?auto=format&fit=crop&w=1200&q=80',
    altText: 'Conical bamboo hat with red felt rosette',
    placement: 'card_thumbnail',
    updatedAt: '2 days ago',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-craft-longpi',
    entityType: 'craft',
    entityId: 'craft-longpi-black-pottery',
    title: 'Longpi Black Serpentine Pottery',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    altText: 'Black stone kettle with cane handle',
    placement: 'card_thumbnail',
    updatedAt: '3 days ago',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-food-khar',
    entityType: 'food',
    entityId: 'food-assamese-khar',
    title: 'Assamese Omita Khar Papaya Stew',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    altText: 'Alkaline green papaya broth with mustard oil',
    placement: 'card_thumbnail',
    updatedAt: '1 week ago',
    updatedBy: 'Admin Curator'
  },
  {
    id: 'med-banner-hero',
    entityType: 'banner',
    entityId: 'home-hero-banner',
    title: 'Homepage Living Museum Hero Banner',
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1600&q=80',
    altText: 'Children playing outdoors in Northeast countryside',
    placement: 'hero_banner',
    updatedAt: 'Today',
    updatedBy: 'Admin Curator'
  }
];

export const INITIAL_ARTISAN_WAITLIST: ArtisanWaitlistEntry[] = [
  {
    id: 'wait-1',
    artisanName: 'Biren Borah & Majuli Bamboo Weavers',
    craftCategory: 'Bamboo & Cane Weaving',
    location: 'Kamalabari, Majuli Island, Assam',
    phone: '+91 94351 22334',
    email: 'biren.majuli@craftsguild.in',
    experienceYears: 24,
    message: 'We weave authentic Jakoi, Khaloi, and Majuli festival masks with natural dyes.',
    submittedAt: 'Yesterday',
    status: 'pending'
  },
  {
    id: 'wait-2',
    artisanName: 'Lakhimi Bodo Handloom Collective',
    craftCategory: 'Muga & Eri Ahimsa Silk',
    location: 'Kokrajhar, BTR, Assam',
    phone: '+91 98542 77665',
    email: 'lakhimi.bodo@craftsguild.in',
    experienceYears: 18,
    message: 'Cooperative of 35 women weavers creating Dokhona and Gamosa on traditional floor looms.',
    submittedAt: '3 days ago',
    status: 'invited'
  }
];

export const INITIAL_CHALLENGES: CulturalChallenge[] = [
  {
    id: 'chal-discover-3-games',
    title: 'Roots of Play: Explore 3 Forgotten Games',
    description: 'Read the historical origins and rules for any 3 traditional games in the archive.',
    frequency: 'daily',
    category: 'game',
    xpReward: 150,
    badgeRewardId: 'badge-game-explorer',
    badgeRewardName: 'Game Explorer Badge',
    expiresInDays: 1,
    participantsCount: 342,
    isCompleted: false
  },
  {
    id: 'chal-ai-upcycle-craft',
    title: 'Creative Alchemist: Upcycle with AI',
    description: 'Upload a picture of any discarded household item to the AI Assistant and generate a nostalgic craft blueprint.',
    frequency: 'daily',
    category: 'ai-creation',
    xpReward: 200,
    badgeRewardId: 'badge-creative-mind',
    badgeRewardName: 'Creative Mind Badge',
    expiresInDays: 1,
    participantsCount: 518,
    isCompleted: true
  },
  {
    id: 'chal-support-local-artisan',
    title: 'Artisan Patron: Join the Guild Waitlist',
    description: 'Explore traditional crafts and help verify indigenous craftsmen across the Northeast.',
    frequency: 'weekly',
    category: 'craft',
    xpReward: 350,
    badgeRewardId: 'badge-craft-keeper',
    badgeRewardName: 'Craft Patron Badge',
    expiresInDays: 5,
    participantsCount: 189,
    isCompleted: false
  }
];

export const INITIAL_BADGES: BadgeInfo[] = [
  {
    id: 'badge-first-discovery',
    name: 'First Discovery',
    description: 'Began the journey of rediscovering forgotten Northeast heritage.',
    icon: 'flare',
    category: 'Discovery',
    unlockedAt: 'Unlocked Today'
  },
  {
    id: 'badge-game-explorer',
    name: 'Game Explorer',
    description: 'Mastered the rules and lore of 3+ ancient folk games.',
    icon: 'sports_esports',
    category: 'Games'
  },
  {
    id: 'badge-creative-mind',
    name: 'Creative Alchemist',
    description: 'Used AI multimodal discovery to breathe new life into discarded items.',
    icon: 'psychology',
    category: 'AI Creativity',
    unlockedAt: 'Unlocked'
  },
  {
    id: 'badge-craft-keeper',
    name: 'Craft Keeper',
    description: 'Connected with indigenous bamboo and stone artisans of the Northeast.',
    icon: 'handyman',
    category: 'Crafts'
  },
  {
    id: 'badge-food-historian',
    name: 'Culinary Archivist',
    description: 'Documented or cooked a traditional ancestral fermented recipe.',
    icon: 'restaurant',
    category: 'Food'
  },
  {
    id: 'badge-community-pillar',
    name: 'Community Matchmaker',
    description: 'Hosted or joined a physical neighborhood game revival session.',
    icon: 'diversity_3',
    category: 'Community'
  }
];

export const INITIAL_COMMUNITY_SUBMISSIONS: CommunityPreserveItem[] = [
  {
    id: 'pres-1',
    type: 'game',
    title: 'Insuknawti (Mizo Rod Pushing Contest)',
    region: 'Aizawl, Mizoram',
    description: 'An ancient strength trial where two athletes hold a seasoned wooden pole under their arms and attempt to push each other out of a circular chalk ring.',
    submittedBy: 'Lalrinsanga Ralte',
    submittedAt: '3 days ago',
    status: 'approved',
    upvotes: 42
  },
  {
    id: 'pres-2',
    type: 'food',
    title: 'Panch Phoron Smoked Fish Pitika in Banana Leaf',
    region: 'Barpeta, Assam',
    description: 'River fish mashed with roasted garlic, charred onions, mustard oil, and sealed in banana leaves on hot charcoal embers.',
    submittedBy: 'Manashjyoti Das',
    submittedAt: '1 day ago',
    status: 'under-review',
    upvotes: 18
  },
  {
    id: 'pres-3',
    type: 'craft',
    title: 'Karbi Jam Dhor (Beaded Bamboo Hairpin)',
    region: 'Diphu, Karbi Anglong',
    description: 'Delicately polished bamboo pins adorned with hand-strung glass seed beads representing tribal clan lineages.',
    submittedBy: 'Kareng Rongpipi',
    submittedAt: '5 hours ago',
    status: 'pending',
    upvotes: 7
  }
];

export const INITIAL_ANALYTICS: AdminAnalytics = {
  registeredUsersCount: 1420,
  activePlayersToday: 186,
  activeGameSessions: 24,
  verifiedArtisansCount: 42,
  pendingApprovalsCount: 5,
  totalMarketplaceInquiries: 89,
  aiCreationsGenerated: 640,
  preservedCulturalItemsCount: 54,
  currentCommissionPercentage: 5,
  childSafetyEnforced: true,
  ageVerifiedUsersCount: 980
};
