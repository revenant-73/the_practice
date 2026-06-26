import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '../utils/cn';

const SnackDetail = ({ snack, onBack, onComplete, initialTrack = 'yellow' }) => {
  const [selectedTrack, setSelectedTrack] = useState(initialTrack);

  const tracks = [
    { id: 'red', label: 'Gentle', color: 'bg-red-50 text-red-700 border-red-100', activeColor: 'bg-red-500 text-white border-red-500' },
    { id: 'yellow', label: 'Standard', color: 'bg-amber-50 text-amber-700 border-amber-100', activeColor: 'bg-amber-500 text-white border-amber-500' },
    { id: 'green', label: 'Build', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', activeColor: 'bg-emerald-500 text-white border-emerald-500' }
  ];

  return (
    <div className="space-y-6 pb-32 animate-in slide-in-from-right duration-300">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 font-bold"
      >
        <ArrowLeft size={20} />
        Back to Snacks
      </button>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {snack.category.map(cat => (
            <span key={cat} className="text-[10px] uppercase font-black tracking-widest text-blue-500">
              {cat}
            </span>
          ))}
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-tight">{snack.name}</h2>
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Info size={16} />
          <p className="text-sm">{snack.best_used_when}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-2">
        <h3 className="font-black text-blue-900 text-sm uppercase tracking-wider">Purpose</h3>
        <p className="text-blue-800 font-medium leading-relaxed">
          {snack.purpose}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider px-1">Movements</h3>
        <div className="space-y-3">
          {snack.movements.map((movement, idx) => (
            <div key={idx} className="flex gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="mt-0.5 text-blue-500">
                <CheckCircle2 size={18} />
              </div>
              <span className="text-slate-700 font-medium">{movement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">What to Notice</h3>
        <p className="text-slate-600 font-medium italic">
          "{snack.what_to_notice}"
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider px-1">Intensity / Adaptation</h3>
        <div className="grid grid-cols-3 gap-2">
          {tracks.map(track => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={cn(
                "py-3 px-1 rounded-xl font-black text-xs border-2 transition-all",
                selectedTrack === track.id ? track.activeColor : track.color
              )}
            >
              {track.label}
            </button>
          ))}
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 min-h-[80px]">
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            <span className="font-black uppercase text-[10px] block mb-1 text-slate-400">Current Guide:</span>
            {snack.track_adaptations[selectedTrack]}
          </p>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={() => onComplete(selectedTrack)}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
        >
          Complete Snack
          <CheckCircle2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default SnackDetail;
