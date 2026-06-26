import React, { useState } from 'react';
import { Save } from 'lucide-react';

const ReflectionScreen = ({ onSave }) => {
  const [reflection, setReflection] = useState({
    good: '',
    restricted: '',
    whatChanged: '',
    tomorrow: ''
  });

  const handleChange = (field, value) => {
    setReflection(prev => ({ ...prev, [field]: value }));
  };

  const isComplete = Object.values(reflection).some(v => v.length > 0);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Reflect</h2>
        <p className="text-slate-500 font-medium">Turn today's practice into tomorrow's information.</p>
      </div>

      <div className="space-y-6">
        <ReflectionField 
          label="What felt surprisingly good?" 
          value={reflection.good}
          onChange={(v) => handleChange('good', v)}
        />
        
        <ReflectionField 
          label="What felt restricted?" 
          value={reflection.restricted}
          onChange={(v) => handleChange('restricted', v)}
        />
        
        <ReflectionField 
          label="What changed?" 
          value={reflection.whatChanged}
          onChange={(v) => handleChange('whatChanged', v)}
        />
        
        <ReflectionField 
          label="What deserves exploration tomorrow?" 
          value={reflection.tomorrow}
          onChange={(v) => handleChange('tomorrow', v)}
        />
      </div>

      <button 
        onClick={() => onSave(reflection)}
        disabled={!isComplete}
        className={`w-full py-5 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
          isComplete ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        Save Entry
        <Save size={24} />
      </button>
    </div>
  );
};

const ReflectionField = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{label}</label>
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 transition-colors min-h-[100px] bg-white text-slate-800"
      placeholder="Type here..."
    />
  </div>
);

export default ReflectionScreen;
