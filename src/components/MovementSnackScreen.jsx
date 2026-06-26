import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { movementSnacks } from '../data/movementSnacks';
import SnackCard from './SnackCard';
import SnackDetail from './SnackDetail';
import SnackReflection from './SnackReflection';
import { cn } from '../utils/cn';

const MovementSnackScreen = ({ onBack, onSave }) => {
  const [view, setView] = useState('list'); // list, detail, reflection
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [completedTrack, setCompletedTrack] = useState(null);

  // Extract unique categories
  const categories = ['All', ...new Set(movementSnacks.flatMap(s => s.category))];

  const filteredSnacks = activeCategory === 'All' 
    ? movementSnacks 
    : movementSnacks.filter(s => s.category.includes(activeCategory));

  const handleSnackClick = (snack) => {
    setSelectedSnack(snack);
    setView('detail');
  };

  const handleSnackComplete = (track) => {
    setCompletedTrack(track);
    setView('reflection');
  };

  const handleSaveReflection = (reflectionData) => {
    const snackCompletion = {
      date: new Date().toISOString(),
      type: 'snack',
      snackId: selectedSnack.id,
      snackName: selectedSnack.name,
      duration: selectedSnack.duration,
      track: completedTrack,
      ...reflectionData
    };

    onSave(snackCompletion);

    // Reset and go back
    setView('list');
    setSelectedSnack(null);
    setCompletedTrack(null);
  };

  if (view === 'detail') {
    return (
      <SnackDetail 
        snack={selectedSnack} 
        onBack={() => setView('list')} 
        onComplete={handleSnackComplete}
      />
    );
  }

  if (view === 'reflection') {
    return (
      <SnackReflection 
        snack={selectedSnack} 
        onBack={() => setView('detail')} 
        onSave={handleSaveReflection}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 font-bold"
        >
          <ArrowLeft size={20} />
          Back to Hub
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Movement Snacks</h2>
        <p className="text-slate-500 font-medium">What do you need right now?</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 mask-fade-right">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all border-2",
              activeCategory === cat 
                ? "bg-slate-900 border-slate-900 text-white" 
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
            )}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSnacks.map(snack => (
          <SnackCard 
            key={snack.id} 
            snack={snack} 
            onClick={handleSnackClick} 
          />
        ))}
      </div>

      {filteredSnacks.length === 0 && (
        <div className="text-center py-12 text-slate-400 font-medium">
          No snacks found in this category.
        </div>
      )}
    </div>
  );
};

export default MovementSnackScreen;
