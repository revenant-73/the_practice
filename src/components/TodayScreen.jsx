import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const TodayScreen = ({ latestEntry, onStartCheckIn }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">{today}</h2>
        <p className="text-slate-500 italic">Notice. Adapt. Commit.</p>
      </section>

      {!latestEntry || new Date(latestEntry.date).toDateString() !== new Date().toDateString() ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Good morning.</h3>
            <p className="text-slate-600">How is your body feeling today?</p>
          </div>
          <button 
            onClick={onStartCheckIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Start Daily Check-In
            <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <CheckCircle2 size={24} />
              <span>Check-in Complete</span>
            </div>
            <div className="pt-2">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Today's Track</p>
              <div className={`text-2xl font-black ${
                latestEntry.recommendation.track === 'Green' ? 'text-green-600' : 
                latestEntry.recommendation.track === 'Yellow' ? 'text-yellow-500' : 'text-red-600'
              }`}>
                {latestEntry.recommendation.track} Track
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg italic text-slate-700">
              "{latestEntry.recommendation.message}"
            </div>
            {latestEntry.reflection ? (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-1 font-medium">Reflection Saved</p>
                <p className="text-slate-700 text-sm line-clamp-2">{latestEntry.reflection.whatChanged}</p>
              </div>
            ) : (
              <button 
                onClick={() => onStartCheckIn()} // This would need to skip to reflection or practice
                className="w-full py-3 px-4 border-2 border-slate-200 text-slate-600 font-bold rounded-xl"
              >
                Complete Practice & Reflect
              </button>
            )}
          </div>
        </div>
      )}

      <section className="bg-slate-100 rounded-2xl p-6">
        <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Principles</h4>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Capacity compounds. Prioritize readiness over performance.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>A modified practice is not a downgrade.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Every practice is information for tomorrow.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TodayScreen;
