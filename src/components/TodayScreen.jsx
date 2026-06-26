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
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <section className="text-center space-y-2">
        <h1 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">The Practice</h1>
        <h2 className="text-3xl font-black text-slate-900">{today}</h2>
        <p className="text-slate-500 italic font-medium">Notice. Adapt. Commit.</p>
      </section>

      {hasTodayEntry && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Recommendation</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  latestEntry.recommendation.track === 'Green' ? 'bg-green-500' : 
                  latestEntry.recommendation.track === 'Yellow' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xl font-black text-slate-900">{latestEntry.recommendation.track} Track</span>
              </div>
            </div>
            <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-100">
              Score: {latestEntry.recommendation.score}
            </div>
          </div>
          
          <p className="text-sm text-slate-600 font-medium italic border-l-4 border-blue-100 pl-4 py-1">
            "{latestEntry.recommendation.message}"
          </p>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={onStartMorningPractice}
              className="flex-1 bg-slate-900 text-white text-sm font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              Resume Practice
            </button>
            <button 
              onClick={onStartCheckIn}
              className="bg-slate-100 text-slate-600 py-3 px-4 rounded-xl flex items-center justify-center border border-slate-200"
              title="Recheck"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 px-1">What kind of practice do you need today?</h3>
        
        <ActionCard 
          title="Morning Practice"
          subtitle="20–25 minutes to restore options and start the day athletic."
          icon={<Play size={24} className="text-blue-500" />}
          buttonText="Start Morning Practice"
          onClick={onStartMorningPractice}
          primary
        />

        <ActionCard 
          title="Full Practice"
          subtitle="Check in, get your track, and adapt today’s practice."
          icon={<ClipboardCheck size={24} className="text-green-500" />}
          buttonText="Start Check-In"
          onClick={onStartCheckIn}
        />

        <ActionCard 
          title="Movement Snack"
          subtitle="2–10 minutes for a specific need: neck, feet, back, or recovery."
          icon={<Coffee size={24} className="text-orange-500" />}
          buttonText="Choose a Snack"
          onClick={onStartSnacks}
        />
      </div>

      <section className="bg-slate-100 rounded-3xl p-6 opacity-80">
        <h4 className="font-black text-slate-500 mb-4 uppercase text-[10px] tracking-widest">The Principles</h4>
        <ul className="space-y-3 text-xs text-slate-600 font-medium">
          <li className="flex gap-3">
            <span className="text-blue-500 font-black">01</span>
            <span>Capacity compounds. Prioritize readiness over performance.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-black">02</span>
            <span>A modified practice is not a downgrade.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-black">03</span>
            <span>Every practice is information for tomorrow.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

const ActionCard = ({ title, subtitle, icon, buttonText, onClick, primary = false }) => (
  <div className={`bg-white rounded-3xl border-2 p-6 space-y-4 transition-all active:scale-[0.98] ${primary ? 'border-blue-600 shadow-md' : 'border-slate-100 shadow-sm'}`}>
    <div className="flex gap-4">
      <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-black text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">{subtitle}</p>
      </div>
    </div>
    <button 
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-colors ${
        primary ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}
    >
      {buttonText}
      <ArrowRight size={18} />
    </button>
  </div>
);

export default TodayScreen;
