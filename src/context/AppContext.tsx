'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  AIProjectIdea,
  UserContact,
  ActiveUserSession,
  SiteMediaItem,
  ArtisanWaitlistEntry
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
  INITIAL_ANALYTICS,
  INITIAL_CONTACTS,
  INITIAL_ACTIVE_SESSIONS,
  INITIAL_SITE_MEDIA,
  INITIAL_ARTISAN_WAITLIST
} from '@/data/mockData';
import {
  fetchGames,
  fetchCrafts,
  fetchFoodStories,
  fetchSessions,
  fetchSiteMedia,
  fetchActiveUserSessions,
  fetchArtisanWaitlist,
  updateGameMedia,
  updateCraftMedia,
  updateFoodMedia,
  updateSiteMediaItem,
  addUserContact,
  deleteUserContact,
  createSessionDB,
  registerActiveSession,
  terminateActiveSession,
  submitArtisanWaitlist,
  updateWaitlistStatus as updateWaitlistStatusDB,
  uploadImageFile
} from '@/lib/db';
import { translations, TranslationStrings } from '@/lib/i18n';
import confetti from 'canvas-confetti';

export interface AppContextType {
  // User & Auth State
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  login: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationStrings;

  // Child Safety & Age Verification
  childSafetyMode: boolean;
  toggleChildSafetyMode: () => void;
  verifyAge: (age: number, method: string) => void;
  contacts: UserContact[];
  addNewContact: (contact: Omit<UserContact, 'id' | 'addedAt'>) => void;
  removeContact: (contactId: string) => void;

  // Catalog & Content
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
  siteMedia: SiteMediaItem[];
  activeUserSessions: ActiveUserSession[];
  artisanWaitlist: ArtisanWaitlistEntry[];

  // Dynamic Picture & Asset Management (Admin)
  updateEntityPicture: (
    entityType: 'game' | 'craft' | 'food' | 'banner',
    entityId: string,
    newImageUrl: string,
    newCoverImage?: string
  ) => Promise<void>;
  uploadAndApplyPicture: (
    entityType: 'game' | 'craft' | 'food' | 'banner',
    entityId: string,
    file: File,
    isCover?: boolean
  ) => Promise<string>;

  // Actions
  addXP: (amount: number, reason?: string) => void;
  toggleSaveGame: (gameId: string) => void;
  toggleSaveCraft: (craftId: string) => void;
  toggleSaveFood: (foodId: string) => void;

  // Sessions / Meets
  createSession: (sessionData: Omit<GameSession, 'id' | 'hostId' | 'hostName' | 'hostAvatar' | 'currentPlayers' | 'participants' | 'status' | 'messages'>) => void;
  joinSession: (sessionId: string) => { success: boolean; reason?: string };
  leaveSession: (sessionId: string) => void;
  sendSessionMessage: (sessionId: string, text: string) => void;

