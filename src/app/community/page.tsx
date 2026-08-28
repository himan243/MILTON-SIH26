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
  Folder
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
    t,
    triggerConfetti
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
    triggerConfetti();
  };

  const isUserJoined = activeSession?.participants.some((p) => p.id === user.id);

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fed7aa] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <Users className="w-4 h-4 text-[#ef4444]" /> Neighborhood Match Radar & Living Forums
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            COMMUNITY & <span className="marker-underline text-[#ef4444]">NEARBY</span> PLAYERS
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            Find neighborhood folk game sessions and coordinate in-person matches with privacy protection.
          </p>
        </div>

        {/* Privacy Control Selector on Kraft Card */}
        <div className="card-retro bg-[#f4eee3] p-5 sm:p-6 border-[2.5px] border-[#0c0f14] shadow-retro-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c0f14] text-[#fef08a] border-2 border-black flex items-center justify-center shrink-0 shadow-retro-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display text-base font-bold uppercase tracking-wide text-[#0c0f14]">
                Location Privacy Zone
              </div>
              <p className="font-hand text-sm text-zinc-600 font-bold">
                Configure GPS precision for your neighborhood presence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setPrivacyMode('approximate')}
              className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase tracking-wider border-2 transition-all ${
                privacyMode === 'approximate'
                  ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                  : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
              }`}
            >
              Approximate
            </button>
            <button
              onClick={() => setPrivacyMode('manual')}
              className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase tracking-wider border-2 transition-all ${
                privacyMode === 'manual'
                  ? 'bg-[#0c0f14] text-[#fef08a] border-black shadow-retro-sm'
                  : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
              }`}
            >
              Manual Area
            </button>
            <button
              onClick={() => setPrivacyMode('precise')}
              className={`px-3.5 py-1.5 rounded-xl font-display text-xs uppercase tracking-wider border-2 transition-all ${
                privacyMode === 'precise'
                  ? 'bg-[#ef4444] text-white border-black shadow-retro-sm'
                  : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa]'
              }`}
            >
              Exact GPS
            </button>
          </div>
        </div>

        {/* Live Sessions 2-Column Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-start">
          
          {/* Left 5 Cols: Active Sessions List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-[#0c0f14] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#ef4444] animate-pulse" /> LIVE NEARBY LOBBIES
              </h2>
              <button
                onClick={() => setIsCreatingSession(true)}
                className="btn-retro px-3.5 py-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> HOST MATCH
              </button>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`card-retro p-4 sm:p-5 border-[2.5px] cursor-pointer transition-all ${
                    activeSession?.id === session.id
                      ? 'bg-white border-black shadow-retro-lg ring-2 ring-black'
                      : 'bg-[#faf8f5] border-black/40 hover:border-black shadow-retro-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 bg-[#fef08a] text-[#0c0f14] font-display text-[11px] font-bold uppercase rounded-md border border-black shadow-retro-sm">
                      {session.gameTitle}
                    </span>
                    <span className="text-xs font-bold font-hand text-zinc-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ef4444]" /> {session.state}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0c0f14]">
                    {session.locality}
                  </h3>

                  <div className="text-xs text-zinc-600 mt-1 font-medium font-hand text-sm">
                    🗓️ {session.date} • {session.time}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between">
                    <span className="font-display text-xs text-[#059669] font-bold">
                      {session.currentPlayers}/{session.maxPlayers} PLAYERS JOINED
                    </span>
                    <span className="font-display text-xs uppercase tracking-wider text-[#ef4444]">
                      {activeSession?.id === session.id ? 'ACTIVE LOBBY →' : 'VIEW LOBBY'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Cols: Selected Session Detailed Lobby & In-Game Chat */}
          {activeSession && (
            <div className="lg:col-span-7 card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6 relative">
              <div className="pushpin-red" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-black/20 pr-6">
                <div>
                  <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold">
                    MATCH LOBBY
                  </span>
                  <h3 className="font-display text-3xl font-bold text-[#0c0f14]">
                    {activeSession.gameTitle}
                  </h3>
                  <p className="font-hand text-sm font-bold text-zinc-600 mt-0.5">
                    📍 {activeSession.locality} ({activeSession.state})
                  </p>
                </div>

                {isUserJoined ? (
                  <button
                    onClick={() => leaveSession(activeSession.id)}
                    className="btn-retro px-4 py-2 bg-zinc-200 text-[#0c0f14] font-display text-xs uppercase rounded-xl shadow-retro-sm"
                  >
                    LEAVE MATCH
                  </button>
                ) : (
                  <button
                    onClick={() => { joinSession(activeSession.id); triggerConfetti(); }}
                    className="btn-retro px-5 py-2.5 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
                  >
                    JOIN MATCH (+50 XP)
                  </button>
                )}
              </div>

              {/* Participants Roster */}
              <div>
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 font-bold block mb-2.5">
                  CONFIRMED ROSTER ({activeSession.participants.length}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeSession.participants.map((p, i) => (
                    <div key={i} className="p-2.5 bg-[#f4eee3] rounded-xl border-2 border-black flex flex-col items-center text-center gap-1.5 shadow-retro-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-black" />
                      <div>
                        <div className="font-display text-xs font-bold text-[#0c0f14] truncate">{p.name}</div>
                        <span className="font-display text-[9px] uppercase px-1.5 py-0.5 bg-[#fef08a] text-[#0c0f14] rounded border border-black">
                          TEAM {p.team || (i % 2 === 0 ? 'A' : 'B')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Notes */}
              <div className="p-3.5 bg-[#faf8f5] rounded-xl border-2 border-black shadow-retro-sm">
                <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold block mb-0.5">
                  Host Note from {activeSession.hostName}:
                </span>
                <p className="font-hand text-sm font-bold text-zinc-800 italic">
                  &quot;{activeSession.notes}&quot;
                </p>
              </div>

              {/* In-Lobby Participant Chat */}
              <div className="space-y-3 pt-2 border-t-2 border-dashed border-black/20">
                <span className="font-display text-xs uppercase tracking-wider text-zinc-500 font-bold block">
                  SESSION COORDINATION CHAT
                </span>

                <div className="h-44 overflow-y-auto space-y-2 p-3 bg-graph-paper rounded-xl border-2 border-black">
                  {activeSession.messages.map((m) => (
                    <div key={m.id} className="p-2 bg-white rounded-lg border border-black text-xs shadow-retro-sm">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold mb-0.5">
                        <span className="font-display text-xs text-[#0c0f14]">{m.senderName}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="font-medium text-zinc-800">{m.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Coordinate arrival or equipment..."
                    className="flex-1 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-400 outline-none shadow-retro-sm"
                  />
                  <button
                    type="submit"
                    className="btn-retro px-4 py-2 bg-[#0c0f14] text-white rounded-xl shadow-retro-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* Community Preserved Memories Feed */}
        <div className="card-retro bg-[#f4eee3] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-black/20">
            <div>
              <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold">
                LIVING ARCHIVAL KNOWLEDGE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0c0f14]">
                COMMUNITY PRESERVED RECORDS
              </h2>
            </div>
            <button
              onClick={() => setIsPreserveModalOpen(true)}
              className="btn-retro px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
            >
              + SUBMIT MEMORY (+120 XP)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="card-retro bg-white p-5 border-2 border-black shadow-retro-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-[#fef08a] text-[#0c0f14] text-[10px] font-display uppercase rounded border border-black shadow-retro-sm">
                      {sub.type}
                    </span>
                    <span className="rubber-stamp rubber-stamp-green text-[9px] py-0.5">
                      {sub.status}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-[#0c0f14]">
                    {sub.title}
                  </h4>
                  <div className="font-hand text-xs font-bold text-zinc-600 mb-1">📍 {sub.region}</div>
                  <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="font-hand text-xs font-bold text-zinc-600">By {sub.submittedBy}</span>
                  <button
                    onClick={() => { upvoteSubmission(sub.id); triggerConfetti(); }}
                    className="btn-retro px-3 py-1 bg-[#faf8f5] hover:bg-[#fef08a] text-[#0c0f14] text-xs font-display font-bold uppercase rounded-lg shadow-retro-sm flex items-center gap-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#ef4444]" /> {sub.upvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Host Session Modal */}
        {isCreatingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="w-full max-w-lg card-retro bg-[#faf8f5] border-[2.5px] border-[#0c0f14] shadow-retro-xl p-6 sm:p-8 space-y-4 relative">
              <div className="pushpin-red" />

              <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
                <h3 className="font-display text-2xl font-bold text-[#0c0f14]">
                  HOST NEIGHBORHOOD MATCH
                </h3>
                <button onClick={() => setIsCreatingSession(false)} className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs font-bold mr-6">
                  ✕
                </button>
              </div>

              <form onSubmit={handleHostSubmit} className="space-y-3">
                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Select Folk Game
                  </label>
                  <select
                    value={newGameId}
                    onChange={(e) => setNewGameId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.id}>{g.name} ({g.region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Locality / Park Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Date & Preferred Time
                    </label>
                    <input
                      type="text"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                      Max Players
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={newMaxPlayers}
                      onChange={(e) => setNewMaxPlayers(parseInt(e.target.value) || 8)}
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-display text-xs uppercase tracking-wider text-zinc-700 mb-1">
                    Session Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-bold text-[#0c0f14] outline-none shadow-retro-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t-2 border-dashed border-black/20">
                  <button
                    type="button"
                    onClick={() => setIsCreatingSession(false)}
                    className="px-4 py-2 text-xs font-display uppercase tracking-wider text-zinc-700 hover:bg-zinc-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-retro px-5 py-2.5 bg-[#ef4444] text-white font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro"
                  >
                    PUBLISH MATCH (+100 XP)
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
