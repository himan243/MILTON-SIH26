import { supabase } from './supabase';
import {
  TraditionalGame,
  TraditionalCraft,
  ArtisanProduct,
  FoodStory,
  GameSession,
  UserProfile,
  UserContact,
  ActiveUserSession,
  SiteMediaItem,
  ArtisanWaitlistEntry,
  CommunityPreserveItem
} from '@/types';
import {
  INITIAL_GAMES,
  INITIAL_CRAFTS,
  INITIAL_PRODUCTS,
  INITIAL_FOOD_STORIES,
  INITIAL_SESSIONS,
  INITIAL_CONTACTS,
  INITIAL_ACTIVE_SESSIONS,
  INITIAL_SITE_MEDIA,
  INITIAL_ARTISAN_WAITLIST,
  INITIAL_COMMUNITY_SUBMISSIONS
} from '@/data/mockData';

// Local storage keys for caching and optimistic sync
const KEYS = {
  GAMES: 'nost_db_games',
  CRAFTS: 'nost_db_crafts',
  FOODS: 'nost_db_foods',
  PRODUCTS: 'nost_db_products',
  SESSIONS: 'nost_db_sessions',
  CONTACTS: 'nost_db_contacts',
  ACTIVE_SESSIONS: 'nost_db_active_sessions',
  MEDIA: 'nost_db_site_media',
  WAITLIST: 'nost_db_artisan_waitlist',
  SUBMISSIONS: 'nost_db_submissions',
  SYSTEM_CONFIG: 'nost_db_system_config'
};

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`LocalStorage write error for ${key}`, e);
  }
}

