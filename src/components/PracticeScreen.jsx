import React, { useState } from 'react';
import { Play, Check, ChevronRight, ChevronLeft, Info, ListChecks, Target, Eye } from 'lucide-react';

const PracticeScreen = ({ track, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const practiceSteps = [
    {
      name: 'Arrive',
      duration: '2-3 mins',
      purpose: 'Shift from sleep/stress into awareness and movement.',
      movements: [
        {
          name: 'Diaphragmatic Breathing',
          why: 'Notice breath, ribs, and tension.',
          how: 'Lie on back, knees bent. Inhale expand ribs/belly, exhale soften into floor.',
          notice: 'Where does the breath move easily? Where does it feel blocked?',
          adapt: {
            Green: '5 slow breaths.',
            Yellow: '6-8 breaths, extend the exhale.',
            Red: 'Stay here longer. Can be the main practice.'
          }
        },
        {
          name: 'Eye Movements',
          why: 'Wake up visual system and reduce neck tension.',
          how: 'Head still. Move eyes Left/Right, Up/Down, Diagonals slowly.',
          notice: 'Does one direction feel harder or jumpier?',
          adapt: {
            Green: 'Smooth control in all directions.',
            Yellow: 'Reduce range and move slower.',
            Red: 'Only comfortable directions. Stop if dizzy.'
          }
        },
        {
          name: 'Head Nods + Rotations',
          why: 'Gently check and restore neck motion.',
          how: 'Nod yes, turn no, ear to shoulder. Stay below sharp pain.',
          notice: 'Which direction feels guarded?',
          adapt: {
            Green: 'Full comfortable range.',
            Yellow: 'Smaller range and slower speed.',
            Red: 'Micro-movements or breathing only.'
          }
        },
        {
          name: 'Rolling',
          why: 'Whole-body coordination through a simple pattern.',
          how: 'Lie on back. Reach one arm across and let body follow to stomach. Roll back.',
          notice: 'Which lead (eyes, arm, leg) makes the roll easier?',
          adapt: {
            Green: 'Explore multiple ways to initiate.',
            Yellow: 'Move slowly, reduce effort.',
            Red: 'Small partial rolls or rock side to side.'
          }
        }
      ]
    },
    {
      name: 'Spine Flow',
      duration: '3-5 mins',
      purpose: 'Restore spinal options through flexion, extension, rotation, and side-body reach.',
      movements: [
        {
          name: 'Segmental Cat-Cow',
          why: 'Spinal flexion and extension without forcing range.',
          how: 'On hands and knees. Round spine up, then lengthen and extend.',
          notice: 'Try to move one region at a time.',
          adapt: {
            Green: 'Full comfortable wave.',
            Yellow: 'Slow down, stay in controlled range.',
            Red: 'Small range paired with breathing.'
          }
        },
        {
          name: 'Thread the Needle',
          why: 'Open rotation through upper back and ribs.',
          how: 'Reach one arm underneath body. Return and optionally reach to ceiling.',
          notice: 'Can the ribs rotate without the low back doing all the work?',
          adapt: {
            Green: 'Add reach toward the ceiling.',
            Yellow: 'Controlled range, avoid forcing end-range.',
            Red: 'Smaller reach or perform from child’s pose.'
          }
        },
        {
          name: 'World’s Greatest Stretch',
          why: 'Connect hip mobility, trunk rotation, and breathing.',
          how: 'Long lunge, hands inside foot. Reach arm to ceiling, rotate upper back.',
          notice: 'Where is the limit: hip, ankle, spine, or breath?',
          adapt: {
            Green: 'Full controlled lunge and reach.',
            Yellow: 'Shorten stance, reduce depth.',
            Red: 'Hands elevated on couch/bench/wall.'
          }
        },
        {
          name: 'Open Books',
          why: 'Upper-back rotation supported by the floor.',
          how: 'Side-lying, knees bent. Open top arm across body like a book.',
          notice: 'Can the breath expand into the rotated position?',
          adapt: {
            Green: 'Full comfortable arc.',
            Yellow: 'Reduce range, pause at restriction.',
            Red: 'Small movement. Support knee with pillow.'
          }
        }
      ]
    },
    {
      name: 'Feet & Achilles',
      duration: '4-6 mins',
      purpose: 'Wake up the feet, restore awareness, and gently load the calf/Achilles complex.',
      movements: [
        {
          name: 'Toe Yoga',
          why: 'Wake up small movements of the feet.',
          how: 'Big toe up/others down, then switch. Spread all toes.',
          notice: 'Which toes are hard to access?',
          adapt: {
            Green: 'Perform standing.',
            Yellow: 'Perform seated or with hand support.',
            Red: 'Seated only, gentle exploration.'
          }
        },
        {
          name: 'Short-Foot Holds',
          why: 'Active arch support without gripping toes.',
          how: 'Draw ball of foot toward heel to lift arch. Hold briefly.',
          notice: 'Can you lift the arch without curling toes?',
          adapt: {
            Green: 'Standing or single-leg assisted.',
            Yellow: 'Perform with hand support.',
            Red: 'Perform seated.'
          }
        },
        {
          name: 'Slow Calf Raises',
          why: 'Load calf and Achilles through controlled range.',
          how: 'Rise onto balls of feet, pause, lower slowly.',
          notice: 'Does one side feel weaker or more protective?',
          adapt: {
            Green: 'Full reps. Optional single-leg assisted.',
            Yellow: 'Two legs, slow tempo.',
            Red: 'Isometric holds or seated raises.'
          }
        },
        {
          name: 'Ankle Bounces / Pogos',
          why: 'Reintroduce spring and landing rhythm.',
          how: 'Small hops or rhythmic bounces. Keep knees soft. Land quietly.',
          notice: 'Can you rebound quietly without bracing?',
          adapt: {
            Green: '20 rhythmic pogos.',
            Yellow: 'Small ankle bounces only.',
            Red: 'Skip. Replace with pressure shifts.'
          }
        }
      ]
    },
    {
      name: 'Athletic Transitions',
      duration: '5 mins',
      purpose: 'Build whole-body coordination through crawling, lunging, and squatting.',
      movements: [
        {
          name: 'Deep Squat Exploration',
          why: 'Explore comfort near the floor.',
          how: 'Lower into squat, shift side to side, let spine/hips adjust.',
          notice: 'What limits the squat today?',
          adapt: {
            Green: 'Unsupported, shift directions.',
            Yellow: 'Use hands or doorframe for support.',
            Red: 'Higher squat or sit-to-stand from chair.'
          }
        },
        {
          name: 'Reverse Lunges',
          why: 'Prepare hips and legs for single-leg loading.',
          how: 'Step back, lower with control, push through front foot to return.',
          notice: 'Does one side feel less stable?',
          adapt: {
            Green: 'Full controlled lunges.',
            Yellow: 'Shorter step or hand support.',
            Red: 'Supported split-stance weight shift.'
          }
        },
        {
          name: 'Bear Crawl',
          why: 'Connect shoulders, hips, spine, and core.',
          how: 'Opposite hand and foot move together. Slow and controlled.',
          notice: 'Can you move without holding your breath?',
          adapt: {
            Green: 'Hands and feet, forward/backward.',
            Yellow: 'Hands and knees or shorter distance.',
            Red: 'Quadruped rocking.'
          }
        },
        {
          name: 'Floor-to-Standing',
          why: 'Practice getting down and up in different ways.',
          how: 'Get to floor using one pathway, return using another.',
          notice: 'Which pathway feels easiest?',
          adapt: {
            Green: 'Explore no-hands options.',
            Yellow: 'Use hands, controlled tempo.',
            Red: 'Supported sit-to-stand from chair.'
          }
        }
      ]
    },
    {
      name: 'Play / Expression',
      duration: '3-5 mins',
      purpose: 'Remind the body that it is athletic, rhythmic, and adaptable.',
      movements: [
        {
          name: 'Skipping / Shuffle',
          why: 'Restore playful rhythm and lateral movement.',
          how: 'Light skipping or side-to-side shuffle in athletic stance.',
          notice: 'Does it feel playful or heavy?',
          adapt: {
            Green: 'Light athletic rhythm.',
            Yellow: 'Low impact march-skip or slow shuffle.',
            Red: 'Gentle side steps or weight shifts.'
          }
        },
        {
          name: 'Single-Leg Balance',
          why: 'Build foot, ankle, and hip awareness.',
          how: 'Stand on one foot, toes relaxed. Small corrections.',
          notice: 'What does the foot do to keep you balanced?',
          adapt: {
            Green: 'Add head turns or reaches.',
            Yellow: 'Use fingertip support.',
            Red: 'Two feet with pressure shifts.'
          }
        },
        {
          name: 'VB Shadow Work',
          why: 'Reconnect to volleyball approach and defensive rhythm.',
          how: 'Slow approach pattern or defensive stance weight shifts.',
          notice: 'Does the movement feel springy or guarded?',
          adapt: {
            Green: 'Full approach with controlled jump.',
            Yellow: 'No jump, focus on footwork rhythm.',
            Red: 'Walk-through only.'
          }
        }
      ]
    },
    {
      name: 'Finish',
      duration: '1 min',
      purpose: 'Seal the practice with quiet power and reflection.',
      movements: [
        {
          name: 'Beautiful Vertical Jumps',
          why: 'Finish with athletic intent (beauty > height).',
          how: 'Smooth jump, land softly, pause after each landing.',
          notice: 'Did it feel springy, heavy, or guarded?',
          adapt: {
            Green: '3 smooth jumps, moderate intent.',
            Yellow: '1-2 easy jumps or calf-rise reach.',
            Red: 'Tall reach and breath only.'
          }
        },
        {
          name: 'Final Breath',
          why: 'Notice what changed.',
          how: 'Stand still, take one slow breath, scan the body.',
          notice: 'Do I feel more available than when I started?',
          adapt: {
            Green: 'Ready for full demands.',
            Yellow: 'Quality over quantity today.',
            Red: 'Stay mindful of threat levels.'
          }
        }
      ]
    }
  ];

  const step = practiceSteps[currentStep];

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] pb-12">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Section {currentStep + 1} of {practiceSteps.length}
        </span>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
          track === 'Green' ? 'bg-green-100 text-green-700' :
          track === 'Yellow' ? 'bg-yellow-100 text-yellow-700' : 
          track === 'Red' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {track} Mode
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-900 leading-tight">{step.name}</h2>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Play size={16} />
            <span>{step.duration}</span>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
            <Target size={14} />
            <span>Section Purpose</span>
          </div>
          <p className="text-slate-200 font-medium italic leading-relaxed">
            {step.purpose}
          </p>
        </div>

        <div className="space-y-6">
          {step.movements.map((m, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-black text-slate-900">{m.name}</h3>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Move {idx + 1}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Why</p>
                  <p className="text-sm text-slate-700 font-medium">{m.why}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">How</p>
                  <p className="text-sm text-slate-700">{m.how}</p>
                </div>

                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                    <Eye size={12} />
                    <span>Notice</span>
                  </div>
                  <p className="text-sm text-blue-900 italic font-medium">{m.notice}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Adapt ({track})</p>
                  <p className="text-sm text-slate-800 font-bold">{m.adapt[track] || m.adapt.Green}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-20"></div>

      <div className="flex gap-4 sticky bottom-0 bg-slate-50 pt-4 pb-2 z-20">
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
            Next Section
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
