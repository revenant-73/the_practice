export const calculateReadiness = (inputs) => {
  const {
    physicalEnergy,
    mentalEnergy,
    sleepQuality,
    motivation,
    stress,
    overallPain,
    overallStiffness,
    painMap = {},
    stiffnessMap = {},
    safetyGate = []
  } = inputs;

  // 6.1 Positive Readiness = average(physical_energy, mental_energy, sleep_quality, motivation)
  const positiveReadiness = (physicalEnergy + mentalEnergy + sleepQuality + motivation) / 4;

  // 6.2 Load Inputs = average(stress, overall_pain, overall_stiffness)
  const constraintLoad = (stress + overallPain + overallStiffness) / 3;

  // 6.3 Area Flags
  const maxPain = Math.max(0, ...Object.values(painMap));
  const maxStiffness = Math.max(0, ...Object.values(stiffnessMap));

  // 6.4 Simple Readiness Score = (Positive Readiness * 10) - (Constraint Load * 4)
  let score = (positiveReadiness * 10) - (constraintLoad * 4);
  score = Math.max(0, Math.min(100, Math.round(score)));

  // 7.1 Red Track Override
  const isRedTriggered = 
    safetyGate.length > 0 ||
    physicalEnergy <= 3 ||
    overallPain >= 7 ||
    maxPain >= 8 ||
    overallStiffness >= 9 ||
    maxStiffness >= 9 ||
    (sleepQuality <= 3 && overallPain >= 5) ||
    (painMap['Achilles / calves'] >= 7) ||
    (painMap['Neck'] >= 8);

  if (isRedTriggered) {
    return {
      score,
      track: 'Red',
      message: 'Today is a restore day. This is not a failure. The goal is to lower threat, restore options, and keep the practice alive.',
      priorityAreas: getPriorityAreas(painMap, stiffnessMap)
    };
  }

  // 7.2 Green Track
  const isGreenEligible = 
    physicalEnergy >= 7 &&
    mentalEnergy >= 6 &&
    sleepQuality >= 6 &&
    overallPain <= 3 &&
    maxPain <= 4 &&
    overallStiffness <= 5 &&
    maxStiffness <= 6;

  if (isGreenEligible) {
    return {
      score,
      track: 'Green',
      message: 'You are ready to build. Focus on full strength, tendon loading, and athletic expression.',
      priorityAreas: getPriorityAreas(painMap, stiffnessMap)
    };
  }

  // Default to Yellow Track
  return {
    score,
    track: 'Yellow',
    message: 'Today is a restore + build day. Reduce dose, focus on quality, and adapt to today’s constraints.',
    priorityAreas: getPriorityAreas(painMap, stiffnessMap)
  };
};

const getPriorityAreas = (painMap, stiffnessMap) => {
  const priorities = [];
  const allAreas = new Set([...Object.keys(painMap), ...Object.keys(stiffnessMap)]);
  
  allAreas.forEach(area => {
    const pain = painMap[area] || 0;
    const stiffness = stiffnessMap[area] || 0;
    if (pain >= 5 || stiffness >= 6) {
      priorities.push(area);
    }
  });
  
  return priorities;
};