// -------------------------------------------------------------
// 0. File Upload Service (.png, .jpg, .jpeg, .webp)
// -------------------------------------------------------------
export async function uploadImageFile(file: File, pathPrefix: string = 'media'): Promise<string> {
  // 1. Try uploading to Supabase Storage bucket
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${pathPrefix}/${Date.now()}_${cleanName}`;
    const { data, error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });
    if (data && !error) {
      const { data: pubData } = supabase.storage.from('media').getPublicUrl(fileName);
      if (pubData?.publicUrl) return pubData.publicUrl;
    }
  } catch (err) {
    console.warn('Supabase storage upload fallback to data URL:', err);
  }

  // 2. Base64 Data URL fallback (instant .png / .jpg persistence in database)
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

// -------------------------------------------------------------
// 1. Traditional Games & Picture Management
// -------------------------------------------------------------
export async function fetchGames(): Promise<TraditionalGame[]> {
  try {
    const { data, error } = await supabase.from('traditional_games').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: TraditionalGame[] = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        vernacularNames: d.vernacular_names || {},
        region: d.region,
        tagline: d.tagline,
        story: d.story,
        historicalEra: d.historical_era,
        playersCount: d.players_count,
        difficultyLevel: d.difficulty_level,
        equipmentNeeded: d.equipment_needed || [],
        playingArea: d.playing_area,
        howToPlay: d.how_to_play || [],
        rules: d.rules || [],
        skillsDeveloped: d.skills_developed || [],
        imageUrl: d.image_url,
        coverImage: d.cover_image,
        activePlayersNearbyCount: d.active_players_nearby_count || 12,
        featured: d.featured || false
      }));
      setLocal(KEYS.GAMES, mapped);
      return mapped;
    }
  } catch (e) {
    // offline fallback
  }
  return getLocal(KEYS.GAMES, INITIAL_GAMES);
}

export async function updateGameMedia(
  gameId: string,
  newImageUrl: string,
  newCoverImage?: string
): Promise<void> {
  // 1. Update Supabase
  try {
    const updatePayload: any = {
      image_url: newImageUrl,
      updated_at: new Date().toISOString()
    };
    if (newCoverImage) updatePayload.cover_image = newCoverImage;
    await supabase.from('traditional_games').update(updatePayload).eq('id', gameId);
  } catch (e) {
    console.warn('Supabase game media update:', e);
  }

  // 2. Update local state
  const current = getLocal<TraditionalGame[]>(KEYS.GAMES, INITIAL_GAMES);
  const updated = current.map((g) =>
    g.id === gameId
      ? { ...g, imageUrl: newImageUrl, coverImage: newCoverImage || g.coverImage }
      : g
  );
  setLocal(KEYS.GAMES, updated);
}

// -------------------------------------------------------------
// 2. Traditional Crafts & Picture Management
// -------------------------------------------------------------
export async function fetchCrafts(): Promise<TraditionalCraft[]> {
  try {
    const { data, error } = await supabase.from('traditional_crafts').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: TraditionalCraft[] = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        indigenousName: d.indigenous_name,
        category: d.category,
        region: d.region,
        state: d.state,
        culturalSignificance: d.cultural_significance,
        materialsUsed: d.materials_used || [],
        traditionalCraftingMethod: d.traditional_crafting_method || [],
        preservationStatus: d.preservation_status || 'Thriving',
        imageUrl: d.image_url,
        artisanCountInRegion: d.artisan_count_in_region || 20,
        marketplaceListingIds: d.marketplace_listing_ids || [],
        featured: d.featured || false
      }));
      setLocal(KEYS.CRAFTS, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.CRAFTS, INITIAL_CRAFTS);
}

export async function updateCraftMedia(craftId: string, newImageUrl: string): Promise<void> {
  try {
    await supabase.from('traditional_crafts').update({ image_url: newImageUrl }).eq('id', craftId);
  } catch (e) {}
  const current = getLocal<TraditionalCraft[]>(KEYS.CRAFTS, INITIAL_CRAFTS);
  const updated = current.map((c) => (c.id === craftId ? { ...c, imageUrl: newImageUrl } : c));
  setLocal(KEYS.CRAFTS, updated);
}

// -------------------------------------------------------------
// 3. Food Stories & Picture Management
// -------------------------------------------------------------
export async function fetchFoodStories(): Promise<FoodStory[]> {
  try {
    const { data, error } = await supabase.from('food_stories').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: FoodStory[] = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        indigenousName: d.indigenous_name,
        region: d.region,
        state: d.state,
        story: d.story,
        culturalOccasions: d.cultural_occasions || [],
        flavorProfile: d.flavor_profile || [],
        ingredients: d.ingredients || [],
        preparationSteps: d.preparation_steps || [],
        healthAndWisdom: d.health_and_wisdom,
        imageUrl: d.image_url,
        featured: d.featured || false
      }));
      setLocal(KEYS.FOODS, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.FOODS, INITIAL_FOOD_STORIES);
}

export async function updateFoodMedia(foodId: string, newImageUrl: string): Promise<void> {
  try {
    await supabase.from('food_stories').update({ image_url: newImageUrl }).eq('id', foodId);
  } catch (e) {}
  const current = getLocal<FoodStory[]>(KEYS.FOODS, INITIAL_FOOD_STORIES);
  const updated = current.map((f) => (f.id === foodId ? { ...f, imageUrl: newImageUrl } : f));
  setLocal(KEYS.FOODS, updated);
}

// -------------------------------------------------------------
// 4. Site Media Gallery (Unified Admin Picture Controller)
// -------------------------------------------------------------
export async function fetchSiteMedia(): Promise<SiteMediaItem[]> {
  try {
    const { data, error } = await supabase.from('site_media_gallery').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: SiteMediaItem[] = data.map((d: any) => ({
        id: d.id,
        entityType: d.entity_type,
        entityId: d.entity_id,
        title: d.title,
        imageUrl: d.image_url,
        altText: d.alt_text,
        placement: d.placement,
        updatedAt: d.updated_at,
        updatedBy: d.updated_by
      }));
      setLocal(KEYS.MEDIA, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.MEDIA, INITIAL_SITE_MEDIA);
}

export async function updateSiteMediaItem(
  mediaId: string,
  newImageUrl: string,
  updatedBy: string = 'Admin Curator'
): Promise<SiteMediaItem[]> {
  const current = getLocal<SiteMediaItem[]>(KEYS.MEDIA, INITIAL_SITE_MEDIA);
  const target = current.find((m) => m.id === mediaId);

  if (target) {
    // If it maps to a game, craft, or food, update that table too
    if (target.entityType === 'game') {
      await updateGameMedia(target.entityId, newImageUrl);
    } else if (target.entityType === 'craft') {
      await updateCraftMedia(target.entityId, newImageUrl);
    } else if (target.entityType === 'food') {
      await updateFoodMedia(target.entityId, newImageUrl);
    }
  }

  try {
    await supabase
      .from('site_media_gallery')
      .update({
        image_url: newImageUrl,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy
      })
      .eq('id', mediaId);
  } catch (e) {}

  const updated = current.map((m) =>
    m.id === mediaId
      ? { ...m, imageUrl: newImageUrl, updatedAt: 'Just now', updatedBy }
      : m
  );
  setLocal(KEYS.MEDIA, updated);
  return updated;
}

// -------------------------------------------------------------
// 5. User Contacts (For Child Safety Meets with Saved Contacts)
// -------------------------------------------------------------
export async function fetchUserContacts(userId: string): Promise<UserContact[]> {
  try {
    const { data, error } = await supabase.from('user_contacts').select('*').eq('user_id', userId);
    if (data && data.length > 0 && !error) {
      const mapped: UserContact[] = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        phone: d.phone,
        email: d.email,
        relationship: d.relationship,
        isVerified: d.is_verified,
        safetyTier: d.safety_tier,
        avatarUrl: d.avatar_url,
        addedAt: d.added_at
      }));
      setLocal(`${KEYS.CONTACTS}_${userId}`, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(`${KEYS.CONTACTS}_${userId}`, INITIAL_CONTACTS);
}

export async function addUserContact(
  userId: string,
  contact: Omit<UserContact, 'id' | 'addedAt'>
): Promise<UserContact> {
  const newContact: UserContact = {
    ...contact,
    id: `cont-${Date.now()}`,
    addedAt: 'Just now'
  };

  try {
    await supabase.from('user_contacts').insert({
      id: newContact.id,
      user_id: userId,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      relationship: newContact.relationship,
      is_verified: newContact.isVerified,
      safety_tier: newContact.safetyTier,
      avatar_url: newContact.avatarUrl
    });
  } catch (e) {}

  const current = getLocal<UserContact[]>(`${KEYS.CONTACTS}_${userId}`, INITIAL_CONTACTS);
  const updated = [newContact, ...current];
  setLocal(`${KEYS.CONTACTS}_${userId}`, updated);
  return newContact;
}

export async function deleteUserContact(userId: string, contactId: string): Promise<void> {
  try {
    await supabase.from('user_contacts').delete().eq('id', contactId);
  } catch (e) {}
  const current = getLocal<UserContact[]>(`${KEYS.CONTACTS}_${userId}`, INITIAL_CONTACTS);
  const updated = current.filter((c) => c.id !== contactId);
  setLocal(`${KEYS.CONTACTS}_${userId}`, updated);
}

// -------------------------------------------------------------
// 6. Game Sessions / Meets (Child Safety & Age-Verified Strangers)
// -------------------------------------------------------------
export async function fetchSessions(): Promise<GameSession[]> {
  try {
    const { data, error } = await supabase.from('game_sessions').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: GameSession[] = data.map((d: any) => ({
        id: d.id,
        gameId: d.game_id,
        gameTitle: d.game_title,
        hostId: d.host_id,
        hostName: d.host_name,
        hostAvatar: d.host_avatar,
        date: d.date,
        time: d.time,
        locality: d.locality,
        state: d.state,
        privacyMode: d.privacy_mode,
        joinMode: d.join_mode || 'contacts_only',
        minAgeRequired: d.min_age_required || 0,
        childSafe: d.child_safe ?? true,
        maxPlayers: d.max_players,
        currentPlayers: d.current_players,
        participants: d.participants || [],
        notes: d.notes,
        status: d.status,
        messages: d.messages || []
      }));
      setLocal(KEYS.SESSIONS, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.SESSIONS, INITIAL_SESSIONS);
}

export async function createSessionDB(session: GameSession): Promise<void> {
  try {
    await supabase.from('game_sessions').insert({
      id: session.id,
      game_id: session.gameId,
      game_title: session.gameTitle,
      host_id: session.hostId,
      host_name: session.hostName,
      host_avatar: session.hostAvatar,
      date: session.date,
      time: session.time,
      locality: session.locality,
      state: session.state,
      privacy_mode: session.privacyMode,
      join_mode: session.joinMode,
      min_age_required: session.minAgeRequired,
      child_safe: session.childSafe,
      max_players: session.maxPlayers,
      current_players: session.currentPlayers,
      participants: session.participants,
      notes: session.notes,
      status: session.status,
      messages: session.messages
    });
  } catch (e) {}
  const current = getLocal<GameSession[]>(KEYS.SESSIONS, INITIAL_SESSIONS);
  setLocal(KEYS.SESSIONS, [session, ...current]);
}

// -------------------------------------------------------------
// 7. Active User Sessions (Admin Real-Time Tracker)
// -------------------------------------------------------------
export async function fetchActiveUserSessions(): Promise<ActiveUserSession[]> {
  try {
    const { data, error } = await supabase.from('active_user_sessions').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: ActiveUserSession[] = data.map((d: any) => ({
        id: d.id,
        userId: d.user_id,
        userName: d.user_name,
        userEmail: d.user_email,
        userAvatar: d.user_avatar,
        role: d.role,
        ipAddress: d.ip_address,
        deviceInfo: d.device_info,
        location: d.location,
        loginAt: d.login_at,
        lastActiveAt: d.last_active_at,
        isOnline: d.is_online,
        ageVerified: d.age_verified,
        childSafetyMode: d.child_safety_mode
      }));
      setLocal(KEYS.ACTIVE_SESSIONS, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.ACTIVE_SESSIONS, INITIAL_ACTIVE_SESSIONS);
}

export async function registerActiveSession(user: UserProfile): Promise<ActiveUserSession> {
  const newSession: ActiveUserSession = {
    id: `sess-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userAvatar: user.avatarUrl,
    role: user.role,
    ipAddress: '103.28.12.84 (Guwahati Client)',
    deviceInfo: 'Desktop Web Client',
    location: user.region,
    loginAt: 'Just now',
    lastActiveAt: 'Active Just now',
    isOnline: true,
    ageVerified: user.ageVerified,
    childSafetyMode: user.childSafetyMode
  };

  try {
    await supabase.from('active_user_sessions').insert({
      id: newSession.id,
      user_id: newSession.userId,
      user_name: newSession.userName,
      user_email: newSession.userEmail,
      user_avatar: newSession.userAvatar,
      role: newSession.role,
      ip_address: newSession.ipAddress,
      device_info: newSession.deviceInfo,
      location: newSession.location,
      is_online: true,
      age_verified: newSession.ageVerified,
      child_safety_mode: newSession.childSafetyMode
    });
  } catch (e) {}

  const current = getLocal<ActiveUserSession[]>(KEYS.ACTIVE_SESSIONS, INITIAL_ACTIVE_SESSIONS);
  const updated = [newSession, ...current.filter((s) => s.userId !== user.id)];
  setLocal(KEYS.ACTIVE_SESSIONS, updated);
  return newSession;
}

