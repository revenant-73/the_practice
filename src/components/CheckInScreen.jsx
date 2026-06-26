import React, { useState } from 'react';
import { AlertCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const CheckInScreen = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    physicalEnergy: 5,
    mentalEnergy: 5,
    sleepQuality: 5,
    stress: 5,
    motivation: 5,
    overallStiffness: 5,
    overallPain: 0,
    painMap: {
      'Neck': 0, 'Thoracic spine': 0, 'Shoulders': 0, 'Lower back': 0,
      'Hips': 0, 'Knees': 0, 'Feet / arches': 0, 'Achilles / calves': 0
    },
    stiffnessMap: {
      'Neck': 0, 'Thoracic spine': 0, 'Shoulders': 0, 'Lower back': 0,
      'Hips': 0, 'Knees': 0, 'Feet / arches': 0, 'Achilles / calves': 0
    },
    timeAvailable: '10 minutes',
    physicalDemands: 'None / normal day',
    trainingIntention: 'Feel better',
    safetyGate: []
  });

  const bodyAreas = [
    'Neck', 'Thoracic spine', 'Shoulders', 'Lower back',
    'Hips', 'Knees', 'Feet / arches', 'Achilles / calves'
  ];

  const safetyOptions = [
    'Sharp pain', 'New pain', 'Swelling', 'Numbness / tingling',
    'Dizziness', 'Chest pain / shortness of breath', 
    'Pain that changes your gait', 'Pain that feels unsafe'
  ];

  const handleSliderChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseInt(value) }));
  };

  const handleMapChange = (map, area, value) => {
    setInputs(prev => ({
      ...prev,
      [map]: { ...prev[map], [area]: parseInt(value) }
    }));
  };

  const toggleSafety = (option) => {
    setInputs(prev => ({
      ...prev,
      safetyGate: prev.safetyGate.includes(option)
        ? prev.safetyGate.filter(o => o !== option)
        : [...prev.safetyGate, option]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold border-b pb-2">Core Vitals</h3>
            
            <InputGroup label="Physical Energy" value={inputs.physicalEnergy} min="1" max="10" 
              lowLabel="Drained" highLabel="Ready" onChange={(v) => handleSliderChange('physicalEnergy', v)} />
            
            <InputGroup label="Mental Energy" value={inputs.mentalEnergy} min="1" max="10" 
              lowLabel="Foggy" highLabel="Clear" onChange={(v) => handleSliderChange('mentalEnergy', v)} />
            
            <InputGroup label="Sleep Quality" value={inputs.sleepQuality} min="1" max="10" 
              lowLabel="Terrible" highLabel="Excellent" onChange={(v) => handleSliderChange('sleepQuality', v)} />
            
            <InputGroup label="Stress Load" value={inputs.stress} min="1" max="10" 
              lowLabel="Calm" highLabel="Overloaded" onChange={(v) => handleSliderChange('stress', v)} />
            
            <InputGroup label="Motivation" value={inputs.motivation} min="1" max="10" 
              lowLabel="Resistance" highLabel="Eager" onChange={(v) => handleSliderChange('motivation', v)} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold border-b pb-2">Body Awareness</h3>
            
            <InputGroup label="Overall Stiffness" value={inputs.overallStiffness} min="1" max="10" 
              lowLabel="Loose" highLabel="Locked Up" onChange={(v) => handleSliderChange('overallStiffness', v)} />
            
            <InputGroup label="Overall Pain" value={inputs.overallPain} min="0" max="10" 
              lowLabel="None" highLabel="Limiting" onChange={(v) => handleSliderChange('overallPain', v)} />

            <div className="space-y-4 pt-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Area Map (Pain / Stiffness)</h4>
              {bodyAreas.map(area => (
                <div key={area} className="space-y-2 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">{area}</span>
                    <div className="flex gap-4 text-xs font-bold uppercase">
                      <span className="text-red-500">P: {inputs.painMap[area]}</span>
                      <span className="text-yellow-600">S: {inputs.stiffnessMap[area]}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="range" min="0" max="10" value={inputs.painMap[area]} 
                      onChange={(e) => handleMapChange('painMap', area, e.target.value)}
                      className="accent-red-500 h-1.5" />
                    <input type="range" min="0" max="10" value={inputs.stiffnessMap[area]} 
                      onChange={(e) => handleMapChange('stiffnessMap', area, e.target.value)}
                      className="accent-yellow-500 h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold border-b pb-2">Context & Safety</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Time Available</label>
              <select 
                value={inputs.timeAvailable}
                onChange={(e) => setInputs(prev => ({ ...prev, timeAvailable: e.target.value }))}
                className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white"
              >
                {['5 minutes', '10 minutes', '20–25 minutes', '45+ minutes'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Today's Demands</label>
              <select 
                value={inputs.physicalDemands}
                onChange={(e) => setInputs(prev => ({ ...prev, physicalDemands: e.target.value }))}
                className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white"
              >
                {[
                  'None / normal day', 'Long coaching day', 'Volleyball practice', 
                  'Volleyball playing', 'Strength session planned', 'Tournament / long gym day',
                  'Long computer day', 'Travel day', 'Yard work / physical labor', 'Other'
                ].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                <AlertCircle size={20} />
                <span>Safety Gate</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Are you experiencing any of these today?</p>
              <div className="grid grid-cols-1 gap-3">
                {safetyOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleSafety(option)}
                    className={`text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      inputs.safetyGate.includes(option)
                        ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                        : 'border-slate-100 bg-white text-slate-600'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                      inputs.safetyGate.includes(option)
                        ? 'bg-red-500 border-red-500'
                        : 'border-slate-200'
                    }`}>
                      {inputs.safetyGate.includes(option) && <Check size={16} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      <div className="flex-1">
        {renderStep()}
      </div>
      
      <div className="mt-8 flex gap-4">
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className="flex-1 py-4 px-6 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}
        {step < 3 ? (
          <button 
            onClick={() => setStep(s => s + 1)}
            className="flex-[2] py-4 px-6 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2"
          >
            Continue
            <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            onClick={() => onComplete(inputs)}
            className="flex-[2] py-4 px-6 rounded-xl bg-green-600 text-white font-bold flex items-center justify-center gap-2"
          >
            Complete Check-In
          </button>
        )}
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, min, max, lowLabel, highLabel, onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{label}</label>
      <span className="text-2xl font-black text-blue-600 leading-none">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
      <span>{lowLabel}</span>
      <span>{highLabel}</span>
    </div>
  </div>
);

export default CheckInScreen;
