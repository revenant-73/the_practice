import React from 'react';
import { Target, ArrowRight, AlertCircle } from 'lucide-react';

const RecommendationScreen = ({ recommendation, onStartPractice }) => {
  const getTrackColor = (track) => {
    switch (track) {
      case 'Green': return 'text-green-600 bg-green-50 border-green-200';
      case 'Yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Red': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getTrackButtonColor = (track) => {
    switch (track) {
      case 'Green': return 'bg-green-600 hover:bg-green-700';
      case 'Yellow': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Red': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Daily Readiness</h2>
        <div className="text-6xl font-black text-slate-900">{recommendation.score}</div>
        <p className="text-slate-400 font-medium">Readiness Score</p>
      </div>

      <div className={`p-6 rounded-2xl border-2 ${getTrackColor(recommendation.track)} space-y-4`}>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black uppercase tracking-tight">{recommendation.track} Track</span>
          {recommendation.track === 'Red' && <AlertCircle size={24} />}
        </div>
        <p className="font-bold leading-relaxed text-lg italic text-center">
          {recommendation.message}
        </p>
      </div>

      {recommendation.priorityAreas.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Target size={20} className="text-blue-500" />
            <span>Priority Areas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendation.priorityAreas.map(area => (
              <span key={area} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-blue-400 uppercase text-xs tracking-widest">Today's Focus</h3>
        <ul className="space-y-3">
          {recommendation.track === 'Green' ? (
            <>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">01</span>
                <span>Full Morning Practice v0.1</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">02</span>
                <span>Full intensity strength / power work</span>
              </li>
            </>
          ) : recommendation.track === 'Yellow' ? (
            <>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">01</span>
                <span>Adaptive Practice (reduced jumping)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">02</span>
                <span>Emphasize priority areas: {recommendation.priorityAreas.length > 0 ? recommendation.priorityAreas.join(', ') : 'None identified'}</span>
              </li>
            </>
          ) : (
            <>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">01</span>
                <span>Restorative Movement only</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">02</span>
                <span>Breathing, floor flow, and easy walking</span>
              </li>
            </>
          )}
        </ul>
      </div>

      <button 
        onClick={onStartPractice}
        className={`w-full text-white font-bold py-5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.98] ${getTrackButtonColor(recommendation.track)}`}
      >
        Go to Practice
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default RecommendationScreen;
