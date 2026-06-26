import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

const MovementSnackScreen = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 font-bold"
      >
        <ArrowLeft size={20} />
        Back to Hub
      </button>

      <div className="text-center space-y-4 py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-500">
          <Construction size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Movement Snacks</h2>
          <p className="text-slate-500 max-w-[240px] mx-auto">
            Targeted 2–10 minute options for neck, feet, back, and energy coming in v0.3.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 opacity-50">
        {['Neck & Thoracic', 'Feet & Achilles', 'Hips & Low Back', 'Energy Reset'].map(snack => (
          <div key={snack} className="p-5 bg-white rounded-2xl border border-slate-200 flex justify-between items-center italic text-slate-400 font-medium">
            <span>{snack}</span>
            <span className="text-[10px] uppercase font-black tracking-widest">Coming Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovementSnackScreen;
