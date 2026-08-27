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
  AdminAnalytics
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
    playersCount: '2 to 12 Players (Individual or Teams)',
    difficultyLevel: 4,
    equipmentNeeded: ['1 long bamboo bat (~2 feet long)', '1 small tapered wooden gilli (~4 inches long)', 'Shallow pit (Gart) in soil'],
    playingArea: 'Open field or harvested paddy ground',
    howToPlay: [
      'Rest the gilli over a small oval pit in the dirt.',
      'Insert the tip of the danda underneath and flick the gilli high into the air.',
      'Before it hits the ground, strike it with full force forward.',
      'If an outfielder catches it mid-air, the striker is out.',
      'If not caught, the striker measures the distance from the pit using the length of the danda to accumulate score points.'
    ],
    rules: [
      'Striker has 3 attempts to flick the gilli successfully.',
      'Fielder can throw the gilli back to hit the danda resting across the pit for an instant out.',
      'Spectators must stand at a safe distance from the flight arc.'
    ],
    skillsDeveloped: ['Hand-Eye Coordination', 'Timing & Reflexes', 'Batting Mechanics', 'Distance Estimation'],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80',
    relatedMarketplaceItemIds: ['prod-handcarved-bamboo-gilli-set'],
    activePlayersNearbyCount: 11,
    featured: true
  },
  {
    id: 'kith-kith-hopscotch',
    name: 'Kith-Kith (Kokla Chapaki / Ekka-Dukka)',
    vernacularNames: {
      as: 'ককলা চাপাকি (Kokla Chapaki)',
      bn: 'এক্কা-দোক্কা (Ekka Dokka)',
      hi: 'कित-कित / स्टापू',
      bodo: 'थापला गेलेमु'
    },
    region: 'Northeast Village Verandas & Courtyards',
    tagline: 'Hop through chalked celestial grids on one foot while nudging a flat clay token.',
    story: 'A beloved game of balance and precision played across verandas on monsoon mornings. Players toss a terracotta shard (Chara) into numbered squares and hop through the court without touching the boundary lines.',
    historicalEra: 'Classical Folk Game',
    playersCount: '2 to 6 Players',
    difficultyLevel: 2,
    equipmentNeeded: ['Flat clay piece or smooth stone shard', 'Chalk or charcoal to draw the 8-block grid'],
    playingArea: 'Flat smooth courtyard or pavement (4m x 2m)',
    howToPlay: [
      'Toss your token into Square 1.',
      'Hop on one leg into each successive box skipping Square 1.',
      'At double boxes (4-5 and 7-8), land with both feet simultaneously.',
      'Turn around at the apex, hop back, retrieve your token while balancing on one foot, and hop out.',
      'Advance token to the next numbered block in successive rounds.'
    ],
    rules: [
      'Token must land entirely within the target box without touching chalk borders.',
      'Stepping on lines or losing single-leg balance ends the turn immediately.',
      'First to complete all 8 houses and claim a "rest home" wins.'
    ],
    skillsDeveloped: ['Physical Balance & Core Strength', 'Precision Tossing', 'Rhythm & Concentration'],
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 7
  },
  {
    id: 'marbles-goti-kancha',
    name: 'Goti / Kancha (Glass Marble Duels)',
    vernacularNames: {
      as: 'গুটিকা / মাৰ্বল (Guti / Marble)',
      bn: 'গুলি / মার্বেল (Guli)',
      hi: 'कंचे / गोली',
      bodo: 'मार्बल गेलेमु'
    },
    region: 'Pan-Northeast Villages & Streets',
    tagline: 'Flick iridescent glass spheres into shallow soil holes and knock away rivals.',
    story: 'From dusty village squares to shady banyan tree roots, marble duels brought children together with specialized finger-flicking techniques like the index pull and thumb spring. Players wagered colorful swirls and cat-eye marbles.',
    historicalEra: 'Folk Century Heritage',
    playersCount: '2 to 8 Players',
    difficultyLevel: 3,
    equipmentNeeded: ['Set of glass marbles (Kanchas / Gutis)', 'A 2-inch shallow hole dug in smooth dirt'],
    playingArea: 'Dry soil or sand clearing',
    howToPlay: [
      'Toss a marble towards the target hole from the starting line.',
      'The closest player to the hole shoots first.',
      'Tuck the marble into the left index finger and pull back with right finger to catapult it.',
      'Sink your marble into the hole, then strike opponents marbles to capture them.'
    ],
    rules: [
      'No advancing past the shooting anchor point ("Angutha tekna").',
      'Direct hits reward an extra turn and score tokens.'
    ],
    skillsDeveloped: ['Micro-Motor Precision', 'Trajectory Calculation', 'Focus under Pressure'],
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80',
    activePlayersNearbyCount: 16
  }
];

export const INITIAL_CRAFTS: TraditionalCraft[] = [
  {
    id: 'craft-assamese-japi',
    name: 'Assamese Japi (Conical Bamboo Hat)',
    indigenousName: 'জাপি (Jaapi)',
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
  },
  {
    id: 'prod-muga-stole-handwoven',
    title: 'Pure Golden Muga Silk Stole with Traditional Mina Weave',
    craftId: 'craft-muga-eri-silk',
    craftName: 'Muga & Eri Ahimsa Peace Silk',
    artisanId: 'artisan-anita-kalita',
    artisanName: 'Anita Kalita Weavers',
    artisanLocation: 'Sualkuchi, Assam',
    artisanAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    priceInr: 4900,
    stockAvailable: 6,
    description: 'Naturally shimmering golden Muga silk stole. Soft, resilient, and dyed with indigenous herbal extracts. Contains GI-tagged authenticity weave.',
    dimensions: '2m length x 0.7m width',
    materialDetails: '100% Certified Assam Muga Golden Raw Silk',
    estimatedCraftingDays: 12,
    supportsBulkOrders: false,
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    commissionRate: 5,
    rating: 4.9,
    reviewsCount: 27
  }
];