export async function terminateActiveSession(sessionId: string): Promise<void> {
  try {
    await supabase.from('active_user_sessions').delete().eq('id', sessionId);
  } catch (e) {}
  const current = getLocal<ActiveUserSession[]>(KEYS.ACTIVE_SESSIONS, INITIAL_ACTIVE_SESSIONS);
  const updated = current.filter((s) => s.id !== sessionId);
  setLocal(KEYS.ACTIVE_SESSIONS, updated);
}

// -------------------------------------------------------------
// 8. Artisan Waitlist (For Coming Soon Page)
// -------------------------------------------------------------
export async function fetchArtisanWaitlist(): Promise<ArtisanWaitlistEntry[]> {
  try {
    const { data, error } = await supabase.from('artisan_waitlist').select('*');
    if (data && data.length > 0 && !error) {
      const mapped: ArtisanWaitlistEntry[] = data.map((d: any) => ({
        id: d.id,
        artisanName: d.artisan_name,
        craftCategory: d.craft_category,
        location: d.location,
        phone: d.phone,
        email: d.email,
        experienceYears: d.experience_years,
        message: d.message,
        submittedAt: d.submitted_at,
        status: d.status
      }));
      setLocal(KEYS.WAITLIST, mapped);
      return mapped;
    }
  } catch (e) {}
  return getLocal(KEYS.WAITLIST, INITIAL_ARTISAN_WAITLIST);
}

