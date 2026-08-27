'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AIProjectIdea } from '@/types';
import {
  Sparkles,
  UploadCloud,
  Image as ImageIcon,
  Camera,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Flame,
  Layers,
  Wand2,
  RefreshCw
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
      concept: 'A soothing balcony chime tuned to traditional folk pentatonic scales using hollow bamboo tubes and river stones.',
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
  const { saveAIProject, user, t } = useApp();
  
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
    }, 1200);
  };

  const handleSave = (idea: AIProjectIdea) => {
    saveAIProject(idea, selectedImage);
    setSavedStatus((prev) => ({ ...prev, [idea.id]: true }));
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fe997c]/20 text-[#772f1a] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#974730]" /> AI Multimodal Upcycling & Nostalgic Creation
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#061b0e] leading-tight mb-4">
            {t.navCreateWithAI}
          </h1>
          <p className="text-base text-[#434843] leading-relaxed">
            Have leftover bamboo splints, discarded bottles, or coconut shells? Upload a photo or describe what you have. Our AI multimodal assistant will analyze the materials and formulate step-by-step blueprints for nostalgic crafts and toys.
          </p>
        </div>

        {/* Top Split: Upload/Image Input & Material Recognizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left: Media Dropzone & Sample Picker */}
          <div className="lg:col-span-6 bg-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#061b0e]">
                1. Upload What You Have
              </h2>
              <span className="text-xs font-bold text-[#974730] uppercase">Image + Description</span>
            </div>

            {/* Dropzone & Preview */}
            <div className="relative aspect-[16/10] rounded-2xl bg-[#f0eee8] border-2 border-dashed border-[#c3c8c1] overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="Uploaded material" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#061b0e]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <label className="px-4 py-2 bg-[#ffffff] text-[#061b0e] rounded-full text-xs font-bold uppercase cursor-pointer hover:bg-[#f6f3ed] shadow-lg flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" /> Change Photo
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Sample Material Pickers */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block mb-2">
                Or Try Sample Household Materials:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_INPUTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl bg-[#fcf9f3] border border-[#c3c8c1]/60 hover:border-[#974730] text-left transition-colors flex flex-col items-center text-center gap-1.5"
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden bg-[#e5e2dc]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sample.image} alt={sample.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-[#061b0e] line-clamp-1">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text description input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">
                Add extra notes / available tools (Optional)
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g., I also have scissors, a candle, and red paint..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#f6f3ed] border border-[#c3c8c1] text-xs text-[#061b0e] focus:border-[#974730] outline-none"
              />
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunAIAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-[#061b0e] hover:bg-[#1b3022] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#fbbb51]" /> Analyzing Multimodal Objects...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-[#fbbb51]" /> Generate Creative Blueprints
                </>
              )}
            </button>
          </div>

          {/* Right: AI Vision Breakdown & Detected Materials */}
          <div className="lg:col-span-6 bg-[#f0eee8] rounded-3xl p-6 sm:p-8 border border-[#c3c8c1] shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#061b0e]">
                2. AI Material Detection
              </h2>
              <span className="text-xs font-bold text-[#1b3022] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#819986]" /> Vision Engine Ready
              </span>
            </div>

            {/* Identified Tags */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block mb-2">
                Recognized Objects & Structural Elements:
              </span>
              <div className="flex flex-wrap gap-2">
                {detectedTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#ffffff] text-[#061b0e] text-xs font-bold rounded-full border border-[#c3c8c1] shadow-sm flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#974730]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Idea Selection Carousel */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#737973] block mb-2">
                Suggested Upcycling Projects ({generatedIdeas.length}):
              </span>
              <div className="space-y-3">
                {generatedIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => setSelectedIdea(idea)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedIdea.id === idea.id
                        ? 'bg-[#ffffff] border-[#974730] shadow-md ring-2 ring-[#974730]/20'
                        : 'bg-[#ffffff]/60 border-[#c3c8c1]/60 hover:bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display text-base font-bold text-[#061b0e]">
                        {idea.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#fbbb51]/20 text-[#281800]">
                        +{idea.xpReward} XP
                      </span>
                    </div>
                    <p className="text-xs text-[#434843] line-clamp-2 leading-relaxed">
                      {idea.concept}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-[#737973] font-semibold">
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

        {/* Selected Project Full Detailed Blueprint */}
        {selectedIdea && (
          <div className="bg-[#ffffff] rounded-3xl border border-[#c3c8c1] p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#f0eee8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#974730] block mb-1">
                  Selected Blueprint
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#061b0e]">
                  {selectedIdea.title}
                </h2>
                <p className="text-sm text-[#434843] mt-2 max-w-2xl">
                  {selectedIdea.concept}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSave(selectedIdea)}
                  className="px-6 py-3 bg-[#974730] hover:bg-[#772f1a] text-[#fcf9f3] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {savedStatus[selectedIdea.id] ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 fill-current" /> Saved to Archive (+{selectedIdea.xpReward} XP)
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" /> Save Project & Earn XP
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Steps */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-display text-xl font-bold text-[#061b0e] mb-2">
                  Step-by-Step DIY Instructions
                </h3>
                <div className="space-y-3">
                  {selectedIdea.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1]/40">
                      <div className="w-6 h-6 rounded-full bg-[#1b3022] text-[#fcf9f3] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-[#1c1c18] leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Safety Considerations */}
                {selectedIdea.safetyNotes && (
                  <div className="p-4 rounded-2xl bg-[#fe997c]/15 border border-[#fe997c]/40 flex items-start gap-3 mt-6">
                    <AlertTriangle className="w-5 h-5 text-[#974730] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#772f1a] uppercase mb-1">Safety & Supervision</div>
                      <ul className="text-xs text-[#772f1a] space-y-1">
                        {selectedIdea.safetyNotes.map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Info: Cultural Link & Visual Preview */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Visual Preview Card */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0eee8] border border-[#c3c8c1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedIdea.previewImageUrl} alt={selectedIdea.title} className="w-full h-full object-cover" />
                </div>

                {/* Cultural Connection */}
                {selectedIdea.culturalConnection && (
                  <div className="p-4 rounded-2xl bg-[#f0eee8] border border-[#c3c8c1] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#974730]">
                      Northeast Cultural Roots
                    </div>
                    <p className="text-xs text-[#434843] leading-relaxed italic">
                      &quot;{selectedIdea.culturalConnection}&quot;
                    </p>
                  </div>
                )}

                {/* Skills Acquired */}
                <div className="p-4 rounded-2xl bg-[#fcf9f3] border border-[#c3c8c1] space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#737973]">
                    Skills Progressed
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIdea.skillsLearned.map((sk, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#ffffff] text-[#061b0e] text-xs font-semibold rounded-full border border-[#c3c8c1]/40">
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