export const INITIAL_FOOD_STORIES: FoodStory[] = [
  {
    id: 'food-assamese-khar',
    name: 'Khar (Alkaline Sun-Dried Banana Ash Broth)',
    indigenousName: 'অমিতাৰ খাৰ (Omita Khar)',
    region: 'Brahmaputra Valley',
    state: 'Assam',
    story: 'Khar is the undisputed soul of Assamese gastronomy—so vital that Assamese people affectionately call themselves "Kharkhowa" (Khar eaters). The dish uses natural liquid alkaline salt filtered through the sun-dried, burned ashes of Bhimkol banana peels. It cleanses the palate and prepares the stomach for digestion.',
    culturalOccasions: ['Every Traditional Assamese Lunch Starter', 'Rongali Bihu Feasts', 'Post-Harvest Family Gatherings'],
    flavorProfile: ['Earthy', 'Subtly Alkaline', 'Gentle Pungency of Mustard Oil', 'Aromatic Raw Papaya'],
    ingredients: [
      { name: 'Kola Khar (Banana Peel Ash Alkaline Extract)', quantity: '3 tablespoons' },
      { name: 'Green Raw Papaya (peeled and diced)', quantity: '1 medium' },
      { name: 'Fresh Garlic cloves (crushed)', quantity: '6 cloves' },
      { name: 'Panch Phoron / Mustard seeds', quantity: '1/2 teaspoon' },
      { name: 'Pure Cold-Pressed Mustard Oil', quantity: '2 tablespoons' },
      { name: 'Green chillies (slit)', quantity: '3 pieces' },
      { name: 'Salt', quantity: 'to taste (use minimally as Khar is salty)' }
    ],
    preparationSteps: [
      'Heat virgin mustard oil in a cast iron kadai until smoking hot.',
      'Temper with crushed garlic and green chillies until golden and fragrant.',
      'Add diced raw papaya, turmeric pinch, and saute for 4 minutes.',
      'Pour in 2 cups of water and bring to a rolling boil until papaya turns tender.',
      'Stir in the Kola Khar liquid gently; watch the broth take on its characteristic golden-green hue.',
      'Simmer on low heat for 5 minutes and finish with a drizzle of raw mustard oil. Serve warm with steamed Joha rice.'
    ],
    healthAndWisdom: 'Rich in natural potassium and digestive enzymes, Kola Khar balances stomach acidity naturally without synthetic additives.',
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

export const INITIAL_SESSIONS: GameSession[] = [
  {
    id: 'session-guwahati-pittu',
    gameId: 'pittu-seven-stones',
    gameTitle: 'Pittu (Seven Stones)',
    hostId: 'user-arunav-barua',
    hostName: 'Arunav Barua',
    hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    date: 'Tomorrow, 4:30 PM',
    time: '4:30 PM - 6:00 PM',
    locality: 'Dighalipukhuri Park Courtyard',
    state: 'Guwahati, Assam',
    privacyMode: 'approximate',
    maxPlayers: 10,
    currentPlayers: 7,
    participants: [
      { id: 'user-arunav-barua', name: 'Arunav Barua', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', team: 'A' },
      { id: 'user-priya-bodo', name: 'Priya Bodo', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', team: 'A' },
      { id: 'user-manoj-nath', name: 'Manoj Nath', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', team: 'B' },
      { id: 'user-deb-choudhury', name: 'Deb Choudhury', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', team: 'B' }
    ],
    notes: 'Bringing seven flat river stones and a soft rubber ball. All beginners welcome! Wear sneakers.',
    status: 'open',
    messages: [
      { id: 'm1', senderId: 'user-arunav-barua', senderName: 'Arunav', text: 'Hey everyone! Setting up the boundaries near the north banyan tree at 4:15 PM.', timestamp: '2 hours ago' },
      { id: 'm2', senderId: 'user-priya-bodo', senderName: 'Priya', text: 'Awesome, bringing water bottles for Team A!', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'session-shillong-sholo-guti',
    gameId: 'shollo-ana-sixteen-soldiers',
    gameTitle: 'Shollo Ana (16 Soldiers Tournament)',
    hostId: 'user-ban-khongwir',
    hostName: 'Ban Khongwir',
    hostAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    date: 'Saturday, 3:00 PM',
    time: '3:00 PM - 5:30 PM',
    locality: 'Ward’s Lake Wooden Gazebo',
    state: 'Shillong, Meghalaya',
    privacyMode: 'approximate',
    maxPlayers: 6,
    currentPlayers: 4,
    participants: [
      { id: 'user-ban-khongwir', name: 'Ban Khongwir', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80' },
      { id: 'user-samar-paul', name: 'Samar Paul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    notes: 'Friendly round-robin tournament on hand-painted pine boards with warm tea.',
    status: 'open',
    messages: [
      { id: 'm3', senderId: 'user-ban-khongwir', senderName: 'Ban', text: 'Board is freshly waxed. Ready for good tactics.', timestamp: 'Yesterday' }
    ]
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
    title: 'Artisan Patron: Send an Inquiry',
    description: 'Explore the verified marketplace and send an inquiry or message to a local Northeast craftsman.',
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
  currentCommissionPercentage: 5
};
