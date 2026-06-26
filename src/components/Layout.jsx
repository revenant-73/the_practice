import React from 'react';
import { Calendar, List, PlusCircle } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">The Practice</h1>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full p-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 z-10">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'today' ? 'text-blue-600' : 'text-slate-500'}`}
          >
            <Calendar size={24} />
            <span className="text-xs font-medium">Today</span>
          </button>
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'checkin' ? 'text-blue-600' : 'text-slate-500'}`}
          >
            <PlusCircle size={24} />
            <span className="text-xs font-medium">Check-In</span>
          </button>
          <button 
            onClick={() => setActiveTab('review')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'review' ? 'text-blue-600' : 'text-slate-500'}`}
          >
            <List size={24} />
            <span className="text-xs font-medium">Review</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
