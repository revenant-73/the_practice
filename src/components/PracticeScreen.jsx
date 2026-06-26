import React, { useState } from 'react';
import { Play, Check, ChevronRight, ChevronLeft, Info, ListChecks, Target } from 'lucide-react';

const PracticeScreen = ({ track, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const practiceSteps = [
    {
      name: 'Arrive',
      duration: '2-3 mins',
      purpose: 'Settle the nervous system and transition from "doing" to "noticing".',
      movements: [
        'Standing or seated stillness',
        '3-5 deep nasal breaths',
        'Body scan (head to toe)',
        'Check-in with current mood'
      ],
      modifications: {
        Green: 'Full presence. Scan for areas of high readiness.',
        Yellow: 'Focus on breathing through any areas of tension or restriction.',
        Red: 'Spend extra time here. Use floor support or a chair if needed.'
      }
    },
    {
      name: 'Spine Flow',
      duration: '3-5 mins',
      purpose: 'Restore segmental movement in the spine and wake up the core.',
      movements: [
        'Segmental Cat-Cow',
        'Lateral spine waves',
        'Thoracic rotations (quadruped)',
        'Gentle neck rolls'
      ],
      modifications: {
        Green: 'Explore full range of motion. Add weight shifts or reach throughs.',
        Yellow: 'Controlled range. Stay within a pain-free 70% range. Avoid sharp end-ranges.',
        Red: 'Micro-movements only. Focus on gentle mobilization and ease of breath.'
      }
    },
    {
      name: 'Feet & Achilles',
      duration: '4-6 mins',
      purpose: 'Wake up the feet, build Achilles capacity, and prepare for spring.',
      movements: [
        'Toe yoga / toe spreading',
        'Short-foot holds',
        'Slow calf raises (controlled)',
        'Bent-knee calf raises',
        'Tibialis raises',
        'Gentle ankle bounces'
      ],
      modifications: {
        Green: 'Full version. Include gentle pogo bounces and weighted raises if available.',
        Yellow: 'Reduce impact. Replace bounces with slow, controlled raises and isometrics.',
        Red: 'No bouncing or jumping. Use gentle foot exploration, toe wiggles, and self-massage.'
      }
    },
    {
      name: 'Athletic Transitions',
      duration: '5 mins',
      purpose: 'Integrate the whole body through ground-based movement.',
      movements: [
        'Bear crawl (slow)',
        'Lateral ape shift',
        'Lunge to rotation',
        'Deep squat hold / pry'
      ],
      modifications: {
        Green: 'Dynamic, multi-directional flow. Increase speed and complexity.',
        Yellow: 'Slow and deliberate. Use hands for support during lunges. Stay high in squats.',
        Red: 'Restorative floor transitions. Focus on rolling and gentle weight shifts.'
      }
    },
    {
      name: 'Play / Expression',
      duration: '3-5 mins',
      purpose: 'Express athletic qualities and enjoy movement.',
      movements: [
        'Rhythmic bouncing',
        'Low-level jumping / landing',
        'Balance challenges',
        'Sport-specific shadow work'
      ],
      modifications: {
        Green: 'Full expression. Max intent. Include reactive jumps or power work.',
        Yellow: 'Reduce impact. Focus on rhythm, balance, and quiet landings. No max jumps.',
        Red: 'Skip impact work. Replace with gentle balance, coordination, or eyes-closed standing.'
      }
    },
    {
      name: 'Finish',
      duration: '1 min',
      purpose: 'Seal the practice and prepare for the day.',
      movements: [
        'Final centering breath',
        'Notice one thing that changed',
        'Commit to today’s intent'
      ],
      modifications: {
        Green: 'Ready for full demands. Carry the athleticism into the day.',
        Yellow: 'Respect the adaptation. Move with quality over quantity today.',
        Red: 'Prioritize restoration. Stay mindful of threat levels during the day.'
      }
    }
  ];

  const step = practiceSteps[currentStep];

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] pb-12">
      <div className="flex justify-between items-center mb-6">
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

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <Target size={18} className="text-blue-500" />
            <span>Purpose</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            {step.purpose}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <ListChecks size={18} className="text-green-500" />
            <span>Movements</span>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {step.movements.map((m, i) => (
              <li key={i} className="flex gap-2 text-slate-600 text-sm italic">
                <span className="text-blue-500">•</span>
                {m}
              </li>
            ))}
          </ul>
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

      {/* Spacing for bottom nav and CTA */}
      <div className="h-8"></div>

      <div className="flex gap-4 sticky bottom-0 bg-slate-50 pt-4 pb-2">
        {currentStep > 0 && (
          <button 
            onClick={() => setCurrentStep(s => s - 1)}
            className="p-5 rounded-2xl bg-slate-100 text-slate-600 border border-slate-200"
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
