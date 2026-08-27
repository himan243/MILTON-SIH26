'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Users,
  Radio,
  MapPin,
  Shield,
  MessageSquare,
  Plus,
  Send,
  ThumbsUp,
  Sparkles,
  CheckCircle2,
  Lock,
  EyeOff,
  Navigation
} from 'lucide-react';

export default function CommunityPage() {
  const {
    sessions,
    createSession,
    joinSession,
    leaveSession,
    sendSessionMessage,
    submissions,
    upvoteSubmission,
    setIsPreserveModalOpen,
    games,
    user,
    t
  } = useApp();

  const [privacyMode, setPrivacyMode] = useState<'approximate' | 'precise' | 'manual'>('approximate');
  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[0]?.id || '');
  const [chatInput, setChatInput] = useState('');
  
  // Host Form State
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [newGameId, setNewGameId] = useState(games[0]?.id || '');
  const [newLocality, setNewLocality] = useState('Nehru Park Open Lawn, Guwahati');
  const [newDate, setNewDate] = useState('This Sunday, 4:00 PM');
  const [newNotes, setNewNotes] = useState('Organizing an open tournament with teams! Everyone welcome.');
  const [newMaxPlayers, setNewMaxPlayers] = useState(8);

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeSession) return;
    sendSessionMessage(activeSession.id, chatInput);
    setChatInput('');
  };

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const game = games.find((g) => g.id === newGameId);
    if (!game) return;

    createSession({
      gameId: game.id,
      gameTitle: game.name,
      date: newDate,
      time: '4:00 PM - 6:00 PM',
      locality: newLocality,
      state: game.region.split('&')[0].trim() || 'Assam',
      privacyMode,
      maxPlayers: newMaxPlayers,
      notes: newNotes
    });

    setIsCreatingSession(false);
  };

  const isUserJoined = activeSession?.participants.some((p) => p.id === user.id);

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d0e9d4] text-[#0b2013] text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-4 h-4 text-[#1b3022]" /> Neighborhood Game Revival & Living Forums
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            {t.navCommunity} & Nearby Players
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            Find people in your city or locality to play traditional folk games in person. We protect your privacy with configurable location precision.
          </p>
        </div>

        {/* Privacy Control Selector */}
        <div className="bg-[#f0eee8] rounded-3xl p-6 border border-[#c3c8c1] mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b3022] text-[#fcf9f3] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#fbbb51]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#061b0e]">
                Location Privacy Setting
              </div>
              <p className="text-xs text-[#737973]">
                Control how precisely other community members can see your session location.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
            <button
              onClick={() => setPrivacyMode('approximate')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                privacyMode === 'approximate'
                  ? 'bg-[#1b3022] text-[#fcf9f3] shadow-md'
                  : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
              }`}
            >
              Approximate (Default)
            </button>
            <button
              onClick={() => setPrivacyMode('manual')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                privacyMode === 'manual'
                  ? 'bg-[#1b3022] text-[#fcf9f3] shadow-md'
                  : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
              }`}
            >
              Manual Area
            </button>
            <button
              onClick={() => setPrivacyMode('precise')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                privacyMode === 'precise'
                  ? 'bg-[#974730] text-[#fcf9f3] shadow-md'
                  : 'bg-[#ffffff] text-[#434843] hover:bg-[#e5e2dc]'
              }`}
            >
              Exact GPS
            </button>
          </div>
        </div>

        {/* Live Sessions Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left: Active Sessions List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#061b0e] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#974730] animate-pulse" /> Live Neighborhood Sessions
              </h2>
              <button
                onClick={() => setIsCreatingSession(true)}
                className="px-3.5 py-1.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase rounded-full shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Host Match
              </button>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    activeSession?.id === session.id
                      ? 'bg-[#ffffff] border-[#974730] shadow-xl ring-2 ring-[#974730]/20'
                      : 'bg-[#f0eee8]/70 border-[#c3c8c1] hover:bg-[#ffffff]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-[#fe997c]/20 text-[#772f1a] text-[10px] font-bold uppercase rounded-full">
                      {session.gameTitle}
                    </span>
                    <span className="text-xs font-semibold text-[#737973] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#974730]" /> {session.state}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#061b0e]">
                    {session.locality}
                  </h3>

                  <div className="text-xs text-[#737973] mt-1">
                    🗓️ {session.date} • {session.time}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1b3022]">
                        {session.currentPlayers}/{session.maxPlayers} Players Joined
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#974730]">
                      {activeSession?.id === session.id ? 'Active Lobby →' : 'View Lobby'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Session Detailed Lobby & Chat */}
          {activeSession && (
            <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#f0eee8]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#974730]">
                    Match Lobby
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#061b0e]">
                    {activeSession.gameTitle}
                  </h3>
                  <p className="text-xs text-[#737973] mt-0.5">
                    📍 {activeSession.locality} ({activeSession.state})
                  </p>
                </div>

                {isUserJoined ? (
                  <button
                    onClick={() => leaveSession(activeSession.id)}
                    className="px-5 py-2 bg-[#f0eee8] hover:bg-[#e5e2dc] text-[#ba1a1a] text-xs font-bold uppercase rounded-full transition-colors"
                  >
                    Leave Match
                  </button>
                ) : (
                  <button
                    onClick={() => joinSession(activeSession.id)}
                    className="px-6 py-2.5 bg-[#1b3022] hover:bg-[#061b0e] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    Join Match (+50 XP)
                  </button>
                )}
              </div>

              {/* Participants Roster (Team A & B) */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block mb-3">
                  Confirmed Participants ({activeSession.participants.length}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeSession.participants.map((p, i) => (
                    <div key={i} className="p-3 bg-[#fcf9f3] rounded-2xl border border-[#c3c8c1]/60 flex flex-col items-center text-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      <div>
                        <div className="text-xs font-bold text-[#061b0e] truncate">{p.name}</div>
                        <span className="text-[10px] uppercase font-bold text-[#974730]">
                          Team {p.team || (i % 2 === 0 ? 'A' : 'B')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Notes */}
              <div className="p-4 bg-[#f6f3ed] rounded-2xl border border-[#c3c8c1]/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737973] block mb-1">
                  Host Instructions from {activeSession.hostName}:
                </span>
                <p className="text-xs text-[#061b0e] leading-relaxed italic">
                  &quot;{activeSession.notes}&quot;
                </p>
              </div>

              {/* In-Lobby Participant Chat */}
              <div className="space-y-3 pt-2 border-t border-[#f0eee8]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block">
                  Session Match Chat
                </span>

                <div className="h-48 overflow-y-auto space-y-2 p-3 bg-[#fcf9f3] rounded-2xl border border-[#c3c8c1]/60">
                  {activeSession.messages.map((m) => (
                    <div key={m.id} className="p-2.5 rounded-xl bg-[#ffffff] border border-[#c3c8c1]/40 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-[#737973] mb-1">
                        <span className="font-bold text-[#061b0e]">{m.senderName}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="text-[#1c1c18]">{m.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Coordinate arrival, brings items, or ask questions..."
                    className="flex-1 px-4 py-2 rounded-full bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#1b3022] text-[#fcf9f3] rounded-full hover:bg-[#061b0e]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* Community Preserved Memories Feed */}
        <div className="bg-[#f0eee8] rounded-3xl p-6 sm:p-10 border border-[#c3c8c1] shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#c3c8c1]/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#974730]">
                Living Archival Knowledge
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#061b0e]">
                Community-Preserved Cultural Records
              </h2>
            </div>
            <button
              onClick={() => setIsPreserveModalOpen(true)}
              className="px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
            >
              + Submit Memory
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 bg-[#f6f3ed] text-[#1b3022] text-[10px] font-bold uppercase rounded-full">
                      {sub.type}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#d0e9d4] text-[#0b2013]">
                      {sub.status}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#061b0e]">
                    {sub.title}
                  </h4>
                  <div className="text-[11px] text-[#737973] mb-2">📍 {sub.region}</div>
                  <p className="text-xs text-[#434843] leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
                  <span className="text-[11px] text-[#737973]">By {sub.submittedBy}</span>
                  <button
                    onClick={() => upvoteSubmission(sub.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#f0eee8] hover:bg-[#e5e2dc] text-[#061b0e] text-xs font-bold rounded-full transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3 text-[#974730]" /> {sub.upvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Host Session Modal */}
        {isCreatingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061b0e]/75 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-lg bg-[#ffffff] rounded-3xl border border-[#c3c8c1] shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <h3 className="font-display text-2xl font-bold text-[#061b0e]">
                  Host New Neighborhood Match
                </h3>
                <button onClick={() => setIsCreatingSession(false)} className="text-[#737973] hover:text-[#061b0e]">
                  ✕
                </button>
              </div>

              <form onSubmit={handleHostSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Select Folk Game
                  </label>
                  <select
                    value={newGameId}
                    onChange={(e) => setNewGameId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.id}>{g.name} ({g.region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Locality / Park Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Date & Time
                    </label>
                    <input
                      type="text"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                      Max Players
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={newMaxPlayers}
                      onChange={(e) => setNewMaxPlayers(parseInt(e.target.value) || 8)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#737973] mb-1">
                    Session Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingSession(false)}
                    className="px-4 py-2 text-xs font-bold uppercase text-[#737973]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
                  >
                    Publish Match (+100 XP)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
