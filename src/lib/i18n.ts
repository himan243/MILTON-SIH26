import { SupportedLanguage } from '@/types';

export interface TranslationStrings {
  appName: string;
  livingMuseum: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  startDiscovering: string;
  createSomething: string;
  navDiscover: string;
  navGames: string;
  navCreateWithAI: string;
  navCrafts: string;
  navFoodStories: string;
  navCommunity: string;
  navMarketplace: string;
  navChallenges: string;
  navProfile: string;
  navAdmin: string;
  navArtisanDashboard: string;
  todaysDiscovery: string;
  featuredGame: string;
  rememberThis: string;
  madeByOurPeople: string;
  traditionalFoodStories: string;
  createWithAICallout: string;
  createWithAISub: string;
  uploadPictureCTA: string;
  peopleArePlaying: string;
  nearbyPlayersCount: string;
  hostSession: string;
  joinSession: string;
  helpPreserve: string;
  helpPreserveSub: string;
  submitMemory: string;
  readFullStory: string;
  learnGame: string;
  howToPlay: string;
  materialsNeeded: string[];
  contactArtisan: string;
  requestOrder: string;
  bulkOrder: string;
  xpEarned: string;
  currentStreak: string;
  searchPlaceholder: string;
  adminApprovals: string;
  languageSelect: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appName: "Nostalgic Hub",
    livingMuseum: "Living Museum & Cultural Revival",
    tagline: "Discover what we forgot. Create what we imagined. Play what we grew up with.",
    heroHeadline: "How many things from our childhood do you still remember?",
    heroSubheadline: "Discover forgotten games, traditional crafts, food stories, childhood creations and the people keeping them alive across Northeast India.",
    startDiscovering: "Start Discovering",
    createSomething: "Create Something",
    navDiscover: "Discover",
    navGames: "Games",
    navCreateWithAI: "Create with AI",
    navCrafts: "Crafts",
    navFoodStories: "Food Stories",
    navCommunity: "Community",
    navMarketplace: "Marketplace",
    navChallenges: "Challenges",
    navProfile: "My Journey",
    navAdmin: "Curator Admin",
    navArtisanDashboard: "Artisan Portal",
    todaysDiscovery: "Today's Nostalgic Discovery",
    featuredGame: "Featured Archival Game",
    rememberThis: "Remember This?",
    madeByOurPeople: "Made by Our People",
    traditionalFoodStories: "Traditional Food Stories",
    createWithAICallout: "Have something random lying around?",
    createWithAISub: "Upload a picture of household items, scrap wood, or bamboo to uncover nostalgic creations & upcycling ideas.",
    uploadPictureCTA: "Upload Photo → Discover Creation",
    peopleArePlaying: "People Are Playing Nearby",
    nearbyPlayersCount: "players nearby are looking for a match",
    hostSession: "Host a Game Session",
    joinSession: "Join Session",
    helpPreserve: "Help Us Preserve What We Forgot",
    helpPreserveSub: "Know a childhood game, tribal craft, or indigenous recipe not documented here? Submit your memory for archival verification.",
    submitMemory: "Submit Cultural Memory",
    readFullStory: "Read Full Story",
    learnGame: "Learn How to Play",
    howToPlay: "Rules & Progression",
    materialsNeeded: ["Bamboo", "Stones", "Clay", "Natural Twine"],
    contactArtisan: "Contact Artisan",
    requestOrder: "Request Order",
    bulkOrder: "Request Bulk Order",
    xpEarned: "Heritage XP",
    currentStreak: "Day Streak",
    searchPlaceholder: "Search games, crafts, food stories, artisans...",
    adminApprovals: "Curator Approvals",
    languageSelect: "Language"
  },
  hi: {
    appName: "नॉस्टैल्जिक हब",
    livingMuseum: "जीवंत संग्रहालय एवं सांस्कृतिक पुनरुद्धार",
    tagline: "जो हम भूल गए उसे खोजें। जो हमने सोचा उसे बनाएं।",
    heroHeadline: "बचपन की कितनी यादें आज भी आपके दिल में जिंदा हैं?",
    heroSubheadline: "पूर्वोत्तर भारत के भूले-बिसरे खेल, पारंपरिक शिल्प, पारंपरिक व्यंजन और उन्हें जीवित रखने वाले कारीगरों की खोज करें।",
    startDiscovering: "खोज शुरू करें",
    createSomething: "कुछ नया बनाएं",
    navDiscover: "खोजें",
    navGames: "पारंपरिक खेल",
    navCreateWithAI: "एआई के साथ बनाएं",
    navCrafts: "शिल्प कला",
    navFoodStories: "व्यंजन गाथा",
    navCommunity: "समुदाय",
    navMarketplace: "बाजार",
    navChallenges: "चुनौतियां",
    navProfile: "मेरी यात्रा",
    navAdmin: "प्रशासक",
    navArtisanDashboard: "कारीगर पोर्टल",
    todaysDiscovery: "आज की पुरानी खोज",
    featuredGame: "विशेष पारंपरिक खेल",
    rememberThis: "क्या आपको याद है?",
    madeByOurPeople: "हमारे कारीगरों द्वारा निर्मित",
    traditionalFoodStories: "पारंपरिक खाद्य कथाएं",
    createWithAICallout: "घर पर कुछ पुरानी वस्तुएं रखी हैं?",
    createWithAISub: "फोटो अपलोड करें और पारंपरिक व रीसाइक्लिंग खिलौने बनाने के सुझाव पाएं।",
    uploadPictureCTA: "फोटो अपलोड करें → नया बनाएं",
    peopleArePlaying: "आसपास लोग खेल रहे हैं",
    nearbyPlayersCount: "खिलाड़ी मैच की तलाश में हैं",
    hostSession: "नया खेल सत्र आयोजित करें",
    joinSession: "सत्र में शामिल हों",
    helpPreserve: "विरासत को सहेजने में मदद करें",
    helpPreserveSub: "क्या आप किसी भूली हुई परंपरा या व्यंजन को जानते हैं? इसे हमारे संग्रह में जोड़ें।",
    submitMemory: "सांस्कृतिक स्मृति साझा करें",
    readFullStory: "पूरी कहानी पढ़ें",
    learnGame: "खेलना सीखें",
    howToPlay: "नियम और प्रगति",
    materialsNeeded: ["बांस", "पत्थर", "मिट्टी", "प्राकृतिक रस्सी"],
    contactArtisan: "कारीगर से संपर्क करें",
    requestOrder: "ऑर्डर अनुरोध करें",
    bulkOrder: "थोक ऑर्डर अनुरोध",
    xpEarned: "धरोहर एक्सपी",
    currentStreak: "दिन की लय",
    searchPlaceholder: "खेल, शिल्प, भोजन या कारीगर खोजें...",
    adminApprovals: "प्रशासक अनुमोदन",
    languageSelect: "भाषा"
  },
  as: {
    appName: "নষ্টালজিক হাব",
    livingMuseum: "জীৱন্ত সংগ্ৰহালয় আৰু সাংস্কৃতিক পুনৰুজ্জীৱন",
    tagline: "আমি পাহৰি যোৱা স্মৃতিবোৰ পুনৰ আৱিষ্কাৰ কৰক।",
    heroHeadline: "আমাৰ শৈশৱৰ কিমান কথা আপোনাৰ এতিয়াও মনত আছে?",
    heroSubheadline: "উত্তৰ-পূবৰ পাহৰণিৰ গৰ্ভত হেৰাই যোৱা খেল, পৰম্পৰাগত শিল্প, খাদ্যৰ সোৱাদ আৰু এইবোৰ জীয়াই ৰখা শিল্পীক আৱিষ্কাৰ কৰক।",
    startDiscovering: "আৱিষ্কাৰ আৰম্ভ কৰক",
    createSomething: "নতুন কিবা সৃষ্টি কৰক",
    navDiscover: "আৱিষ্কাৰ",
    navGames: "হেৰুৱা খেল",
    navCreateWithAI: "AIৰে নিৰ্মাণ কৰক",
    navCrafts: "থলুৱা শিল্প",
    navFoodStories: "খাদ্যৰ সুবাস",
    navCommunity: "সমাজ",
    navMarketplace: "হাতবজাৰ",
    navChallenges: "প্ৰত্যাহ্বান",
    navProfile: "মোৰ যাত্ৰা",
    navAdmin: "কিউৰেটৰ প্ৰশাসন",
    navArtisanDashboard: "শিল্পী পৰ্টেল",
    todaysDiscovery: "আজিৰ নষ্টালজিক আৱিষ্কাৰ",
    featuredGame: "আজিৰ বিশেষ খেল",
    rememberThis: "মনত আছেনে এইবোৰ?",
    madeByOurPeople: "আমাৰ থলুৱা হাতৰ পৰশ",
    traditionalFoodStories: "পৰম্পৰাগত খাদ্যৰ সাধু",
    createWithAICallout: "ঘৰত পেলনীয়া বা পুৰণি বস্তু আছে নেকি?",
    createWithAISub: "ফটো আপলোড কৰক আৰু নতুন খেলনা বা শিল্প নিৰ্মাণৰ দিহা লওক।",
    uploadPictureCTA: "ছবি তোলক → সৃষ্টিৰ দিহা লওক",
    peopleArePlaying: "কাষৰ মানুহে খেলি আছে",
    nearbyPlayersCount: "জন খেলুৱৈ খেলৰ বাবে সাজু হৈছে",
    hostSession: "খেলৰ মেল পাতক",
    joinSession: "খেলত যোগ দিয়ক",
    helpPreserve: "হেৰাই যোৱা ঐতিহ্য সংৰক্ষণ কৰক",
    helpPreserveSub: "আপোনাৰ জনা কোনো পুৰণি খেল বা ৰেচিপি আমাক জনাওক।",
    submitMemory: "সাংস্কৃতিক স্মৃতি জমা দিয়ক",
    readFullStory: "সম্পূৰ্ণ ইতিহাস পঢ়ক",
    learnGame: "খেলিবলৈ শিকক",
    howToPlay: "নিয়মাৱলী আৰু দক্ষতা",
    materialsNeeded: ["বাঁহ", "শিলগুটি", "মাটি", "মৰাপাট"],
    contactArtisan: "শিল্পীৰ সৈতে কথা পাতক",
    requestOrder: "অৰ্ডাৰ অনুৰোধ",
    bulkOrder: "পাইকাৰী অনুৰোধ",
    xpEarned: "ঐতিহ্য XP",
    currentStreak: "দিনৰ ধাৰাবাহিকতা",
    searchPlaceholder: "খেল, শিল্প, খাদ্যৰ সন্ধান কৰক...",
    adminApprovals: "অনুমোদন পেণ্ডিং",
    languageSelect: "ভাষা"
  },
  bn: {
    appName: "নস্টালজিক হাব",
    livingMuseum: "জীবন্ত জাদুঘর ও সাংস্কৃতিক সংরক্ষণ",
    tagline: "যা ভুলে গেছি তা নতুন করে খুঁজুন। যা ভাবতাম তা তৈরি করুন।",
    heroHeadline: "শৈশবের কয়টি স্মৃতি আজও আপনার মনে অমলিন?",
    heroSubheadline: "উত্তর-পূর্ব ভারতের হারিয়ে যাওয়া গ্রামীণ খেলা, হস্তশিল্প, ট্র্যাডিশনাল রান্নার গল্প এবং শিল্পীদের সাথে যুক্ত হন।",
    startDiscovering: "অন্বেষণ শুরু করুন",
    createSomething: "কিছু তৈরি করুন",
    navDiscover: "অন্বেষণ",
    navGames: "হারানো খেলা",
    navCreateWithAI: "AI দিয়ে বানান",
    navCrafts: "ঐতিহ্যবাহী শিল্প",
    navFoodStories: "খাবারের ইতিবৃত্ত",
    navCommunity: "কমিউনিটি",
    navMarketplace: "হাটবাজার",
    navChallenges: "চ্যালেঞ্জ",
    navProfile: "আমার সংগ্রহ",
    navAdmin: "অ্যাডমিন ড্যাশবোর্ড",
    navArtisanDashboard: "কারিগর পোর্টাল",
    todaysDiscovery: "আজকের নস্টালজিক অন্বেষণ",
    featuredGame: "বিশেষ সংগৃহীত খেলা",
    rememberThis: "মনে পড়ে কি?",
    madeByOurPeople: "আমাদের মানুষের হাতের তৈরি",
    traditionalFoodStories: "ঐতিহ্যবাহী খাবারের গল্প",
    createWithAICallout: "ঘরে পুরনো জিনিস পড়ে আছে?",
    createWithAISub: "ছবি আপলোড করুন এবং চমৎকার খেলনা ও শিল্প বানানোর আইডিয়া পান।",
    uploadPictureCTA: "ছবি দিন → আবিষ্কার করুন",
    peopleArePlaying: "কাছাকাছি মানুষেরা খেলছেন",
    nearbyPlayersCount: "জন খেলোয়াড় ম্যাচ খুঁজছেন",
    hostSession: "নতুন খেলার আসর বসান",
    joinSession: "আসরে যোগ দিন",
    helpPreserve: "ঐতিহ্য বাঁচাতে সহায়তা করুন",
    helpPreserveSub: "শৈশবের কোনো জানা খেলা বা রেসিপি আর্কাইভে যুক্ত করুন।",
    submitMemory: "স্মৃতি জমা দিন",
    readFullStory: "পুরো ইতিহাস পড়ুন",
    learnGame: "খেলার নিয়ম জানুন",
    howToPlay: "নিয়মাবলি",
    materialsNeeded: ["বাঁশ", "মার্বেল", "মাটি", "দড়ি"],
    contactArtisan: "শিল্পীর সাথে যোগাযোগ",
    requestOrder: "অর্ডার অনুরোধ",
    bulkOrder: "পাইকারি অর্ডার",
    xpEarned: "হেরিটেজ এক্সপি",
    currentStreak: "দিনের ধারাবাহিকতা",
    searchPlaceholder: "খেলা, হস্তশিল্প, খাবার সন্ধান করুন...",
    adminApprovals: "প্রশাসনিক অনুমোদন",
    languageSelect: "ভাষা"
  },
  bodo: {
    appName: "Nostalgic Hub",
    livingMuseum: "जिउथांखि म्यूजियम आरो हारिमु फोसाबनाय",
    tagline: "बावगारनाय गोजाम महरखौ नागिरफिन।",
    heroHeadline: "उन्दै समनि बेसेबां गेलेमुफोरखौ नोंथाङा आथरावबो गोसोआव लाखिदों?",
    heroSubheadline: "सानजा-सा भारतनि बावगारजानाय गेलेमु, बां-सि खाव, हारिमुआरि जामुं आरो दागिरिफोरजों लोगो जानाय।",
    startDiscovering: "नागिरनो हमदो",
    createSomething: "गोदान सोरजिदो",
    navDiscover: "नागिरनाय",
    navGames: "गेलेमु",
    navCreateWithAI: "AI जों दादो",
    navCrafts: "हारिमुआरि सि-जोब",
    navFoodStories: "जामुंनि सल'",
    navCommunity: "अनसोल",
    navMarketplace: "हात",
    navChallenges: "थेथाय",
    navProfile: "आंनि दावबायनाय",
    navAdmin: "सामलायगिरि",
    navArtisanDashboard: "दागिरिनि बिलाइ",
    todaysDiscovery: "दिनैनि गोजाम आथार",
    featuredGame: "गाहाय गेलेमु",
    rememberThis: "गोसोआव दं नामा?",
    madeByOurPeople: "जोंनि सुबुंफोरनि दानाय",
    traditionalFoodStories: "हारिमुआरि जामुंनि सल'",
    createWithAICallout: "न'आव गोजाम मुवाफोर दं नामा?",
    createWithAISub: "फोटो आपलोड खालाम आरो गोदान गेलेग्रा मुवा बानायनो सोलों।",
    uploadPictureCTA: "फोटो हरदो → दानाय सोलों",
    peopleArePlaying: "खाथियावनो गेलेगासिनो दं",
    nearbyPlayersCount: "गेलेगिरिफोरा गेलेनो नागिरगासिनो दं",
    hostSession: "गोदान गेलेनाय खुं",
    joinSession: "गेलेनायाव बाहागो ला",
    helpPreserve: "हारिमु रैखा खालामनो हेफाजाब हो",
    helpPreserveSub: "बावगारजानाय गेलेमु एबा जामुंनि खौरां थिसन।",
    submitMemory: "हारिमु गोसोखांथि हरदो",
    readFullStory: "गासै सल'खौ फराय",
    learnGame: "गेलेनो सोलों",
    howToPlay: "नेम आरो गोहो",
    materialsNeeded: ["ओवा", "अन्थाय", "हा", "दौ"],
    contactArtisan: "दागिरिजों सावराय",
    requestOrder: "अर्डাৰ खालाम",
    bulkOrder: "गोबां मुवा खालाम",
    xpEarned: "हारिमु XP",
    currentStreak: "साननि फारिलाइ",
    searchPlaceholder: "गेलेमु, सि, जामुं नागिरदो...",
    adminApprovals: "गनायनाय",
    languageSelect: "राव"
  }
};
