import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodayScreen from './components/TodayScreen';
import CheckInScreen from './components/CheckInScreen';
import RecommendationScreen from './components/RecommendationScreen';
import PracticeScreen from './components/PracticeScreen';
import ReflectionScreen from './components/ReflectionScreen';
import ReviewScreen from './components/ReviewScreen';
import { calculateReadiness } from './utils/readinessLogic';

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [currentScreen, setCurrentScreen] = useState('main'); // main, checkin, recommendation, practice, reflection
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('the_practice_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse entries', e);
      }
    }
  }, []);

  // Save to localStorage when entries change
  useEffect(() => {
    localStorage.setItem('the_practice_entries', JSON.stringify(entries));
  }, [entries]);

  const latestEntry = entries.length > 0 ? entries.sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;

  const handleStartCheckIn = () => {
    setCurrentScreen('checkin');
  };

  const handleCheckInComplete = (inputs) => {
    const recommendation = calculateReadiness(inputs);
    const entry = {
      date: new Date().toISOString(),
      checkIn: inputs,
      recommendation,
      reflection: null
    };
    setCurrentEntry(entry);
    setCurrentScreen('recommendation');
  };

  const handleStartPractice = () => {
    setCurrentScreen('practice');
  };

  const handlePracticeComplete = () => {
    setCurrentScreen('reflection');
  };

  const handleReflectionSave = (reflection) => {
    const finalEntry = { ...currentEntry, reflection };
    
    // If an entry for today already exists, we might want to update it or add a new one.
    // For MVP, we'll just add it to the list.
    setEntries(prev => [...prev, finalEntry]);
    
    setCurrentEntry(null);
    setCurrentScreen('main');
    setActiveTab('today');
  };

  const renderScreen = () => {
    if (activeTab === 'review') {
      return <ReviewScreen entries={entries} />;
    }

    switch (currentScreen) {
      case 'checkin':
        return <CheckInScreen 
          onComplete={handleCheckInComplete} 
          onCancel={() => setCurrentScreen('main')} 
        />;
      case 'recommendation':
        return <RecommendationScreen 
          recommendation={currentEntry.recommendation} 
          onStartPractice={handleStartPractice} 
        />;
      case 'practice':
        return <PracticeScreen 
          track={currentEntry.recommendation.track} 
          onComplete={handlePracticeComplete} 
        />;
      case 'reflection':
        return <ReflectionScreen onSave={handleReflectionSave} />;
      case 'main':
      default:
        return <TodayScreen latestEntry={latestEntry} onStartCheckIn={handleStartCheckIn} />;
    }
  };

  // Override screen if tab changes
  useEffect(() => {
    if (activeTab !== 'today') {
      setCurrentScreen('main');
    }
  }, [activeTab]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