export async function submitArtisanWaitlist(
  entry: Omit<ArtisanWaitlistEntry, 'id' | 'submittedAt' | 'status'>
): Promise<ArtisanWaitlistEntry> {
  const newEntry: ArtisanWaitlistEntry = {
    ...entry,
    id: `wait-${Date.now()}`,
    submittedAt: 'Just now',
    status: 'pending'
  };

  try {
    await supabase.from('artisan_waitlist').insert({
      id: newEntry.id,
      artisan_name: newEntry.artisanName,
      craft_category: newEntry.craftCategory,
      location: newEntry.location,
      phone: newEntry.phone,
      email: newEntry.email,
      experience_years: newEntry.experienceYears,
      message: newEntry.message,
      status: 'pending'
    });
  } catch (e) {}

  const current = getLocal<ArtisanWaitlistEntry[]>(KEYS.WAITLIST, INITIAL_ARTISAN_WAITLIST);
  const updated = [newEntry, ...current];
  setLocal(KEYS.WAITLIST, updated);
  return newEntry;
}

export async function updateWaitlistStatus(
  id: string,
  status: ArtisanWaitlistEntry['status']
): Promise<void> {
  try {
    await supabase.from('artisan_waitlist').update({ status }).eq('id', id);
  } catch (e) {}
  const current = getLocal<ArtisanWaitlistEntry[]>(KEYS.WAITLIST, INITIAL_ARTISAN_WAITLIST);
  const updated = current.map((w) => (w.id === id ? { ...w, status } : w));
  setLocal(KEYS.WAITLIST, updated);
}
