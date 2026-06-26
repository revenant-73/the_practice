import React from 'react';
import { ArrowRight, Play, ClipboardCheck, Coffee, RefreshCw } from 'lucide-react';

const TodayScreen = ({ latestEntry, onStartMorningPractice, onStartCheckIn, onStartSnacks }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const hasTodayEntry = latestEntry && new Date(latestEntry.date).toDateString() === new Date().toDateString();

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-12">
      <section className="text-center space-y-1">
        <h1 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">The Practice</h1>
        <h2 className="text-xl font-black text-slate-900">{today}</h2>
        <p className="text-xs text-slate-500 italic font-medium">Notice. Adapt. Commit.</p>
      </section>

      {hasTodayEntry && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-3 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Today's Track</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  latestEntry.recommendation.track === 'Green' ? 'bg-green-500' : 
                  latestEntry.recommendation.track === 'Yellow' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-base font-black text-slate-900">{latestEntry.recommendation.track}</span>
              </div>
            </div>
            <div className="bg-slate-50 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-500 border border-slate-100">
              Score: {latestEntry.recommendation.score}
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onStartMorningPractice}
              className="flex-[3] bg-slate-900 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              Resume Practice
            </button>
            <button 
              onClick={onStartCheckIn}
              className="flex-1 bg-slate-100 text-slate-600 py-2.5 px-4 rounded-xl flex items-center justify-center border border-slate-200"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-800 px-1 uppercase tracking-wider">Today's Practice</h3>
        
        <ActionCard 
          title="Morning Practice"
          subtitle="20–25m • Restore & Athleticize"
          icon={<Play size={18} className="text-blue-500" />}
          onClick={onStartMorningPractice}
          primary
        />

        <ActionCard 
          title="Full Practice"
          subtitle="Check-in • Personalized Track"
          icon={<ClipboardCheck size={18} className="text-green-500" />}
          onClick={onStartCheckIn}
        />

        <ActionCard 
          title="Movement Snack"
          subtitle="2–10m • Specific Needs"
          icon={<Coffee size={18} className="text-orange-500" />}
          onClick={onStartSnacks}
        />
      </div>

      <section className="bg-slate-100 rounded-2xl p-4 opacity-80">
        <h4 className="font-black text-slate-500 mb-2 uppercase text-[9px] tracking-widest text-center">Principles</h4>
        <div className="flex justify-between gap-2 text-[9px] text-slate-600 font-bold uppercase text-center">
          <div className="flex-1">Capacity First</div>
          <div className="flex-1">Adapt & Thrive</div>
          <div className="flex-1">Practice is Info</div>
        </div>
      </section>
    </div>
  );
};

const ActionCard = ({ title, subtitle, icon, onClick, primary = false }) => (
  <button 
    onClick={onClick}
    className={`w-full bg-white rounded-2xl border-2 p-3 flex items-center gap-4 transition-all active:scale-[0.98] text-left ${primary ? 'border-blue-600 shadow-sm' : 'border-slate-100 shadow-sm'}`}
  >
    <div className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-base font-black text-slate-900 leading-tight">{title}</h4>
      <p className="text-[11px] text-slate-500 font-medium truncate">{subtitle}</p>
    </div>
    <ArrowRight size={16} className={primary ? 'text-blue-600' : 'text-slate-300'} />
  </button>
);

export default TodayScreen;
