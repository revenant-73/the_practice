import React, { useState } from 'react';
import { ArrowLeft, Save, Smile, Frown, Meh, Sparkles, Zap, Moon, Battery, ThumbsDown } from 'lucide-react';
import { cn } from '../utils/cn';

const SnackReflection = ({ snack, onSave, onBack }) => {
  const [result, setResult] = useState(null);
  const [note, setNote] = useState('');

  const options = [
    { id: 'neck_freer', label: 'Neck freer', icon: Sparkles, color: 'text-blue-500' },
    { id: 'feet_better', label: 'Feet better', icon: Zap, color: 'text-amber-500' },
    { id: 'achilles_calmer', label: 'Achilles calmer', icon: Moon, color: 'text-indigo-500' },
    { id: 'back_easier', label: 'Back easier', icon: Battery, color: 'text-emerald-500' },
    { id: 'energy_up', label: 'Energy up', icon: Zap, color: 'text-yellow-500' },
    { id: 'stress_down', label: 'Stress down', icon: Moon, color: 'text-purple-500' },
    { id: 'no_change', label: 'No change', icon: Meh, color: 'text-slate-400' },
    { id: 'worse', label: 'Worse', icon: ThumbsDown, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 font-bold"
      >
        <ArrowLeft size={20} />
        Back to Detail
      </button>

      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-black text-slate-900">What changed?</h2>
        <p className="text-slate-500 font-medium">{snack.name} complete.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setResult(option.id)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-sm font-black",
                result === option.id 
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
              )}
            >
              <Icon size={24} className={result === option.id ? "text-white" : option.color} />
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
          Anything worth remembering?
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional notes..."
          className="w-full h-32 p-5 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 transition-all font-medium text-slate-700 placeholder:text-slate-300"
        />
      </div>

      <button
        onClick={() => onSave({ result, note })}
        className={cn(
          "w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl",
          result 
            ? "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700" 
            : "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
        )}
        disabled={!result}
      >
        Save Reflection
        <Save size={24} />
      </button>
    </div>
  );
};

export default SnackReflection;
