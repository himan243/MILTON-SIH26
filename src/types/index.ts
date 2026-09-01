export type UserRole = 'guest' | 'user' | 'artisan' | 'admin';

export type SupportedLanguage = 'en' | 'hi' | 'as' | 'bn' | 'bodo';

export interface UserContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string; // 'Parent/Guardian' | 'Schoolmate' | 'Neighbor' | 'Family Friend' | 'Cousin' | 'Other'
  isVerified: boolean;
  safetyTier: 'trusted' | 'family' | 'verified_peer';
  avatarUrl?: string;
  addedAt: string;
}

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
  // Safety & Verification properties
  age: number;
  isMinor: boolean;
  ageVerified: boolean;
  verificationMethod?: string; // 'Aadhaar ID' | 'Govt ID' | 'Guardian Verified' | 'Self Declaration'
  childSafetyMode: boolean; // When true, ONLY saved contacts can invite or join meets
  savedContacts: UserContact[];
  isOnline: boolean;
  lastSeen?: string;
}

export interface ActiveUserSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  role: UserRole;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  loginAt: string;
  lastActiveAt: string;
  isOnline: boolean;
  ageVerified: boolean;
  childSafetyMode: boolean;
}

export interface SiteMediaItem {
  id: string;
  entityType: 'game' | 'craft' | 'food' | 'product' | 'banner';
  entityId: string;
  title: string;
  imageUrl: string;
  altText?: string;
  placement: 'hero_banner' | 'card_thumbnail' | 'cover_art' | 'detail_view';
  updatedAt: string;
  updatedBy: string;
}

export interface ArtisanWaitlistEntry {
  id: string;
  artisanName: string;
  craftCategory: string;
  location: string;
  phone: string;
  email: string;
  experienceYears: number;
  message: string;
  submittedAt: string;
  status: 'pending' | 'invited' | 'approved';
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
  joinMode: 'contacts_only' | 'open_strangers'; // Contacts-only for child safety vs strangers mode
  minAgeRequired: number; // 0 for contacts-only (safe for children), 18 for open stranger matches
  childSafe: boolean;
  maxPlayers: number;
  currentPlayers: number;
  participants: Array<{ id: string; name: string; avatar: string; team?: 'A' | 'B'; isContact?: boolean }>;
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
  commissionRate: number;
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
  childSafetyEnforced: boolean;
  ageVerifiedUsersCount: number;
}
