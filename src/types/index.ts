export type UserRole = 'guest' | 'user' | 'artisan' | 'admin';

export type SupportedLanguage = 'en' | 'hi' | 'as' | 'bn' | 'bodo';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  region: string;
  preferredLanguage: SupportedLanguage;
  xp: number;
  level: number;
  streakDays: number;
  badges: string[];
  savedGameIds: string[];
  savedCraftIds: string[];
  savedFoodIds: string[];
  savedProjectIds: string[];
  joinedSessionIds: string[];
}

export interface GameProgression {
  level: 'Beginner' | 'Explorer' | 'Skilled' | 'Master';
  xpRequired: number;
  unlockedPerks: string[];
}

export interface TraditionalGame {
  id: string;
  name: string;
  vernacularNames: Record<string, string>;
  region: string;
  tagline: string;
  story: string;
  historicalEra: string;
  playersCount: string;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  equipmentNeeded: string[];
  playingArea: string;
  howToPlay: string[];
  rules: string[];
  skillsDeveloped: string[];
  imageUrl: string;
  coverImage: string;
  relatedMarketplaceItemIds?: string[];
  activePlayersNearbyCount: number;
  featured?: boolean;
}

export interface GameSession {
  id: string;
  gameId: string;
  gameTitle: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  date: string;
  time: string;
  locality: string;
  state: string;
  privacyMode: 'precise' | 'approximate' | 'manual';
  maxPlayers: number;
  currentPlayers: number;
  participants: Array<{ id: string; name: string; avatar: string; team?: 'A' | 'B' }>;
  notes: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  messages: Array<{ id: string; senderId: string; senderName: string; text: string; timestamp: string }>;
}

export interface TraditionalCraft {
  id: string;
  name: string;
  indigenousName?: string;
  category: 'Bamboo & Cane' | 'Pottery & Clay' | 'Handloom & Weaving' | 'Wood & Brass' | 'Household Tools';
  region: string;
  state: string;
  culturalSignificance: string;
  materialsUsed: string[];
  traditionalCraftingMethod: string[];
  preservationStatus: 'Thriving' | 'Endangered' | 'Rare' | 'Revived';
  imageUrl: string;
  artisanCountInRegion: number;
  marketplaceListingIds: string[];
  featured?: boolean;
}

export interface ArtisanProduct {
  id: string;
  title: string;
  craftId: string;
  craftName: string;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  artisanAvatar: string;
  priceInr: number;
  stockAvailable: number;
  description: string;
  dimensions: string;
  materialDetails: string;
  estimatedCraftingDays: number;
  supportsBulkOrders: boolean;
  minBulkQuantity?: number;
  imageUrl: string;
  additionalImages?: string[];
  verificationStatus: 'approved' | 'pending' | 'rejected';
  commissionRate: number; // e.g. 5%
  rating: number;
  reviewsCount: number;
}

export interface OrderInquiry {
  id: string;
  productId: string;
  productTitle: string;
  artisanId: string;
  artisanName: string;
  customerName: string;
  customerContact: string;
  customerEmail: string;
  deliveryCity: string;
  requestedQuantity: number;
  orderType: 'single' | 'bulk';
  notes: string;
  submittedAt: string;
  status: 'pending' | 'quoted' | 'accepted' | 'declined';
  quoteAmountInr?: number;
}

export interface FoodStory {
  id: string;
  name: string;
  indigenousName: string;
  region: string;
  state: string;
  story: string;
  culturalOccasions: string[];
  flavorProfile: string[];
  ingredients: Array<{ name: string; quantity: string; note?: string }>;
  preparationSteps: string[];
  healthAndWisdom: string;
  imageUrl: string;
  featured?: boolean;
}

export interface NostalgicBuild {
  id: string;
  title: string;
  subhead: string;
  materials: string[];
  toolsNeeded: string[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  steps: string[];
  nostalgiaStory: string;
  skillsLearned: string[];
  imageUrl: string;
}

export interface AIProjectIdea {
  id: string;
  title: string;
  concept: string;
  identifiedMaterials: string[];
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  estimatedTime: string;
  culturalConnection?: string;
  stepByStep: string[];
  safetyNotes?: string[];
  skillsLearned: string[];
  previewImageUrl: string;
  xpReward: number;
}

export interface SavedAIProject {
  id: string;
  userId: string;
  idea: AIProjectIdea;
  uploadedImageUrl: string;
  completedAt?: string;
  savedAt: string;
  userNotes?: string;
}

export interface CulturalChallenge {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  category: 'game' | 'craft' | 'food' | 'ai-creation' | 'preservation';
  xpReward: number;
  badgeRewardId?: string;
  badgeRewardName?: string;
  expiresInDays: number;
  participantsCount: number;
  isCompleted?: boolean;
}

export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
}

export interface CommunityPreserveItem {
  id: string;
  type: 'game' | 'craft' | 'food' | 'build' | 'correction';
  title: string;
  region: string;
  description: string;
  submittedBy: string;
  submitterContact?: string;
  mediaUrl?: string;
  submittedAt: string;
  status: 'pending' | 'under-review' | 'approved' | 'implemented' | 'rejected';
  adminNotes?: string;
  upvotes: number;
}

export interface AdminAnalytics {
  registeredUsersCount: number;
  activePlayersToday: number;
  activeGameSessions: number;
  verifiedArtisansCount: number;
  pendingApprovalsCount: number;
  totalMarketplaceInquiries: number;
  aiCreationsGenerated: number;
  preservedCulturalItemsCount: number;
  currentCommissionPercentage: number;
}
