import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const SnackCard = ({ snack, onClick }) => {
  return (
    <button
      onClick={() => onClick(snack)}
      className="w-full text-left p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors group space-y-3"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex flex-wrap gap-2">
            {snack.category.map(cat => (
              <span key={cat} className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {snack.name}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-bold text-sm bg-slate-50 px-2 py-1 rounded-lg">
          <Clock size={14} />
          <span>{snack.duration.replace(' minutes', 'm').replace(' minute', 'm')}</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-500 line-clamp-2">
        <span className="font-bold text-slate-700">Best for: </span>
        {snack.best_used_when}
      </p>

      <div className="flex items-center gap-2 text-blue-500 font-bold text-sm pt-2">
        <span>Start Snack</span>
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};

export default SnackCard;
