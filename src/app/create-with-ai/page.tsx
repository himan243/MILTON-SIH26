'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AIProjectIdea } from '@/types';
import {
  Sparkles,
  UploadCloud,
  Layers,
  Wand2,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Folder
} from 'lucide-react';

const SAMPLE_INPUTS = [
  {
    name: 'Old Glass Bottles & Jute String',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    tags: ['Glass Bottle', 'Jute Cord', 'Cardboard', 'Metal Cap']
  },
  {
    name: 'Bamboo Twigs & Coconut Shells',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80',
    tags: ['Bamboo Twigs', 'Coconut Husk', 'River Mud', 'Dried Palm Leaves']
  },
  {
    name: 'Scrap Handloom Cloth & Wire',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    tags: ['Eri Silk Scraps', 'Cotton Twine', 'Craft Wire', 'Wooden Beads']
  }
];

const PRECOMPUTED_IDEAS: Record<string, AIProjectIdea[]> = {
  default: [
    {
      id: 'ai-windchime-bamboo',
      title: 'Acoustic Northeast Bamboo Wind Chime',
      concept: 'A soothing veranda chime tuned to traditional folk pentatonic scales using hollow bamboo tubes and river stones.',
      identifiedMaterials: ['Bamboo Scraps', 'Jute Twine', 'Coconut Shell Top'],
      difficulty: 'Easy',
      estimatedTime: '25 Minutes',
      culturalConnection: 'Inspired by the wind guardians hung outside traditional Khasi and Assamese chang-ghars (stilt houses).',
      stepByStep: [
        'Cut 5 bamboo tubes at graduated lengths (15cm, 18cm, 21cm, 24cm, 27cm) to produce harmonic acoustic notes.',
        'Smooth the cut edges with sandpaper to prevent splinters.',
        'Punch 5 holes around the rim of the halved coconut shell canopy.',
        'Suspend each bamboo tube using equal lengths of durable jute twine.',
        'Attach a flat central bamboo striker in the center and hang in a breezy veranda.'
      ],
      safetyNotes: ['Use adult supervision when cutting bamboo ends.', 'Smooth all sharp splinters before handling.'],
      skillsLearned: ['Acoustic Tuning', 'Geometric Symmetry', 'Upcycling Resourcefulness'],
      previewImageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
      xpReward: 150
    },
    {
      id: 'ai-bottle-cap-top',
      title: 'Resonant Metal-Cap Humming Gyroscope',
      concept: 'The classic childhood buzzing spinner that roars through centrifugal air resistance.',
      identifiedMaterials: ['Metal Crown Caps', 'Heavy Thread', 'Nail'],
      difficulty: 'Easy',
      estimatedTime: '10 Minutes',
      culturalConnection: 'A quintessential childhood craft popular across Assam, Bengal, and Tripura tea garden colonies.',
      stepByStep: [
        'Flatten the metal bottle cap with smooth hammer taps.',
        'Punch two centered holes 5mm apart using a nail.',
        'Loop 1 meter of strong cotton string through the holes and knot the ends.',
        'Twirl to build twist tension, then pull rhythmically to start the humming spin.'
      ],
      safetyNotes: ['File any sharp edge of the flattened metal cap.'],
      skillsLearned: ['Centrifugal Dynamics', 'Rhythmic Coordination'],
      previewImageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      xpReward: 120
    },
    {
      id: 'ai-coconut-planter',
      title: 'Hanging Coconut-Husk Orchid Cradle',
      concept: 'A breathable moisture-retaining hanging planter ideal for regional Kopou (Fox-tail) orchids.',
      identifiedMaterials: ['Coconut Shell', 'Twine', 'Charcoal Bits'],
      difficulty: 'Medium',
      estimatedTime: '30 Minutes',
      culturalConnection: 'Used traditionally in Assam to cultivate wild orchids for Rongali Bihu hair adornments.',
      stepByStep: [
        'Drill 3 small drainage holes in the base of a clean half-coconut shell.',
        'Drill 3 rim holes for the suspension tripod strings.',
        'Layer bottom with activated charcoal and river gravel.',
        'Nestle wild orchid roots with coconut fiber moss.',
        'Braid jute cords and suspend near indirect sunlight.'
      ],
      skillsLearned: ['Botanical Gardening', 'Macrame Knotting'],
      previewImageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
      xpReward: 200
    }
  ]
};

