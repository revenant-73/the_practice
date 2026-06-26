import React from 'react';
import { Copy, Share2, ChevronRight, Activity } from 'lucide-react';

const ReviewScreen = ({ entries }) => {
  const copyWeeklyReport = () => {
    if (entries.length === 0) return;

    // Get last 7 days of entries
    const recentEntries = entries
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 15); // Look back a bit further to find a full week of data if sparse

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekEntries = entries
      .filter(e => new Date(e.date) >= oneWeekAgo)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (weekEntries.length === 0) {
      alert('No entries found in the last 7 days to generate a report.');
      return;
    }

    const startDate = new Date(weekEntries[0].date).toLocaleDateString();
    const endDate = new Date(weekEntries[weekEntries.length - 1].date).toLocaleDateString();

    // Stats Aggregation
    let stats = {
      total: weekEntries.length,
      morning: 0,
      full: 0,
      snacks: 0,
      tracks: { Green: 0, Yellow: 0, Red: 0, Standard: 0 },
      scores: [],
      physEnergy: [],
      mentEnergy: [],
      pain: [],
      stiffness: []
    };

    const bodyAreas = [
      'Neck', 'Thoracic', 'Shoulders', 'Lower back',
      'Hips', 'Knees', 'Feet', 'Achilles', 'Calves'
    ];
    let areaMentions = {};
    bodyAreas.forEach(area => areaMentions[area] = 0);

    weekEntries.forEach(e => {
      if (e.type === 'snack') {
        stats.snacks++;
        if (e.track) {
          const t = e.track.charAt(0).toUpperCase() + e.track.slice(1);
          stats.tracks[t] = (stats.tracks[t] || 0) + 1;
        }
        // Count snack name/category for patterns
        bodyAreas.forEach(area => {
          if (e.snackName.toLowerCase().includes(area.toLowerCase())) areaMentions[area]++;
        });
      } else {
        if (e.isDirectPractice) stats.morning++;
        else stats.full++;

        if (e.recommendation?.track) {
          stats.tracks[e.recommendation.track] = (stats.tracks[e.recommendation.track] || 0) + 1;
        }

        const score = parseFloat(e.recommendation?.score);
        if (!isNaN(score)) stats.scores.push(score);

        if (e.checkIn) {
          stats.physEnergy.push(e.checkIn.physicalEnergy);
          stats.mentEnergy.push(e.checkIn.mentalEnergy);
          stats.pain.push(e.checkIn.overallPain);
          stats.stiffness.push(e.checkIn.overallStiffness);
          
          // Count priority areas
          if (e.recommendation?.priorityAreas) {
            e.recommendation.priorityAreas.forEach(p => {
              bodyAreas.forEach(area => {
                if (p.toLowerCase().includes(area.toLowerCase())) areaMentions[area]++;
              });
            });
          }
        }
      }

      // Check reflections/notes for area mentions
      const textToSearch = [
        e.reflection?.good,
        e.reflection?.restricted,
        e.reflection?.whatChanged,
        e.reflection?.tomorrow,
        e.note
      ].join(' ').toLowerCase();

      bodyAreas.forEach(area => {
        if (textToSearch.includes(area.toLowerCase())) areaMentions[area]++;
      });
    });

    const avg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '--';
    
    // Find most common track
    const mostCommonTrack = Object.entries(stats.tracks).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    // Build Report
    let report = `# The Practice Weekly Report\n`;
    report += `**Date Range:** ${startDate} – ${endDate}\n\n`;
    
    report += `## Weekly Summary\n`;
    report += `- **Total Entries:** ${stats.total}\n`;
    report += `- **Morning Practices:** ${stats.morning}\n`;
    report += `- **Full Practices:** ${stats.full}\n`;
    report += `- **Movement Snacks:** ${stats.snacks}\n`;
    report += `- **Most Common Track:** ${mostCommonTrack}\n`;
    report += `- **Average Readiness Score:** ${avg(stats.scores)}\n`;
    report += `- **Average Physical Energy:** ${avg(stats.physEnergy)}\n`;
    report += `- **Average Mental Energy:** ${avg(stats.mentEnergy)}\n`;
    report += `- **Average Overall Pain:** ${avg(stats.pain)}\n`;
    report += `- **Average Overall Stiffness:** ${avg(stats.stiffness)}\n\n`;

    report += `## Track Breakdown\n`;
    report += `- **Green:** ${stats.tracks.Green || 0}\n`;
    report += `- **Yellow:** ${stats.tracks.Yellow || 0}\n`;
    report += `- **Red:** ${stats.tracks.Red || 0}\n`;
    report += `- **Standard:** ${stats.tracks.Standard || 0}\n\n`;

    report += `## Priority Area Patterns\n`;
    const sortedAreas = Object.entries(areaMentions)
      .filter(a => a[1] > 0)
      .sort((a, b) => b[1] - a[1]);
    
    if (sortedAreas.length > 0) {
      sortedAreas.forEach(([area, count]) => {
        report += `- **${area}:** ${count} mention${count > 1 ? 's' : ''}\n`;
      });
    } else {
      report += `No specific area patterns identified this week.\n`;
    }
    report += `\n`;

    report += `## Practice Entries\n`;
    weekEntries.filter(e => e.type !== 'snack').forEach(e => {
      report += `### ${new Date(e.date).toLocaleDateString()}\n`;
      report += `- **Type:** ${e.isDirectPractice ? 'Morning' : 'Full'}\n`;
      report += `- **Track:** ${e.recommendation?.track || '--'}\n`;
      report += `- **Readiness Score:** ${e.recommendation?.score || '--'}\n`;
      if (e.recommendation?.priorityAreas?.length > 0) {
        report += `- **Priority Areas:** ${e.recommendation.priorityAreas.join(', ')}\n`;
      }
      if (e.reflection) {
        if (e.reflection.whatChanged) report += `- **What Changed:** ${e.reflection.whatChanged}\n`;
        if (e.reflection.tomorrow) report += `- **Tomorrow Focus:** ${e.reflection.tomorrow}\n`;
      }
      report += `\n`;
    });

    report += `## Movement Snack Entries\n`;
    weekEntries.filter(e => e.type === 'snack').forEach(e => {
      report += `### ${new Date(e.date).toLocaleDateString()}\n`;
      report += `- **Snack:** ${e.snackName}\n`;
      report += `- **Adaptation Used:** ${e.track || '--'}\n`;
      report += `- **Result:** ${e.result?.replace('_', ' ') || '--'}\n`;
      if (e.note) report += `- **Note:** ${e.note}\n`;
      report += `\n`;
    });

    // Pattern Summary
    report += `## Pattern Summary\n`;
    if (sortedAreas.length > 0) {
      const topArea = sortedAreas[0][0];
      const secondArea = sortedAreas.length > 1 ? sortedAreas[1][0] : null;
      report += `${topArea} patterns appeared repeatedly this week. `;
      if (secondArea) report += `${secondArea} also appeared more than once. `;
      report += `Consider prioritizing specific snacks for these areas next week.\n\n`;
    } else {
      report += `No significant patterns detected. Keep exploring a variety of movements.\n\n`;
    }

    report += `## Question for ChatGPT\n`;
    report += `Based on this week’s data, what should I adapt next week?\n\n`;
    report += `---\nGenerated by The Practice MVP`;

    navigator.clipboard.writeText(report).then(() => {
      alert('Comprehensive Weekly Report copied to clipboard!');
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900">Review</h2>
          <p className="text-slate-500 font-medium">Your movement history.</p>
        </div>
        <button 
          onClick={copyWeeklyReport}
          disabled={entries.length === 0}
          className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 flex items-center gap-2 font-bold text-sm"
        >
          <Copy size={18} />
          Copy Weekly Report
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No entries yet. Start your first check-in today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex justify-between items-center group">
                <div className="space-y-1">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                  </div>
                  
                  {entry.type === 'snack' ? (
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-md border border-blue-100">
                        Snack
                      </div>
                      <span className="font-bold text-slate-800">{entry.snackName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        entry.recommendation.track === 'Green' ? 'bg-green-500' : 
                        entry.recommendation.track === 'Yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-bold text-slate-800">{entry.recommendation.track} Track</span>
                      <span className="text-slate-400 text-sm font-medium">• Score: {entry.recommendation.score}</span>
                    </div>
                  )}

                  {entry.type === 'snack' ? (
                    <p className="text-sm text-slate-600 italic line-clamp-1 mt-1 pr-4 capitalize">
                      {entry.result?.replace('_', ' ')} {entry.note && `• ${entry.note}`}
                    </p>
                  ) : (
                    entry.reflection && (
                      <p className="text-sm text-slate-600 italic line-clamp-1 mt-1 pr-4">
                        "{entry.reflection.whatChanged || entry.reflection.tomorrow}"
                      </p>
                    )
                  )}
                </div>
                <ChevronRight size={20} className="text-slate-300 group-active:text-blue-500 transition-colors" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ReviewScreen;