  // Artisan & Waitlist
  addProduct: (productData: Omit<ArtisanProduct, 'id' | 'artisanId' | 'artisanName' | 'artisanAvatar' | 'verificationStatus' | 'rating' | 'reviewsCount' | 'commissionRate'>) => void;
  submitInquiry: (inquiryData: Omit<OrderInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  joinArtisanWaitlist: (entry: Omit<ArtisanWaitlistEntry, 'id' | 'submittedAt' | 'status'>) => void;
  updateWaitlistStatus: (id: string, status: ArtisanWaitlistEntry['status']) => void;

  // Community Preservation
  submitCommunityMemory: (memoryData: Omit<CommunityPreserveItem, 'id' | 'submittedBy' | 'submittedAt' | 'status' | 'upvotes'>) => void;
  upvoteSubmission: (id: string) => void;

  // AI Save
  saveAIProject: (idea: AIProjectIdea, uploadedImageUrl: string) => void;

  // Admin Controls
  approveProduct: (productId: string) => void;
  rejectProduct: (productId: string) => void;
  updateSubmissionStatus: (submissionId: string, status: CommunityPreserveItem['status']) => void;
  updateCommissionRate: (newRate: number) => void;
  terminateUserSession: (sessionId: string) => void;

  // UI Dialogs & Alerts
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isPreserveModalOpen: boolean;
  setIsPreserveModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAgeVerifyModalOpen: boolean;
  setIsAgeVerifyModalOpen: (open: boolean) => void;
  isAddContactModalOpen: boolean;
  setIsAddContactModalOpen: (open: boolean) => void;
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
  age: 24,
  isMinor: false,
  ageVerified: true,
  verificationMethod: 'Aadhaar Verified',
  childSafetyMode: false,
  savedContacts: INITIAL_CONTACTS,
  isOnline: true,
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Core content states
  const [games, setGames] = useState<TraditionalGame[]>(INITIAL_GAMES);
  const [crafts, setCrafts] = useState<TraditionalCraft[]>(INITIAL_CRAFTS);
  const [products, setProducts] = useState<ArtisanProduct[]>(INITIAL_PRODUCTS);
  const [foodStories, setFoodStories] = useState<FoodStory[]>(INITIAL_FOOD_STORIES);
  const [nostalgicBuilds] = useState<NostalgicBuild[]>(INITIAL_NOSTALGIC_BUILDS);
  const [sessions, setSessions] = useState<GameSession[]>(INITIAL_SESSIONS);
  const [challenges, setChallenges] = useState<CulturalChallenge[]>(INITIAL_CHALLENGES);
  const [badges] = useState<BadgeInfo[]>(INITIAL_BADGES);
  const [submissions, setSubmissions] = useState<CommunityPreserveItem[]>(INITIAL_COMMUNITY_SUBMISSIONS);
  const [analytics, setAnalytics] = useState<AdminAnalytics>(INITIAL_ANALYTICS);
  const [inquiries, setInquiries] = useState<OrderInquiry[]>([]);
  const [savedProjects, setSavedProjects] = useState<SavedAIProject[]>([]);
  const [contacts, setContacts] = useState<UserContact[]>(INITIAL_CONTACTS);
  const [activeUserSessions, setActiveUserSessions] = useState<ActiveUserSession[]>(INITIAL_ACTIVE_SESSIONS);
  const [siteMedia, setSiteMedia] = useState<SiteMediaItem[]>(INITIAL_SITE_MEDIA);
  const [artisanWaitlist, setArtisanWaitlist] = useState<ArtisanWaitlistEntry[]>(INITIAL_ARTISAN_WAITLIST);

  // UI Dialog States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPreserveModalOpen, setIsPreserveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAgeVerifyModalOpen, setIsAgeVerifyModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; timestamp: string; read: boolean }>>([
    { id: 'n1', title: 'Child Safety Mode Enabled', message: 'Meets are locked to verified saved contacts only by default for minors.', timestamp: '10m ago', read: false },
    { id: 'n2', title: 'New Game Session in Guwahati', message: 'Arunav invited players for Pittu at Dighalipukhuri Park.', timestamp: '15m ago', read: false },
    { id: 'n3', title: 'Challenge Active', message: 'Roots of Play: Explore 3 Forgotten Games closes in 6 hours.', timestamp: '1h ago', read: false }
  ]);

  // Load from Supabase DB on startup
  useEffect(() => {
    async function loadData() {
      try {
        const [g, c, f, s, m, act, w] = await Promise.all([
          fetchGames(),
          fetchCrafts(),
          fetchFoodStories(),
          fetchSessions(),
          fetchSiteMedia(),
          fetchActiveUserSessions(),
          fetchArtisanWaitlist()
        ]);
        if (g?.length) setGames(g);
        if (c?.length) setCrafts(c);
        if (f?.length) setFoodStories(f);
        if (s?.length) setSessions(s);
        if (m?.length) setSiteMedia(m);
        if (act?.length) setActiveUserSessions(act);
        if (w?.length) setArtisanWaitlist(w);
      } catch (e) {
        console.warn('Initial data sync fallback to local cache:', e);
      }
    }
    loadData();
  }, []);

  // Sync user and language from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nostalgic_hub_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.savedContacts) setContacts(parsed.savedContacts);
      }
      const savedLang = localStorage.getItem('nostalgic_hub_lang') as SupportedLanguage;
      if (savedLang) setLanguage(savedLang);
      const authFlag = localStorage.getItem('nostalgic_hub_logged_in');
      if (authFlag !== null) setIsLoggedIn(authFlag === 'true');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nostalgic_hub_user', JSON.stringify({ ...user, savedContacts: contacts }));
      localStorage.setItem('nostalgic_hub_lang', language);
      localStorage.setItem('nostalgic_hub_logged_in', String(isLoggedIn));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [user, contacts, language, isLoggedIn]);

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

  const setRole = (newRole: UserRole) => {
    setUser((prev) => ({
      ...prev,
      role: newRole,
      name:
        newRole === 'admin'
          ? 'Heritage Curator Admin'
          : newRole === 'guest'
          ? 'Guest Explorer'
          : prev.name,
      email:
        newRole === 'admin'
          ? 'curator@nostalgichub.org'
          : newRole === 'guest'
          ? 'guest@nostalgichub.org'
          : prev.email
    }));
  };

  // -------------------------------------------------------------
  // Authentication & Session Tracking
  // -------------------------------------------------------------
  const login = (userData: Partial<UserProfile>) => {
    const updatedUser: UserProfile = {
      ...DEFAULT_USER,
      ...userData,
      isOnline: true
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    triggerConfetti();

    // Register active session for Admin Tracking
    registerActiveSession(updatedUser).then((newSess) => {
      setActiveUserSessions((prev) => [newSess, ...prev.filter((s) => s.userId !== updatedUser.id)]);
    });

    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: `Welcome back, ${updatedUser.name}!`,
        message: 'Successfully logged in to Nostalgic Hub Living Museum.',
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const logout = () => {
    if (user.id) {
      const existing = activeUserSessions.find((s) => s.userId === user.id);
      if (existing) terminateActiveSession(existing.id);
      setActiveUserSessions((prev) => prev.filter((s) => s.userId !== user.id));
    }
    setIsLoggedIn(false);
    setUser({
      ...DEFAULT_USER,
      id: 'guest-user',
      name: 'Guest Visitor',
      email: 'guest@nostalgichub.org',
      role: 'guest',
      isOnline: false
    });
  };

  // -------------------------------------------------------------
  // Child Safety & Age Verification
  // -------------------------------------------------------------
  const toggleChildSafetyMode = () => {
    setUser((prev) => {
      const newMode = !prev.childSafetyMode;
      setNotifications((n) => [
        {
          id: `notif-${Date.now()}`,
          title: newMode ? '🛡️ Child Safety Protection Active' : '🔓 Child Safety Filter Disabled',
          message: newMode
            ? 'Meets and game sessions are strictly restricted to your verified saved contacts.'
            : 'You can now explore open stranger lobbies (Age Verification required for matches).',
          timestamp: 'Just now',
          read: false
        },
        ...n
      ]);
      return { ...prev, childSafetyMode: newMode };
    });
  };

  const verifyAge = (age: number, method: string) => {
    const isOver18 = age >= 18;
    setUser((prev) => ({
      ...prev,
      age,
      isMinor: !isOver18,
      ageVerified: true,
      verificationMethod: method,
      childSafetyMode: !isOver18
    }));
    setIsAgeVerifyModalOpen(false);
    triggerConfetti();
    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: isOver18 ? '✅ Age Verified (18+ Adult)' : '🛡️ Minor Protection Profile Configured',
        message: isOver18
          ? `Verified via ${method}. You can now join open stranger matches and organize public revival tournaments.`
          : `Profile set to Minor (Age ${age}). Child Safety mode locked to saved contacts only for personal protection.`,
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const addNewContact = async (contactData: Omit<UserContact, 'id' | 'addedAt'>) => {
    const created = await addUserContact(user.id, contactData);
    setContacts((prev) => [created, ...prev]);
    setUser((prev) => ({ ...prev, savedContacts: [created, ...prev.savedContacts] }));
    setIsAddContactModalOpen(false);
    triggerConfetti();
    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Trusted Contact Added',
        message: `${created.name} (${created.relationship}) added to your Safe Meet Circle.`,
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const removeContact = async (contactId: string) => {
    await deleteUserContact(user.id, contactId);
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    setUser((prev) => ({ ...prev, savedContacts: prev.savedContacts.filter((c) => c.id !== contactId) }));
  };

  // -------------------------------------------------------------
  // Dynamic Picture & Asset Management (Admin)
  // -------------------------------------------------------------
  const updateEntityPicture = async (
    entityType: 'game' | 'craft' | 'food' | 'banner',
    entityId: string,
    newImageUrl: string,
    newCoverImage?: string
  ) => {
    if (entityType === 'game') {
      await updateGameMedia(entityId, newImageUrl, newCoverImage);
      setGames((prev) =>
        prev.map((g) =>
          g.id === entityId
            ? { ...g, imageUrl: newImageUrl, coverImage: newCoverImage || g.coverImage }
            : g
        )
      );
    } else if (entityType === 'craft') {
      await updateCraftMedia(entityId, newImageUrl);
      setCrafts((prev) =>
        prev.map((c) => (c.id === entityId ? { ...c, imageUrl: newImageUrl } : c))
      );
    } else if (entityType === 'food') {
      await updateFoodMedia(entityId, newImageUrl);
      setFoodStories((prev) =>
        prev.map((f) => (f.id === entityId ? { ...f, imageUrl: newImageUrl } : f))
      );
    }

    // Update site media gallery
    const mediaMatch = siteMedia.find((m) => m.entityId === entityId);
    if (mediaMatch) {
      const updatedMediaList = await updateSiteMediaItem(mediaMatch.id, newImageUrl, user.name);
      setSiteMedia(updatedMediaList);
    }

    triggerConfetti();
    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: '🎨 Picture Updated Live in Database',
        message: `Updated image asset for ${entityType.toUpperCase()} ID: ${entityId}`,
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const uploadAndApplyPicture = async (
    entityType: 'game' | 'craft' | 'food' | 'banner',
    entityId: string,
    file: File,
    isCover: boolean = false
  ): Promise<string> => {
    const uploadedUrl = await uploadImageFile(file, entityType);
    if (isCover && entityType === 'game') {
      const g = games.find((item) => item.id === entityId);
      await updateEntityPicture('game', entityId, g?.imageUrl || uploadedUrl, uploadedUrl);
    } else {
      await updateEntityPicture(entityType, entityId, uploadedUrl);
    }
    return uploadedUrl;
  };

  // -------------------------------------------------------------
  // XP & Gamification
  // -------------------------------------------------------------
  const addXP = (amount: number, reason?: string) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        triggerConfetti();
        setNotifications((n) => [
          {
            id: `notif-${Date.now()}`,
            title: `🎉 Level Up! You reached Level ${newLevel}`,
            message: `You are now a seasoned Cultural Archivist! +${amount} XP (${reason || 'Heritage Action'})`,
            timestamp: 'Just now',
            read: false
          },
          ...n
        ]);
      } else {
        setNotifications((n) => [
          {
            id: `notif-${Date.now()}`,
            title: `+${amount} Heritage XP Earned`,
            message: reason || 'Heritage Exploration Action',
            timestamp: 'Just now',
            read: false
          },
          ...n
        ]);
      }

      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const toggleSaveGame = (gameId: string) => {
    setUser((prev) => {
      const exists = prev.savedGameIds.includes(gameId);
      const updated = exists ? prev.savedGameIds.filter((id) => id !== gameId) : [...prev.savedGameIds, gameId];
      if (!exists) addXP(25, 'Saved game to personal archive');
      return { ...prev, savedGameIds: updated };
    });
  };

  const toggleSaveCraft = (craftId: string) => {
    setUser((prev) => {
      const exists = prev.savedCraftIds.includes(craftId);
      const updated = exists ? prev.savedCraftIds.filter((id) => id !== craftId) : [...prev.savedCraftIds, craftId];
      if (!exists) addXP(25, 'Saved traditional craft to collection');
      return { ...prev, savedCraftIds: updated };
    });
  };

  const toggleSaveFood = (foodId: string) => {
    setUser((prev) => {
      const exists = prev.savedFoodIds.includes(foodId);
      const updated = exists ? prev.savedFoodIds.filter((id) => id !== foodId) : [...prev.savedFoodIds, foodId];
      if (!exists) addXP(25, 'Saved ancestral recipe to culinary diary');
      return { ...prev, savedFoodIds: updated };
    });
  };

  // -------------------------------------------------------------
  // Meets & Sessions (Child Safety Logic + Strangers Age Verification)
  // -------------------------------------------------------------
  const createSession = (
    sessionData: Omit<GameSession, 'id' | 'hostId' | 'hostName' | 'hostAvatar' | 'currentPlayers' | 'participants' | 'status' | 'messages'>
  ) => {
    const newSession: GameSession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      hostId: user.id,
      hostName: user.name,
      hostAvatar: user.avatarUrl,
      currentPlayers: 1,
      participants: [{ id: user.id, name: user.name, avatar: user.avatarUrl, team: 'A', isContact: true }],
      status: 'open',
      messages: [
        {
          id: `m-${Date.now()}`,
          senderId: user.id,
          senderName: user.name,
          text: `Session created: ${sessionData.notes || 'Looking forward to playing!'}`,
          timestamp: 'Just now'
        }
      ]
    };

    createSessionDB(newSession);
    setSessions((prev) => [newSession, ...prev]);
    setUser((prev) => ({ ...prev, joinedSessionIds: [...prev.joinedSessionIds, newSession.id] }));
    addXP(100, 'Hosted a community game revival session');
    triggerConfetti();
  };

  const joinSession = (sessionId: string): { success: boolean; reason?: string } => {
    const targetSession = sessions.find((s) => s.id === sessionId);
    if (!targetSession) return { success: false, reason: 'Session not found' };

    // 1. Child Safety Rule: If in contacts_only mode, check if host or participant is a saved contact
    if (targetSession.joinMode === 'contacts_only') {
      const isHostContact = contacts.some(
        (c) =>
          c.name.toLowerCase().includes(targetSession.hostName.toLowerCase()) ||
          targetSession.hostName.toLowerCase().includes(c.name.toLowerCase())
      );
      const isHostSelf = targetSession.hostId === user.id;

      if (!isHostContact && !isHostSelf && user.childSafetyMode) {
        return {
          success: false,
          reason: 'Child Safety Mode is active. This session is restricted to verified saved contacts only. Add the host to your Safe Contacts list in Profile to join.'
        };
      }
    }

    // 2. Stranger Mode Rule: If open_strangers mode, must be age verified
    if (targetSession.joinMode === 'open_strangers' && !user.ageVerified) {
      setIsAgeVerifyModalOpen(true);
      return {
        success: false,
        reason: 'Age Verification is required to join open stranger matches. Please complete the quick verification prompt.'
      };
    }

    if (targetSession.joinMode === 'open_strangers' && user.isMinor && user.age < 18) {
      return {
        success: false,
        reason: 'Stranger matches are restricted to Age-Verified players (18+). You can join or host "Contacts Only" meets safely!'
      };
    }

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId && !s.participants.some((p) => p.id === user.id)) {
          return {
            ...s,
            currentPlayers: s.currentPlayers + 1,
            participants: [
              ...s.participants,
              {
                id: user.id,
                name: user.name,
                avatar: user.avatarUrl,
                team: s.participants.length % 2 === 0 ? 'A' : 'B',
                isContact: contacts.some((c) => c.name.includes(s.hostName))
              }
            ]
          };
        }
        return s;
      })
    );

    setUser((prev) => {
      if (!prev.joinedSessionIds.includes(sessionId)) {
        return { ...prev, joinedSessionIds: [...prev.joinedSessionIds, sessionId] };
      }
      return prev;
    });

    addXP(50, 'Joined a neighborhood game session');
    return { success: true };
  };

  const leaveSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            currentPlayers: Math.max(1, s.currentPlayers - 1),
            participants: s.participants.filter((p) => p.id !== user.id)
          };
        }
        return s;
      })
    );
    setUser((prev) => ({ ...prev, joinedSessionIds: prev.joinedSessionIds.filter((id) => id !== sessionId) }));
  };

  const sendSessionMessage = (sessionId: string, text: string) => {
    if (!text.trim()) return;
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            messages: [
              ...s.messages,
              { id: `msg-${Date.now()}`, senderId: user.id, senderName: user.name, text, timestamp: 'Just now' }
            ]
          };
        }
        return s;
      })
    );
  };

  // -------------------------------------------------------------
  // Artisan & Waitlist
  // -------------------------------------------------------------
  const addProduct = (
    productData: Omit<ArtisanProduct, 'id' | 'artisanId' | 'artisanName' | 'artisanAvatar' | 'verificationStatus' | 'rating' | 'reviewsCount' | 'commissionRate'>
  ) => {
    const newProduct: ArtisanProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      artisanId: user.id,
      artisanName: user.name,
      artisanAvatar: user.avatarUrl,
      verificationStatus: 'pending',
      commissionRate: analytics.currentCommissionPercentage,
      rating: 5.0,
      reviewsCount: 0
    };
    setProducts((prev) => [newProduct, ...prev]);
    setAnalytics((prev) => ({ ...prev, pendingApprovalsCount: prev.pendingApprovalsCount + 1 }));
  };

  const submitInquiry = (inquiryData: Omit<OrderInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInquiry: OrderInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: 'Just now',
      status: 'pending'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    setAnalytics((prev) => ({ ...prev, totalMarketplaceInquiries: prev.totalMarketplaceInquiries + 1 }));
    addXP(40, 'Connected with an indigenous artisan');
    triggerConfetti();
  };

  const joinArtisanWaitlist = async (
    entryData: Omit<ArtisanWaitlistEntry, 'id' | 'submittedAt' | 'status'>
  ) => {
    const created = await submitArtisanWaitlist(entryData);
    setArtisanWaitlist((prev) => [created, ...prev]);
    addXP(100, 'Registered on Artisan Guild Waitlist');
    triggerConfetti();
    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Artisan Application Received',
        message: `Thank you, ${entryData.artisanName}! Your guild application is queued for heritage curator review.`,
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const updateWaitlistStatus = async (id: string, status: ArtisanWaitlistEntry['status']) => {
    await updateWaitlistStatusDB(id, status);
    setArtisanWaitlist((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
  };

  // -------------------------------------------------------------
  // Community Preservation
  // -------------------------------------------------------------
  const submitCommunityMemory = (
    memoryData: Omit<CommunityPreserveItem, 'id' | 'submittedBy' | 'submittedAt' | 'status' | 'upvotes'>
  ) => {
    const newSub: CommunityPreserveItem = {
      ...memoryData,
      id: `sub-${Date.now()}`,
      submittedBy: user.name,
      submittedAt: 'Just now',
      status: 'pending',
      upvotes: 1
    };
    setSubmissions((prev) => [newSub, ...prev]);
    setAnalytics((prev) => ({ ...prev, pendingApprovalsCount: prev.pendingApprovalsCount + 1 }));
    addXP(120, 'Submitted community cultural memory');
    triggerConfetti();
  };

  const upvoteSubmission = (id: string) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s)));
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
    setSavedProjects((prev) => [newSaved, ...prev]);
    setUser((prev) => ({ ...prev, savedProjectIds: [...prev.savedProjectIds, newSaved.id] }));
    addXP(idea.xpReward || 150, `Created AI project: ${idea.title}`);
    triggerConfetti();
  };

  // -------------------------------------------------------------
  // Admin Approvals & Session Moderation
  // -------------------------------------------------------------
  const approveProduct = (productId: string) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, verificationStatus: 'approved' } : p)));
    setAnalytics((prev) => ({
      ...prev,
      pendingApprovalsCount: Math.max(0, prev.pendingApprovalsCount - 1),
      verifiedArtisansCount: prev.verifiedArtisansCount + 1
    }));
  };

  const rejectProduct = (productId: string) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, verificationStatus: 'rejected' } : p)));
    setAnalytics((prev) => ({ ...prev, pendingApprovalsCount: Math.max(0, prev.pendingApprovalsCount - 1) }));
  };

  const updateSubmissionStatus = (submissionId: string, status: CommunityPreserveItem['status']) => {
    setSubmissions((prev) => prev.map((s) => (s.id === submissionId ? { ...s, status } : s)));
    if (status === 'approved' || status === 'implemented') {
      setAnalytics((prev) => ({ ...prev, preservedCulturalItemsCount: prev.preservedCulturalItemsCount + 1 }));
    }
  };

  const updateCommissionRate = (newRate: number) => {
    setAnalytics((prev) => ({ ...prev, currentCommissionPercentage: newRate }));
    setProducts((prev) => prev.map((p) => ({ ...p, commissionRate: newRate })));
  };

  const terminateUserSession = async (sessionId: string) => {
    await terminateActiveSession(sessionId);
    setActiveUserSessions((prev) => prev.filter((s) => s.id !== sessionId));
    setNotifications((n) => [
      {
        id: `notif-${Date.now()}`,
        title: 'User Session Revoked',
        message: `Admin terminated session ${sessionId}.`,
        timestamp: 'Just now',
        read: false
      },
      ...n
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        role: user.role,
        setRole,
        isLoggedIn,
        login,
        logout,
        language,
        setLanguage,
        t,
        childSafetyMode: user.childSafetyMode,
        toggleChildSafetyMode,
        verifyAge,
        contacts,
        addNewContact,
        removeContact,
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
        siteMedia,
        activeUserSessions,
        artisanWaitlist,
        updateEntityPicture,
        uploadAndApplyPicture,
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
        joinArtisanWaitlist,
        updateWaitlistStatus,
        submitCommunityMemory,
        upvoteSubmission,
        saveAIProject,
        approveProduct,
        rejectProduct,
        updateSubmissionStatus,
        updateCommissionRate,
        terminateUserSession,
        isSearchOpen,
        setIsSearchOpen,
        isPreserveModalOpen,
        setIsPreserveModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAgeVerifyModalOpen,
        setIsAgeVerifyModalOpen,
        isAddContactModalOpen,
        setIsAddContactModalOpen,
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