export default function CreateWithAIPage() {
  const { saveAIProject, user, t, triggerConfetti } = useApp();
  
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_INPUTS[0].image);
  const [customText, setCustomText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedTags, setDetectedTags] = useState<string[]>(SAMPLE_INPUTS[0].tags);
  const [generatedIdeas, setGeneratedIdeas] = useState<AIProjectIdea[]>(PRECOMPUTED_IDEAS.default);
  const [selectedIdea, setSelectedIdea] = useState<AIProjectIdea>(PRECOMPUTED_IDEAS.default[0]);
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  const handleSelectSample = (sample: typeof SAMPLE_INPUTS[0]) => {
    setSelectedImage(sample.image);
    setDetectedTags(sample.tags);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          handleRunAIAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectedTags(['Cardboard Strips', 'Bamboo Splints', 'Upcycled Bottle', 'Cotton Yarn']);
      setGeneratedIdeas(PRECOMPUTED_IDEAS.default);
      setSelectedIdea(PRECOMPUTED_IDEAS.default[0]);
      triggerConfetti();
    }, 1200);
  };

  const handleSave = (idea: AIProjectIdea) => {
    saveAIProject(idea, selectedImage);
    setSavedStatus((prev) => ({ ...prev, [idea.id]: true }));
    triggerConfetti();
  };

  return (
    <div className="lg:pl-[354px] min-h-screen bg-[#faf8f5] bg-creased-paper py-10 sm:py-14 px-4 sm:px-6 lg:px-10 transition-all">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef08a] border-2 border-black rounded-full font-display text-xs uppercase tracking-wider shadow-retro-sm mb-3">
            <Sparkles className="w-4 h-4 text-[#ef4444]" /> AI Multimodal Upcycling & Nostalgic Workshop
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0c0f14] leading-[1.05] tracking-tight mb-3">
            CREATE WITH <span className="marker-underline text-[#ef4444]">AI</span>
          </h1>
          <p className="font-hand text-xl text-zinc-700 font-bold leading-relaxed">
            Have leftover bamboo twigs, discarded caps, or cloth scraps? Upload a photo or select materials — our AI will formulate authentic Northeast DIY craft blueprints.
          </p>
        </div>

        {/* Top 2-Column Split: Upload / Camera Input & Vision Tag Recognizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Left 6 Cols: Dropzone & Sample Material Picker */}
          <div className="lg:col-span-6 card-retro bg-white p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-6 relative">
            <div className="pushpin-red" />

            <div className="flex items-center justify-between pr-6">
              <h2 className="font-display text-2xl font-bold text-[#0c0f14]">
                1. UPLOAD WHAT YOU HAVE
              </h2>
              <span className="font-display text-xs text-[#ef4444] uppercase">Vision Engine</span>
            </div>

            {/* Dropzone / Preview */}
            <div className="relative aspect-[16/10] rounded-xl bg-zinc-100 border-2 border-dashed border-black overflow-hidden group shadow-retro-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="Uploaded material" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <label className="btn-retro px-4 py-2 bg-white text-[#0c0f14] rounded-xl font-display text-xs uppercase cursor-pointer shadow-retro-sm flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" /> CHANGE PHOTO
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Sample Material Pickers */}
            <div>
              <span className="font-display text-xs uppercase tracking-wider text-zinc-600 block mb-2">
                Or Try Sample Household Scraps:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_INPUTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl bg-[#faf8f5] border-2 border-black hover:bg-[#fef08a] text-left transition-all flex flex-col items-center text-center gap-1 shadow-retro-sm"
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden border border-black bg-zinc-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sample.image} alt={sample.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-display text-[11px] font-bold text-[#0c0f14] truncate w-full">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra notes */}
            <div>
              <label className="block font-display text-xs uppercase tracking-wider text-zinc-600 mb-1">
                Add extra notes / available tools (Optional)
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. I also have scissors, jute string, and acrylic paint..."
                className="w-full px-3.5 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold text-[#0c0f14] placeholder-zinc-400 outline-none shadow-retro-sm"
              />
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunAIAnalysis}
              disabled={isAnalyzing}
              className="btn-retro w-full py-3.5 bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-50 text-white font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#fef08a]" /> ANALYZING RECYCLABLE OBJECTS...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-[#fef08a]" /> GENERATE CREATIVE BLUEPRINTS
                </>
              )}
            </button>
          </div>

          {/* Right 6 Cols: AI Vision Breakdown & Suggested Blueprints */}
          <div className="lg:col-span-6 card-retro bg-[#f4eee3] p-6 sm:p-8 border-[2.5px] border-[#0c0f14] shadow-retro-md space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-[#0c0f14]">
                2. AI MATERIAL DETECTION
              </h2>
              <span className="font-display text-xs text-[#059669] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" /> VISION READY
              </span>
            </div>

            {/* Recognized Elements */}
            <div>
              <span className="font-display text-xs uppercase tracking-wider text-zinc-600 block mb-2">
                Recognized Objects & Structural Elements:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {detectedTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white text-[#0c0f14] text-xs font-bold rounded-lg border-2 border-black shadow-retro-sm flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#ef4444]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Blueprints Cards */}
            <div>
              <span className="font-display text-xs uppercase tracking-wider text-zinc-600 block mb-2">
                Suggested Upcycling Projects ({generatedIdeas.length}):
              </span>
              <div className="space-y-2.5">
                {generatedIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => setSelectedIdea(idea)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedIdea.id === idea.id
                        ? 'bg-[#0c0f14] text-white border-black shadow-retro-yellow'
                        : 'bg-white text-[#0c0f14] border-black hover:bg-[#fed7aa] shadow-retro-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display text-xl font-bold leading-tight">
                        {idea.title}
                      </h4>
                      <span className="font-display text-xs px-2 py-0.5 rounded-md bg-[#fef08a] text-[#0c0f14] font-bold">
                        +{idea.xpReward} XP
                      </span>
                    </div>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${selectedIdea.id === idea.id ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {idea.concept}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] font-hand font-bold">
                      <span>⏱️ {idea.estimatedTime}</span>
                      <span>•</span>
                      <span>Difficulty: {idea.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Selected Project Full Detailed Blueprint Card */}
        {selectedIdea && (
          <div className="card-retro bg-white p-6 sm:p-10 border-[2.5px] border-[#0c0f14] shadow-retro-xl space-y-8 animate-in fade-in relative">
            <div className="washi-tape" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-2 border-dashed border-black/20">
              <div>
                <span className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold block mb-1">
                  SELECTED BLUEPRINT
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0c0f14]">
                  {selectedIdea.title}
                </h2>
                <p className="font-hand text-lg text-zinc-700 font-bold mt-1 max-w-2xl">
                  {selectedIdea.concept}
                </p>
              </div>

              <button
                onClick={() => handleSave(selectedIdea)}
                className="btn-retro px-5 py-3 bg-[#0c0f14] hover:bg-zinc-800 text-[#fef08a] font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-retro flex items-center gap-2"
              >
                {savedStatus[selectedIdea.id] ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#ef4444] fill-current" /> SAVED TO PASSPORT (+{selectedIdea.xpReward} XP)
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#fef08a]" /> SAVE PROJECT & CLAIM XP
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Instructions */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-display text-2xl font-bold text-[#0c0f14] mb-2">
                  STEP-BY-STEP DIY INSTRUCTIONS
                </h3>
                <div className="space-y-3">
                  {selectedIdea.stepByStep.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-[#faf8f5] border-2 border-black shadow-retro-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#ef4444] text-white font-display text-sm font-bold flex items-center justify-center shrink-0 border border-black shadow-retro-sm">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed mt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Safety Considerations */}
                {selectedIdea.safetyNotes && (
                  <div className="p-4 rounded-xl bg-[#fed7aa] border-2 border-black flex items-start gap-3 mt-6 shadow-retro-sm">
                    <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display text-xs font-bold text-[#0c0f14] uppercase mb-0.5">SAFETY & SUPERVISION</div>
                      <ul className="text-xs text-zinc-900 font-medium space-y-0.5">
                        {selectedIdea.safetyNotes.map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-black shadow-retro-sm bg-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedIdea.previewImageUrl} alt={selectedIdea.title} className="w-full h-full object-cover" />
                </div>

                {selectedIdea.culturalConnection && (
                  <div className="card-retro bg-[#f4eee3] p-4 border-2 border-black space-y-1">
                    <div className="font-display text-xs uppercase tracking-wider text-[#ef4444] font-bold">
                      NORTHEAST CULTURAL ROOTS
                    </div>
                    <p className="font-hand text-sm text-zinc-700 font-bold italic leading-relaxed">
                      &quot;{selectedIdea.culturalConnection}&quot;
                    </p>
                  </div>
                )}

                <div className="card-retro bg-white p-4 border-2 border-black space-y-2">
                  <div className="font-display text-xs uppercase tracking-wider text-zinc-500 font-bold">
                    SKILLS ACQUIRED
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedIdea.skillsLearned.map((sk, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-[#fef08a] text-[#0c0f14] text-xs font-bold rounded-lg border border-black shadow-retro-sm">
                        {sk}
                      </span>
                    ))}
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
