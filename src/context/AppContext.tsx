'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  SupportedLanguage,
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
  OrderInquiry,
  SavedAIProject,
  AIProjectIdea
} from '@/types';
import {
  INITIAL_GAMES,
  INITIAL_CRAFTS,
  INITIAL_PRODUCTS,
  INITIAL_FOOD_STORIES,
  INITIAL_NOSTALGIC_BUILDS,
  INITIAL_SESSIONS,
  INITIAL_CHALLENGES,
  INITIAL_BADGES,
  INITIAL_COMMUNITY_SUBMISSIONS,
  INITIAL_ANALYTICS
} from '@/data/mockData';
import { translations, TranslationStrings } from '@/lib/i18n';
import confetti from 'canvas-confetti';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationStrings;
  
  games: TraditionalGame[];
  crafts: TraditionalCraft[];
  products: ArtisanProduct[];
  foodStories: FoodStory[];
  nostalgicBuilds: NostalgicBuild[];
  sessions: GameSession[];
  challenges: CulturalChallenge[];
  badges: BadgeInfo[];
  submissions: CommunityPreserveItem[];
  analytics: AdminAnalytics;
  inquiries: OrderInquiry[];
  savedProjects: SavedAIProject[];
  
  // Actions
  addXP: (amount: number, reason?: string) => void;
  toggleSaveGame: (gameId: string) => void;
  toggleSaveCraft: (craftId: string) => void;
  toggleSaveFood: (foodId: string) => void;
  
  // Sessions
  createSession: (sessionData: Omit<GameSession, 'id' | 'hostId' | 'hostName' | 'hostAvatar' | 'currentPlayers' | 'participants' | 'status' | 'messages'>) => void;
  joinSession: (sessionId: string) => void;
  leaveSession: (sessionId: string) => void;
  sendSessionMessage: (sessionId: string, text: string) => void;
  
  // Marketplace & Artisan
  addProduct: (productData: Omit<ArtisanProduct, 'id' | 'artisanId' | 'artisanName' | 'artisanAvatar' | 'verificationStatus' | 'rating' | 'reviewsCount' | 'commissionRate'>) => void;
  submitInquiry: (inquiryData: Omit<OrderInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  
  // Community Preservation
  submitCommunityMemory: (memoryData: Omit<CommunityPreserveItem, 'id' | 'submittedBy' | 'submittedAt' | 'status' | 'upvotes'>) => void;
  upvoteSubmission: (id: string) => void;
  
  // AI Save
  saveAIProject: (idea: AIProjectIdea, uploadedImageUrl: string) => void;
  
  // Admin Approvals
  approveProduct: (productId: string) => void;
  rejectProduct: (productId: string) => void;
  updateSubmissionStatus: (submissionId: string, status: CommunityPreserveItem['status']) => void;
  updateCommissionRate: (newRate: number) => void;
  
  // UI Dialogs
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isPreserveModalOpen: boolean;
  setIsPreserveModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  notifications: Array<{ id: string; title: string; message: string; timestamp: string; read: boolean }>;
  markNotificationsAsRead: () => void;
  triggerConfetti: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-arunav-barua',
  name: 'Arunav Barua',
  email: 'arunav.barua@nostalgichub.org',
  role: 'user',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  region: 'Guwahati, Assam',
  preferredLanguage: 'en',
  xp: 450,
  level: 2,
  streakDays: 4,
  badges: ['badge-first-discovery', 'badge-creative-mind'],
  savedGameIds: ['pittu-seven-stones', 'shollo-ana-sixteen-soldiers'],
  savedCraftIds: ['craft-assamese-japi'],
  savedFoodIds: ['food-assamese-khar'],
  savedProjectIds: [],
  joinedSessionIds: ['session-guwahati-pittu']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [games] = useState<TraditionalGame[]>(INITIAL_GAMES);
  const [crafts] = useState<TraditionalCraft[]>(INITIAL_CRAFTS);
  const [products, setProducts] = useState<ArtisanProduct[]>(INITIAL_PRODUCTS);
  const [foodStories] = useState<FoodStory[]>(INITIAL_FOOD_STORIES);
  const [nostalgicBuilds] = useState<NostalgicBuild[]>(INITIAL_NOSTALGIC_BUILDS);
  const [sessions, setSessions] = useState<GameSession[]>(INITIAL_SESSIONS);
  const [challenges, setChallenges] = useState<CulturalChallenge[]>(INITIAL_CHALLENGES);
  const [badges] = useState<BadgeInfo[]>(INITIAL_BADGES);
  const [submissions, setSubmissions] = useState<CommunityPreserveItem[]>(INITIAL_COMMUNITY_SUBMISSIONS);
  const [analytics, setAnalytics] = useState<AdminAnalytics>(INITIAL_ANALYTICS);
  const [inquiries, setInquiries] = useState<OrderInquiry[]>([]);
  const [savedProjects, setSavedProjects] = useState<SavedAIProject[]>([]);
  
  // UI Dialog states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPreserveModalOpen, setIsPreserveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; timestamp: string; read: boolean }>>([
    { id: 'n1', title: 'New Game Session in Guwahati', message: 'Arunav invited players for Pittu at Dighalipukhuri Park.', timestamp: '15m ago', read: false },
    { id: 'n2', title: 'Challenge Expiring', message: 'Roots of Play: Explore 3 Forgotten Games closes in 6 hours.', timestamp: '1h ago', read: false },
    { id: 'n3', title: 'Artisan Verification Update', message: 'Rupam Das Japi listings verified by Heritage Curator.', timestamp: '3h ago', read: true }
  ]);

  // Sync from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nostalgic_hub_user');
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedLang = localStorage.getItem('nostalgic_hub_lang') as SupportedLanguage;
      if (savedLang) setLanguage(savedLang);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nostalgic_hub_user', JSON.stringify(user));
      localStorage.setItem('nostalgic_hub_lang', language);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [user, language]);

  const setRole = (newRole: UserRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === 'admin' ? 'Heritage Curator Admin' : newRole === 'artisan' ? 'Lakhimi Bodo Crafts Guild' : newRole === 'guest' ? 'Guest Visitor' : 'Arunav Barua',
      email: newRole === 'admin' ? 'curator@nostalgichub.org' : newRole === 'artisan' ? 'lakhimi@artisan.in' : newRole === 'guest' ? 'guest@nostalgichub.org' : 'arunav.barua@nostalgichub.org'
    }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c08820', '#1b3022', '#fe997c', '#fbbb51']
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const addXP = (amount: number, reason?: string) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        triggerConfetti();
        setNotifications(n => [
          { id: `notif-${Date.now()}`, title: `🎉 Level Up! You reached Level ${newLevel}`, message: `You are now a seasoned Cultural Archivist! +${amount} XP (${reason || 'Heritage Action'})`, timestamp: 'Just now', read: false },
          ...n
        ]);
      } else {
        setNotifications(n => [
          { id: `notif-${Date.now()}`, title: `+${amount} Heritage XP Earned`, message: reason || 'Heritage Exploration Action', timestamp: 'Just now', read: false },
          ...n
        ]);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const toggleSaveGame = (gameId: string) => {
    setUser(prev => {
      const exists = prev.savedGameIds.includes(gameId);
      const updated = exists ? prev.savedGameIds.filter(id => id !== gameId) : [...prev.savedGameIds, gameId];
      if (!exists) addXP(25, 'Saved game to personal archive');
      return { ...prev, savedGameIds: updated };
    });
  };

  const toggleSaveCraft = (craftId: string) => {
    setUser(prev => {
      const exists = prev.savedCraftIds.includes(craftId);
      const updated = exists ? prev.savedCraftIds.filter(id => id !== craftId) : [...prev.savedCraftIds, craftId];
      if (!exists) addXP(25, 'Saved traditional craft to collection');
      return { ...prev, savedCraftIds: updated };
    });
  };

  const toggleSaveFood = (foodId: string) => {
    setUser(prev => {
      const exists = prev.savedFoodIds.includes(foodId);
      const updated = exists ? prev.savedFoodIds.filter(id => id !== foodId) : [...prev.savedFoodIds, foodId];
      if (!exists) addXP(25, 'Saved ancestral recipe to culinary diary');
      return { ...prev, savedFoodIds: updated };
    });
  };

  const createSession = (sessionData: Omit<GameSession, 'id' | 'hostId' | 'hostName' | 'hostAvatar' | 'currentPlayers' | 'participants' | 'status' | 'messages'>) => {
    const newSession: GameSession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      hostId: user.id,
      hostName: user.name,
      hostAvatar: user.avatarUrl,
      currentPlayers: 1,
      participants: [{ id: user.id, name: user.name, avatar: user.avatarUrl, team: 'A' }],
      status: 'open',
      messages: [{ id: `m-${Date.now()}`, senderId: user.id, senderName: user.name, text: `Session created: ${sessionData.notes || 'Looking forward to playing!'}`, timestamp: 'Just now' }]
    };

    setSessions(prev => [newSession, ...prev]);
    setUser(prev => ({ ...prev, joinedSessionIds: [...prev.joinedSessionIds, newSession.id] }));
    addXP(100, 'Hosted a community game revival session');
    triggerConfetti();
  };

  const joinSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId && !s.participants.some(p => p.id === user.id)) {
        return {
          ...s,
          currentPlayers: s.currentPlayers + 1,
          participants: [...s.participants, { id: user.id, name: user.name, avatar: user.avatarUrl, team: s.participants.length % 2 === 0 ? 'A' : 'B' }]
        };
      }
      return s;
    }));

    setUser(prev => {
      if (!prev.joinedSessionIds.includes(sessionId)) {
        return { ...prev, joinedSessionIds: [...prev.joinedSessionIds, sessionId] };
      }
      return prev;
    });

    addXP(50, 'Joined a neighborhood game session');
  };

  const leaveSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          currentPlayers: Math.max(1, s.currentPlayers - 1),
          participants: s.participants.filter(p => p.id !== user.id)
        };
      }
      return s;
    }));

    setUser(prev => ({ ...prev, joinedSessionIds: prev.joinedSessionIds.filter(id => id !== sessionId) }));
  };

  const sendSessionMessage = (sessionId: string, text: string) => {
    if (!text.trim()) return;
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          messages: [...s.messages, { id: `msg-${Date.now()}`, senderId: user.id, senderName: user.name, text, timestamp: 'Just now' }]
        };
      }
      return s;
    }));
  };

  const addProduct = (productData: Omit<ArtisanProduct, 'id' | 'artisanId' | 'artisanName' | 'artisanAvatar' | 'verificationStatus' | 'rating' | 'reviewsCount' | 'commissionRate'>) => {
    const newProduct: ArtisanProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      artisanId: user.id,
      artisanName: user.name,
      artisanAvatar: user.avatarUrl,
      verificationStatus: 'pending', // Requires admin approval as per Prompt specifications
      commissionRate: analytics.currentCommissionPercentage,
      rating: 5.0,
      reviewsCount: 0
    };

    setProducts(prev => [newProduct, ...prev]);
    setAnalytics(prev => ({ ...prev, pendingApprovalsCount: prev.pendingApprovalsCount + 1 }));
    setNotifications(n => [
      { id: `notif-${Date.now()}`, title: 'Product Submitted for Verification', message: `"${newProduct.title}" is queued for curator verification before public listing.`, timestamp: 'Just now', read: false },
      ...n
    ]);
  };

  const submitInquiry = (inquiryData: Omit<OrderInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInquiry: OrderInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: 'Just now',
      status: 'pending'
    };

    setInquiries(prev => [newInquiry, ...prev]);
    setAnalytics(prev => ({ ...prev, totalMarketplaceInquiries: prev.totalMarketplaceInquiries + 1 }));
    addXP(40, 'Connected with an indigenous artisan');
    triggerConfetti();
  };

  const submitCommunityMemory = (memoryData: Omit<CommunityPreserveItem, 'id' | 'submittedBy' | 'submittedAt' | 'status' | 'upvotes'>) => {
    const newSub: CommunityPreserveItem = {
      ...memoryData,
      id: `sub-${Date.now()}`,
      submittedBy: user.name,
      submittedAt: 'Just now',
      status: 'pending',
      upvotes: 1
    };

    setSubmissions(prev => [newSub, ...prev]);
    setAnalytics(prev => ({ ...prev, pendingApprovalsCount: prev.pendingApprovalsCount + 1 }));
    addXP(120, 'Submitted community cultural memory');
    triggerConfetti();
  };

  const upvoteSubmission = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s));
    addXP(10, 'Supported community archival record');
  };

  const saveAIProject = (idea: AIProjectIdea, uploadedImageUrl: string) => {
    const newSaved: SavedAIProject = {
      id: `ai-proj-${Date.now()}`,
      userId: user.id,
      idea,
      uploadedImageUrl,
      savedAt: 'Just now'
    };

    setSavedProjects(prev => [newSaved, ...prev]);
    setUser(prev => ({ ...prev, savedProjectIds: [...prev.savedProjectIds, newSaved.id] }));
    addXP(idea.xpReward || 150, `Created AI project: ${idea.title}`);
    triggerConfetti();
  };

  const approveProduct = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, verificationStatus: 'approved' } : p));
    setAnalytics(prev => ({ ...prev, pendingApprovalsCount: Math.max(0, prev.pendingApprovalsCount - 1), verifiedArtisansCount: prev.verifiedArtisansCount + 1 }));
  };

  const rejectProduct = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, verificationStatus: 'rejected' } : p));
    setAnalytics(prev => ({ ...prev, pendingApprovalsCount: Math.max(0, prev.pendingApprovalsCount - 1) }));
  };

  const updateSubmissionStatus = (submissionId: string, status: CommunityPreserveItem['status']) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status } : s));
    if (status === 'approved' || status === 'implemented') {
      setAnalytics(prev => ({ ...prev, preservedCulturalItemsCount: prev.preservedCulturalItemsCount + 1 }));
    }
  };

  const updateCommissionRate = (newRate: number) => {
    setAnalytics(prev => ({ ...prev, currentCommissionPercentage: newRate }));
    setProducts(prev => prev.map(p => ({ ...p, commissionRate: newRate })));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        role: user.role,
        setRole,
        language,
        setLanguage,
        t,
        games,
        crafts,
        products,
        foodStories,
        nostalgicBuilds,
        sessions,
        challenges,
        badges,
        submissions,
        analytics,
        inquiries,
        savedProjects,
        addXP,
        toggleSaveGame,
        toggleSaveCraft,
        toggleSaveFood,
        createSession,
        joinSession,
        leaveSession,
        sendSessionMessage,
        addProduct,
        submitInquiry,
        submitCommunityMemory,
        upvoteSubmission,
        saveAIProject,
        approveProduct,
        rejectProduct,
        updateSubmissionStatus,
        updateCommissionRate,
        isSearchOpen,
        setIsSearchOpen,
        isPreserveModalOpen,
        setIsPreserveModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        notifications,
        markNotificationsAsRead,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
