import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodayScreen from './components/TodayScreen';
import CheckInScreen from './components/CheckInScreen';
import RecommendationScreen from './components/RecommendationScreen';
import PracticeScreen from './components/PracticeScreen';
import ReflectionScreen from './components/ReflectionScreen';
import ReviewScreen from './components/ReviewScreen';
import MovementSnackScreen from './components/MovementSnackScreen';
import { calculateReadiness } from './utils/readinessLogic';

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [currentScreen, setCurrentScreen] = useState('main'); // main, checkin, recommendation, practice, reflection, snacks
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

  const handleStartMorningPractice = () => {
    // Starts directly without full check-in. Use default 'Green' or 'Yellow'.
    // Here we'll default to 'Green' but allow practice to proceed.
    const mockRecommendation = {
      score: '--',
      track: 'Green',
      message: 'Direct start: Focus on full restoration and athletic expression.',
      priorityAreas: []
    };
    setCurrentEntry({
      date: new Date().toISOString(),
      checkIn: null,
      recommendation: mockRecommendation,
      reflection: null,
      isDirectPractice: true
    });
    setCurrentScreen('practice');
  };

  const handleStartSnacks = () => {
    setCurrentScreen('snacks');
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
          track={currentEntry?.recommendation?.track || 'Green'} 
          onComplete={handlePracticeComplete} 
        />;
      case 'reflection':
        return <ReflectionScreen onSave={handleReflectionSave} />;
      case 'snacks':
        return <MovementSnackScreen onBack={() => setCurrentScreen('main')} />;
      case 'main':
      default:
        return <TodayScreen 
          latestEntry={latestEntry} 
          onStartMorningPractice={handleStartMorningPractice}
          onStartCheckIn={handleStartCheckIn}
          onStartSnacks={handleStartSnacks}
        />;
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
