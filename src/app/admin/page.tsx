'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Shield,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Package,
  Users,
  Gamepad2,
  DollarSign,
  Sparkles,
  BookOpen,
  Settings,
  Image,
  UserCheck,
  UserX,
  LogOut,
  Radio,
  Lock,
  Database,
  ExternalLink,
  Hammer,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Edit,
  Eye,
  Upload,
  FileImage,
  FolderUp,
  RefreshCw,
  FileCheck,
  Trash2,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';

export default function CuratorAdminPage() {
  const {
    games,
    crafts,
    foodStories,
    siteMedia,
    updateEntityPicture,
    uploadAndApplyPicture,
    activeUserSessions,
    terminateUserSession,
    artisanWaitlist,
    updateWaitlistStatus,
    submissions,
    updateSubmissionStatus,
    analytics,
    updateCommissionRate,
    role,
    setRole,
    triggerConfetti
  } = useApp();

  const [activeTab, setActiveTab] = useState<'media' | 'users' | 'waitlist' | 'submissions' | 'config'>('media');
  
  // Picture Changer State
  const [selectedMediaType, setSelectedMediaType] = useState<'game' | 'craft' | 'food' | 'banner'>('game');
  const [selectedEntityId, setSelectedEntityId] = useState<string>(games[0]?.id || '');
  const [newImageUrl, setNewImageUrl] = useState<string>(games[0]?.imageUrl || '');
  const [newCoverImageUrl, setNewCoverImageUrl] = useState<string>(games[0]?.coverImage || '');
  
  // File Upload State (.png, .jpg, .jpeg, .webp)
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [coverFilePreview, setCoverFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCoverDragging, setIsCoverDragging] = useState(false);
  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Commission Config
  const [commissionInput, setCommissionInput] = useState(analytics.currentCommissionPercentage);

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending' || s.status === 'under-review');
  const pendingWaitlist = artisanWaitlist.filter((w) => w.status === 'pending');

  const handleMediaSelect = (type: 'game' | 'craft' | 'food' | 'banner', id: string) => {
    setSelectedMediaType(type);
    setSelectedEntityId(id);
    setSelectedFile(null);
    setSelectedCoverFile(null);
    setFilePreview(null);
    setCoverFilePreview(null);
    setUploadSuccessMessage(null);

    if (type === 'game') {
      const g = games.find((item) => item.id === id);
      if (g) {
        setNewImageUrl(g.imageUrl);
        setNewCoverImageUrl(g.coverImage || '');
      }
    } else if (type === 'craft') {
      const c = crafts.find((item) => item.id === id);
      if (c) setNewImageUrl(c.imageUrl);
    } else if (type === 'food') {
      const f = foodStories.find((item) => item.id === id);
      if (f) setNewImageUrl(f.imageUrl);
    } else if (type === 'banner') {
      const b = siteMedia.find((item) => item.entityId === id);
      if (b) setNewImageUrl(b.imageUrl);
    }
  };

  const handleFileSelection = (file: File, isCover: boolean = false) => {
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)/)) {
      alert('Please upload a valid image format (.png, .jpg, .jpeg, or .webp).');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    if (isCover) {
      setSelectedCoverFile(file);
      setCoverFilePreview(previewUrl);
    } else {
      setSelectedFile(file);
      setFilePreview(previewUrl);
      setNewImageUrl(previewUrl);
    }
    setUploadSuccessMessage(null);
  };

  const handleDrop = (e: React.DragEvent, isCover: boolean = false) => {
    e.preventDefault();
    if (isCover) setIsCoverDragging(false);
    else setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0], isCover);
    }
  };

  const handleSavePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPic(true);
    setUploadSuccessMessage(null);

    try {
      if (uploadMode === 'file' && selectedFile) {
        // Direct .png / .jpg file upload to Supabase DB
        const uploadedUrl = await uploadAndApplyPicture(
          selectedMediaType,
          selectedEntityId,
          selectedFile,
          false
        );

        if (selectedMediaType === 'game' && selectedCoverFile) {
          await uploadAndApplyPicture(
            'game',
            selectedEntityId,
            selectedCoverFile,
            true
          );
        }

        setUploadSuccessMessage(`Successfully uploaded "${selectedFile.name}" and synchronized with Supabase database!`);
      } else if (newImageUrl.trim()) {
        // Link mode update
        await updateEntityPicture(
          selectedMediaType,
          selectedEntityId,
          newImageUrl,
          selectedMediaType === 'game' ? newCoverImageUrl : undefined
        );
        setUploadSuccessMessage('Successfully updated picture in Supabase database!');
      }

      triggerConfetti();
      setSelectedFile(null);
      setSelectedCoverFile(null);
    } catch (err: any) {
      alert('Error updating database picture: ' + (err.message || 'Unknown error'));
    } finally {
      setIsUpdatingPic(false);
    }
  };

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionRate(commissionInput);
    triggerConfetti();
  };

  // Find currently active item
  const currentItemName =
    selectedMediaType === 'game'
      ? games.find((g) => g.id === selectedEntityId)?.name
      : selectedMediaType === 'craft'
      ? crafts.find((c) => c.id === selectedEntityId)?.name
      : selectedMediaType === 'food'
      ? foodStories.find((f) => f.id === selectedEntityId)?.name
      : 'Homepage Hero Banner';

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1360px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fee2e2] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-2">
              <Shield className="w-4 h-4 text-[#dc2626]" /> Supabase Database Curator Desk
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-[#0c0f14] leading-[1.0] tracking-tight uppercase">
              CURATOR <span className="marker-underline text-[#ef4444]">ADMIN</span> CONSOLE
            </h1>
            <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
              Upload local .png & .jpg files directly into the database, monitor live logged-in users, manage child safety & artisan guild onboarding.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 bg-[#bbf7d0] text-[#065f46] font-display text-xs uppercase font-bold rounded-xl border-2 border-black shadow-retro-sm flex items-center gap-1.5">
              <Database className="w-4 h-4" /> SUPABASE CONNECTED
            </div>
            {role !== 'admin' && (
              <button
                onClick={() => setRole('admin')}
                className="btn-retro px-4 py-2 bg-[#ef4444] text-white font-display text-xs font-black uppercase rounded-xl shadow-retro"
              >
                SWITCH TO ADMIN
              </button>
            )}
          </div>
        </div>

        {/* Top 4 Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">ACTIVE LOGGED-IN USERS</div>
            <div className="font-display text-3xl font-bold text-[#0c0f14]">{activeUserSessions.length} Online</div>
            <div className="font-hand text-xs font-bold text-[#059669]">Real-time session tracker</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">DYNAMIC ASSETS MANAGED</div>
            <div className="font-display text-3xl font-bold text-[#d97706]">{games.length + crafts.length + foodStories.length} Items</div>
            <div className="font-hand text-xs font-bold text-zinc-600">.png / .jpg database store</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">ARTISAN WAITLIST</div>
            <div className="font-display text-3xl font-bold text-[#ef4444]">{artisanWaitlist.length} Applicants</div>
            <div className="font-hand text-xs font-bold text-[#ef4444]">{pendingWaitlist.length} Pending verification</div>
          </div>
          <div className="card-retro bg-white p-4 sm:p-5 border-2 border-black shadow-retro-sm space-y-1">
            <div className="font-display text-xs uppercase text-zinc-500 font-bold">CHILD SAFETY PROTECTION</div>
            <div className="font-display text-3xl font-bold text-[#059669]">ENFORCED</div>
            <div className="font-hand text-xs font-bold text-zinc-600">Saved Contacts Rule Active</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#f4eee3] rounded-2xl border-2 border-black shadow-retro-sm">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'media'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Upload className="w-4 h-4" /> DYNAMIC PICTURE CHANGER (.PNG / .JPG)
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'users'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Radio className="w-4 h-4 text-[#ef4444] animate-pulse" /> LOGGED-IN USERS ({activeUserSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'waitlist'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Hammer className="w-4 h-4" /> ARTISAN GUILD WAITLIST ({artisanWaitlist.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'submissions'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> COMMUNITY ARCHIVES ({pendingSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-xl font-display text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'config'
                ? 'bg-[#0c0f14] text-[#fef08a] border border-black shadow-retro-sm'
                : 'text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Settings className="w-4 h-4" /> DATABASE & CONFIG
          </button>
        </div>

        {/* TAB 1: DYNAMIC PICTURE CHANGER (FILE UPLOAD + URL SUPPORT) */}
        {activeTab === 'media' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-display text-xs uppercase text-[#ef4444] font-bold">
                  <Upload className="w-4 h-4" /> DATABASE IMAGE UPLOAD & ASSET STUDIO
                </div>
                <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                  UPDATE WEBSITE PICTURES (.PNG, .JPG & WEBP)
                </h2>
                <p className="font-hand text-base text-zinc-600 font-bold">
                  Upload photos directly from your computer or drag and drop image files to update the Supabase database in real-time.
                </p>
              </div>

              {/* Mode Switcher: File Upload vs Link */}
              <div className="flex items-center p-1 bg-[#f4eee3] border-2 border-black rounded-xl shadow-retro-sm">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 ${
                    uploadMode === 'file'
                      ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm'
                      : 'text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  <FolderUp className="w-3.5 h-3.5" /> Direct File Upload (.png/.jpg)
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold uppercase transition-all flex items-center gap-1.5 ${
                    uploadMode === 'url'
                      ? 'bg-[#0c0f14] text-[#fef08a] shadow-retro-sm'
                      : 'text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" /> Image URL Link
                </button>
              </div>
            </div>

            {uploadSuccessMessage && (
              <div className="p-4 bg-[#bbf7d0] border-2 border-[#065f46] text-[#065f46] rounded-2xl text-xs font-bold font-hand flex items-center gap-2.5 shadow-retro-sm animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}

            {/* Entity Selector Category Pills */}
            <div className="flex flex-wrap gap-2 pb-4 border-b-2 border-dashed border-black/20">
              <button
                onClick={() => handleMediaSelect('game', games[0]?.id || '')}
                className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase font-bold border-2 ${
                  selectedMediaType === 'game'
                    ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                    : 'bg-[#faf8f5] text-zinc-700 border-black'
                }`}
              >
                Folk Games ({games.length})
              </button>
              <button
                onClick={() => handleMediaSelect('craft', crafts[0]?.id || '')}
                className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase font-bold border-2 ${
                  selectedMediaType === 'craft'
                    ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                    : 'bg-[#faf8f5] text-zinc-700 border-black'
                }`}
              >
                Traditional Crafts ({crafts.length})
              </button>
              <button
                onClick={() => handleMediaSelect('food', foodStories[0]?.id || '')}
                className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase font-bold border-2 ${
                  selectedMediaType === 'food'
                    ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                    : 'bg-[#faf8f5] text-zinc-700 border-black'
                }`}
              >
                Food Stories ({foodStories.length})
              </button>
              <button
                onClick={() => handleMediaSelect('banner', 'home-hero-banner')}
                className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase font-bold border-2 ${
                  selectedMediaType === 'banner'
                    ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                    : 'bg-[#faf8f5] text-zinc-700 border-black'
                }`}
              >
                Hero Banner
              </button>
            </div>

            {/* Split Editor Grid: Left Item Selector, Right File Uploader & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Item Selector List (Left 5 Cols) */}
              <div className="lg:col-span-5 space-y-3 max-h-[560px] overflow-y-auto pr-2">
                <span className="font-display text-xs uppercase font-bold text-zinc-500 block">
                  Select Item to Edit:
                </span>
                {selectedMediaType === 'game' &&
                  games.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => handleMediaSelect('game', g.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                        selectedEntityId === g.id
                          ? 'bg-[#fef08a] border-black shadow-retro-sm ring-2 ring-black'
                          : 'bg-[#faf8f5] border-black/40 hover:border-black'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.imageUrl} alt={g.name} className="w-12 h-12 rounded-lg object-cover border border-black shrink-0 bg-zinc-200" />
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-bold text-sm text-[#0c0f14] truncate">{g.name}</div>
                        <div className="font-hand text-xs text-zinc-600 font-bold">{g.region}</div>
                      </div>
                    </div>
                  ))}

                {selectedMediaType === 'craft' &&
                  crafts.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleMediaSelect('craft', c.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                        selectedEntityId === c.id
                          ? 'bg-[#fef08a] border-black shadow-retro-sm ring-2 ring-black'
                          : 'bg-[#faf8f5] border-black/40 hover:border-black'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.imageUrl} alt={c.name} className="w-12 h-12 rounded-lg object-cover border border-black shrink-0 bg-zinc-200" />
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-bold text-sm text-[#0c0f14] truncate">{c.name}</div>
                        <div className="font-hand text-xs text-zinc-600 font-bold">{c.category}</div>
                      </div>
                    </div>
                  ))}

                {selectedMediaType === 'food' &&
                  foodStories.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => handleMediaSelect('food', f.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                        selectedEntityId === f.id
                          ? 'bg-[#fef08a] border-black shadow-retro-sm ring-2 ring-black'
                          : 'bg-[#faf8f5] border-black/40 hover:border-black'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.imageUrl} alt={f.name} className="w-12 h-12 rounded-lg object-cover border border-black shrink-0 bg-zinc-200" />
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-bold text-sm text-[#0c0f14] truncate">{f.name}</div>
                        <div className="font-hand text-xs text-zinc-600 font-bold">{f.state}</div>
                      </div>
                    </div>
                  ))}

                {selectedMediaType === 'banner' && (
                  <div
                    onClick={() => handleMediaSelect('banner', 'home-hero-banner')}
                    className="p-3 rounded-xl border-2 bg-[#fef08a] border-black shadow-retro-sm ring-2 ring-black cursor-pointer"
                  >
                    <div className="font-display font-bold text-sm text-[#0c0f14]">Homepage Hero Banner</div>
                    <div className="font-hand text-xs text-zinc-600 font-bold">Main welcoming billboard</div>
                  </div>
                )}
              </div>

              {/* Picture Live Editor & Upload Controller (Right 7 Cols) */}
              <div className="lg:col-span-7 card-retro bg-[#faf8f5] p-6 rounded-2xl border-2 border-black shadow-retro-md space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs uppercase font-bold text-[#ef4444]">
                    EDITING: {currentItemName}
                  </span>
                  <span className="text-[10px] font-display uppercase bg-black text-[#fef08a] px-2 py-0.5 rounded font-bold">
                    ID: {selectedEntityId}
                  </span>
                </div>

                {/* Primary Image Preview Frame */}
                <div className="space-y-1.5">
                  <span className="font-display text-xs uppercase text-zinc-700 font-bold block">
                    Active Picture Preview:
                  </span>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-black shadow-retro-sm bg-zinc-200 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={filePreview || newImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    {selectedFile && (
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#0c0f14]/90 text-[#bbf7d0] border border-black rounded-lg text-[11px] font-bold font-hand shadow-retro-sm flex items-center gap-1.5">
                        <FileImage className="w-3.5 h-3.5 text-[#059669]" />
                        <span>Ready to upload: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSavePicture} className="space-y-4">
                  
                  {/* Mode 1: Local File Drag & Drop Zone */}
                  {uploadMode === 'file' ? (
                    <div className="space-y-3">
                      
                      {/* Drag & Drop Box */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={(e) => handleDrop(e, false)}
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-6 border-[2.5px] border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                          isDragging
                            ? 'bg-[#fef08a] border-[#ef4444] scale-[1.01]'
                            : selectedFile
                            ? 'bg-[#bbf7d0]/40 border-[#059669]'
                            : 'bg-white border-black/40 hover:border-black hover:bg-[#faf8f5]'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp, image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileSelection(e.target.files[0], false);
                            }
                          }}
                        />

                        <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border-2 border-black flex items-center justify-center shadow-retro-sm">
                          {selectedFile ? (
                            <FileCheck className="w-6 h-6 text-[#059669]" />
                          ) : (
                            <Upload className="w-6 h-6 text-[#ef4444]" />
                          )}
                        </div>

                        <div>
                          <div className="font-display text-sm font-bold text-[#0c0f14] uppercase">
                            {selectedFile ? selectedFile.name : 'Choose .PNG or .JPG Image File'}
                          </div>
                          <p className="font-hand text-xs font-bold text-zinc-600 mt-0.5">
                            {selectedFile
                              ? `Size: ${(selectedFile.size / 1024).toFixed(1)} KB • Click to replace`
                              : 'Drag & drop image file here, or click to browse your computer'}
                          </p>
                        </div>

                        <div className="flex gap-1.5 pt-1">
                          <span className="px-2 py-0.5 bg-[#f4eee3] border border-black rounded text-[9px] font-display font-bold uppercase">
                            .PNG
                          </span>
                          <span className="px-2 py-0.5 bg-[#f4eee3] border border-black rounded text-[9px] font-display font-bold uppercase">
                            .JPG / .JPEG
                          </span>
                          <span className="px-2 py-0.5 bg-[#f4eee3] border border-black rounded text-[9px] font-display font-bold uppercase">
                            .WEBP
                          </span>
                        </div>
                      </div>

                      {/* Optional Game Cover Photo Dropzone */}
                      {selectedMediaType === 'game' && (
                        <div className="p-4 bg-white rounded-xl border-2 border-black space-y-2 shadow-retro-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-xs uppercase font-bold text-zinc-700">
                              Optional Wide Cover Banner (.png/.jpg)
                            </span>
                            {selectedCoverFile && (
                              <button
                                type="button"
                                onClick={() => { setSelectedCoverFile(null); setCoverFilePreview(null); }}
                                className="text-[10px] text-red-600 font-bold uppercase hover:underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsCoverDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setIsCoverDragging(false); }}
                            onDrop={(e) => handleDrop(e, true)}
                            onClick={() => coverFileInputRef.current?.click()}
                            className="p-3 border-2 border-dashed border-black/40 hover:border-black rounded-xl text-center cursor-pointer bg-[#faf8f5]"
                          >
                            <input
                              ref={coverFileInputRef}
                              type="file"
                              accept=".png, .jpg, .jpeg, .webp, image/png, image/jpeg, image/webp"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileSelection(e.target.files[0], true);
                                }
                              }}
                            />
                            <div className="font-display text-xs font-bold text-[#0c0f14]">
                              {selectedCoverFile ? `Cover: ${selectedCoverFile.name}` : '+ Click to add wide cover photo'}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    /* Mode 2: Link Mode */
                    <div className="space-y-3">
                      <div>
                        <label className="block font-display text-xs uppercase font-bold text-zinc-700 mb-1">
                          Primary Image Link (URL) *
                        </label>
                        <input
                          type="url"
                          required
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                        />
                      </div>

                      {selectedMediaType === 'game' && (
                        <div>
                          <label className="block font-display text-xs uppercase font-bold text-zinc-700 mb-1">
                            Game Cover Art / Banner URL
                          </label>
                          <input
                            type="url"
                            value={newCoverImageUrl}
                            onChange={(e) => setNewCoverImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                          />
                        </div>
                      )}

                      {/* Preset Instant Images */}
                      <div>
                        <span className="font-display text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                          QUICK PRESETS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: 'Outdoor Folk Game', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80' },
                            { label: 'Tactical Board Play', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80' },
                            { label: 'Bamboo Weave Art', url: 'https://images.unsplash.com/photo-1605883746291-0a852ff8f0ed?auto=format&fit=crop&w=1200&q=80' },
                            { label: 'Black Stone Clay', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80' },
                            { label: 'Traditional Feast', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80' }
                          ].map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setNewImageUrl(preset.url)}
                              className="px-2 py-1 bg-white border border-black rounded-lg text-[10px] font-display uppercase font-bold hover:bg-[#fef08a]"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isUpdatingPic || (uploadMode === 'file' && !selectedFile && !newImageUrl)}
                    className="w-full py-3 bg-[#0c0f14] hover:bg-zinc-800 disabled:opacity-50 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isUpdatingPic ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-[#fef08a] animate-spin" />
                        <span>SYNCHRONIZING WITH SUPABASE DATABASE...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#fef08a]" />
                        <span>
                          {uploadMode === 'file' && selectedFile
                            ? `UPLOAD & SAVE "${selectedFile.name}" TO DATABASE`
                            : 'SAVE & PUBLISH PICTURE TO DATABASE'}
                        </span>
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE LOGGED-IN USERS & SESSIONS TRACKER */}
        {activeTab === 'users' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-black/20">
              <div>
                <div className="flex items-center gap-1.5 font-display text-xs uppercase text-[#ef4444] font-bold">
                  <Radio className="w-4 h-4 text-[#ef4444] animate-pulse" /> REAL-TIME USER SURVEILLANCE & AUTH LOG
                </div>
                <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                  ACTIVE LOGGED-IN USERS TRACKER
                </h2>
                <p className="font-hand text-base text-zinc-600 font-bold">
                  Monitor live archivist presence, age verification compliance, child safety enforcement, and session revocation.
                </p>
              </div>

              <span className="px-3 py-1 bg-[#bbf7d0] text-[#065f46] border border-black rounded-full font-display text-xs font-bold uppercase shadow-retro-sm">
                ● {activeUserSessions.length} SESSIONS ACTIVE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-black text-zinc-700 font-display uppercase text-xs">
                    <th className="pb-3">Archivist / User</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Age Verification</th>
                    <th className="pb-3">Location & IP</th>
                    <th className="pb-3">Device / Client</th>
                    <th className="pb-3">Login Activity</th>
                    <th className="pb-3 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {activeUserSessions.map((sess) => (
                    <tr key={sess.id} className="hover:bg-[#faf8f5]">
                      <td className="py-3.5 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sess.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                          alt={sess.userName}
                          className="w-10 h-10 rounded-xl object-cover border border-black shadow-retro-sm"
                        />
                        <div>
                          <div className="font-display font-bold text-base text-[#0c0f14] flex items-center gap-1.5">
                            <span>{sess.userName}</span>
                            <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping" />
                          </div>
                          <div className="font-hand text-xs font-bold text-zinc-600">{sess.userEmail}</div>
                        </div>
                      </td>

                      <td className="py-3.5 font-display text-xs uppercase font-bold text-zinc-800">
                        <span className={`px-2 py-0.5 rounded border border-black ${
                          sess.role === 'admin' ? 'bg-[#fee2e2] text-[#991b1b]' : 'bg-[#f4eee3] text-[#0c0f14]'
                        }`}>
                          {sess.role}
                        </span>
                      </td>

                      <td className="py-3.5">
                        {sess.ageVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#bbf7d0] text-[#065f46] text-[10px] font-display uppercase font-bold rounded border border-black">
                            <ShieldCheck className="w-3 h-3" /> 18+ VERIFIED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fed7aa] text-[#9a3412] text-[10px] font-display uppercase font-bold rounded border border-black">
                            <ShieldAlert className="w-3 h-3" /> MINOR SAFE
                          </span>
                        )}
                      </td>

                      <td className="py-3.5">
                        <div className="font-display text-xs font-bold text-[#0c0f14]">{sess.location}</div>
                        <div className="font-mono text-[10px] text-zinc-500">{sess.ipAddress}</div>
                      </td>

                      <td className="py-3.5 font-hand text-xs font-bold text-zinc-700">
                        {sess.deviceInfo}
                      </td>

                      <td className="py-3.5">
                        <div className="font-display text-xs font-bold text-[#059669]">{sess.lastActiveAt}</div>
                        <div className="font-hand text-[10px] text-zinc-500 font-bold">Login: {sess.loginAt}</div>
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => terminateUserSession(sess.id)}
                          className="btn-retro px-3 py-1.5 bg-[#fee2e2] hover:bg-red-200 text-[#991b1b] font-display text-[10px] font-bold uppercase rounded-lg border border-black shadow-retro-sm flex items-center gap-1 ml-auto"
                          title="Revoke session token and force log out"
                        >
                          <UserX className="w-3 h-3" /> REVOKE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ARTISAN GUILD WAITLIST */}
        {activeTab === 'waitlist' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
                ARTISAN GUILD ONBOARDING QUEUE
              </h2>
              <p className="font-hand text-base text-zinc-600 font-bold">
                Review master craftsmen registrations submitted through the Coming Soon page.
              </p>
            </div>

            {artisanWaitlist.length > 0 ? (
              <div className="space-y-4">
                {artisanWaitlist.map((wait) => (
                  <div
                    key={wait.id}
                    className="p-5 rounded-2xl bg-[#faf8f5] border-2 border-black shadow-retro-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#fef08a] text-[#0c0f14] text-[10px] font-display uppercase rounded border border-black font-bold">
                          {wait.craftCategory}
                        </span>
                        <h4 className="font-display font-bold text-xl text-[#0c0f14]">{wait.artisanName}</h4>
                        <span className="font-hand text-xs font-bold text-zinc-600">📍 {wait.location}</span>
                      </div>
                      <div className="font-hand text-xs font-bold text-zinc-700">
                        📞 {wait.phone} {wait.email && `• ✉️ ${wait.email}`} • {wait.experienceYears} Years Experience
                      </div>
                      {wait.message && (
                        <p className="text-xs text-zinc-700 font-medium italic bg-white p-2 rounded-lg border border-black/20 max-w-xl">
                          &quot;{wait.message}&quot;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-display uppercase font-bold border border-black ${
                        wait.status === 'approved'
                          ? 'bg-[#bbf7d0] text-[#065f46]'
                          : wait.status === 'invited'
                          ? 'bg-[#fed7aa] text-[#9a3412]'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}>
                        {wait.status.toUpperCase()}
                      </span>

                      {wait.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateWaitlistStatus(wait.id, 'invited')}
                            className="btn-retro px-3.5 py-1.5 bg-[#fed7aa] text-[#9a3412] font-display text-xs uppercase font-bold rounded-xl shadow-retro-sm"
                          >
                            INVITE
                          </button>
                          <button
                            onClick={() => { updateWaitlistStatus(wait.id, 'approved'); triggerConfetti(); }}
                            className="btn-retro px-4 py-1.5 bg-[#0c0f14] text-[#fef08a] font-display text-xs font-black uppercase rounded-xl shadow-retro-sm"
                          >
                            APPROVE
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#faf8f5] rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-700 font-bold shadow-retro-sm">
                No artisan waitlist applications pending.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COMMUNITY SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              COMMUNITY ARCHIVAL SUBMISSIONS
            </h2>

            {pendingSubmissions.length > 0 ? (
              <div className="space-y-4">
                {pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#faf8f5] border-2 border-black shadow-retro-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#fef08a] text-[#0c0f14] text-[10px] font-display uppercase rounded border border-black font-bold">
                          {sub.type}
                        </span>
                        <span className="font-display text-base font-bold text-[#0c0f14]">{sub.title}</span>
                        <span className="font-hand text-xs font-bold text-zinc-600">📍 {sub.region}</span>
                      </div>
                      <p className="text-xs text-zinc-700 max-w-xl font-medium leading-relaxed">
                        {sub.description}
                      </p>
                      <div className="font-hand text-xs text-zinc-500 font-bold">
                        Submitted by: {sub.submittedBy} ({sub.submittedAt})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                        className="btn-retro px-3.5 py-1.5 text-xs font-display uppercase text-[#991b1b] bg-[#fee2e2] rounded-xl shadow-retro-sm"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => { updateSubmissionStatus(sub.id, 'approved'); triggerConfetti(); }}
                        className="btn-retro px-4 py-1.5 bg-[#0c0f14] text-[#fef08a] text-xs font-display font-black uppercase rounded-xl shadow-retro-sm"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#faf8f5] rounded-2xl border-2 border-black text-center font-hand text-lg text-zinc-700 font-bold shadow-retro-sm">
                No pending community memories awaiting review.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DATABASE CONFIG & KEYS */}
        {activeTab === 'config' && (
          <div className="card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
            <h2 className="font-display text-3xl font-bold text-[#0c0f14]">
              DATABASE BACKEND CONFIGURATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Economics Form */}
              <form onSubmit={handleUpdateCommission} className="space-y-4 p-6 bg-[#f4eee3] rounded-2xl border-2 border-black shadow-retro-sm">
                <div className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold">
                  PLATFORM ECONOMICS
                </div>
                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1 font-bold">
                    Marketplace Commission (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      max={25}
                      step={0.5}
                      value={commissionInput}
                      onChange={(e) => setCommissionInput(parseFloat(e.target.value) || 0)}
                      className="w-32 px-3.5 py-2 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                    <span className="font-hand text-sm font-bold text-zinc-700">% transaction fee</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
                >
                  SAVE COMMISSION CONFIG
                </button>
              </form>

              {/* Supabase Connection Status Card */}
              <div className="space-y-3 p-6 bg-[#faf8f5] rounded-2xl border-2 border-black shadow-retro-sm">
                <div className="font-display text-xs uppercase tracking-wider text-[#059669] font-bold flex items-center gap-1.5">
                  <Database className="w-4 h-4" /> SUPABASE ENVIRONMENT CREDENTIALS
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-xl border border-black">
                    <span className="font-bold text-zinc-500 block">PROJECT REF:</span>
                    <span className="text-[#0c0f14] font-bold">umarfzggblqdijxsebr</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-black truncate">
                    <span className="font-bold text-zinc-500 block">ENDPOINT:</span>
                    <span className="text-[#0c0f14] font-bold">https://umarfzggblqdijxsebr.supabase.co</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-black truncate">
                    <span className="font-bold text-zinc-500 block">ANON KEY CONFIGURED:</span>
                    <span className="text-[#059669] font-bold">●●●●●●●●●●●● (Valid JWT)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
