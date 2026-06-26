import React, { useState } from 'react';
import { Play, Check, ChevronRight, ChevronLeft, Info } from 'lucide-react';

const PracticeScreen = ({ track, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const practiceSteps = [
    {
      name: 'Arrive',
      duration: '2-3 mins',
      description: 'Find your space. Notice your breath. Ground your feet.',
      modifications: {
        Green: 'Full presence.',
        Yellow: 'Focus on breathing through any areas of tension.',
        Red: 'Spend extra time here. Use floor support if needed.'
      }
    },
    {
      name: 'Spine Flow',
      duration: '3-5 mins',
      description: 'Segmental cat-cow, lateral waves, and rotations.',
      modifications: {
        Green: 'Full range of motion, explore corners.',
        Yellow: 'Controlled range. Avoid end-range if sharp.',
        Red: 'Micro-movements. Focus on ease and safety.'
      }
    },
    {
      name: 'Feet & Achilles',
      duration: '4-6 mins',
      description: 'Toe yoga, arch lifts, and loaded dorsiflexion.',
      modifications: {
        Green: 'Add weight or dynamic pulsing.',
        Yellow: 'Isometrics only if Achilles is grumpy.',
        Red: 'Seated self-massage and gentle toe wiggles.'
      }
    },
    {
      name: 'Athletic Transitions',
      duration: '5 mins',
      description: 'Crawling, lunging, and weight shifts.',
      modifications: {
        Green: 'Dynamic, multi-directional flow.',
        Yellow: 'Slow and deliberate. Use hands for support.',
        Red: 'Restorative floor transitions only.'
      }
    },
    {
      name: 'Play / Expression',
      duration: '3-5 mins',
      description: 'Jumping, rhythmic bouncing, or sport-specific skill.',
      modifications: {
        Green: 'Full expression. Max intent.',
        Yellow: 'Reduce impact. Focus on rhythm and landing.',
        Red: 'Skip. Replace with gentle balance or coordination.'
      }
    },
    {
      name: 'Finish',
      duration: '1 min',
      description: 'Seal the practice. Notice what changed.',
      modifications: {
        Green: 'Ready to go.',
        Yellow: 'Notice the adaptation.',
        Red: 'Grateful for the restoration.'
      }
    }
  ];

  const step = practiceSteps[currentStep];

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Step {currentStep + 1} of {practiceSteps.length}
        </span>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
          track === 'Green' ? 'bg-green-100 text-green-700' :
          track === 'Yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {track} Track Mode
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-900 leading-tight">{step.name}</h2>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Play size={16} />
            <span>{step.duration}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[160px] flex items-center justify-center text-center text-xl text-slate-700 leading-relaxed">
          {step.description}
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase tracking-wider">
            <Info size={16} />
            <span>Track Modification</span>
          </div>
          <p className="text-blue-900 font-medium italic">
            {step.modifications[track]}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {currentStep > 0 && (
          <button 
            onClick={() => setCurrentStep(s => s - 1)}
            className="p-5 rounded-2xl bg-slate-100 text-slate-600"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentStep < practiceSteps.length - 1 ? (
          <button 
            onClick={() => setCurrentStep(s => s + 1)}
            className="flex-1 py-5 px-6 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            Next Step
            <ChevronRight size={24} />
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="flex-1 py-5 px-6 rounded-2xl bg-green-600 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            Finish Practice
            <Check size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeScreen;
