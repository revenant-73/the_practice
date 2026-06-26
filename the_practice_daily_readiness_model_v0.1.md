# The Practice — Daily Readiness Model v0.1

## Purpose

The Daily Readiness Model is the decision layer that helps the user answer:

> Given who I am today, what is the wisest movement practice?

The goal is not to create a perfect score.

The goal is to guide the user toward a useful adaptation:

- **Green Track:** Build
- **Yellow Track:** Restore + Build
- **Red Track:** Restore

The readiness model should feel like a short conversation, not a medical intake form.

---

# 1. Core Design Principles

## 1.1 The user is not being judged

The check-in should never imply failure.

Low readiness does not mean the user is behind.

It means the practice should adapt.

## 1.2 The score is less important than the recommendation

The app may display a readiness score, but the main output should be:

> Today’s best practice path is...

## 1.3 Pain changes the plan

Pain is not ignored.

Pain is information.

High pain, sharp pain, new pain, or unusual symptoms should override energy and motivation.

## 1.4 The model should be simple first

Version 0.1 should use clear rules.

Later versions can learn patterns from the user's history.

---

# 2. Daily Check-In Fields

## 2.1 Required Daily Inputs

These should appear every morning.

### Physical Energy

**Question:** How physically ready do you feel today?

**Scale:** 1–10

- 1 = drained
- 5 = usable
- 10 = ready to build

### Mental Energy

**Question:** How mentally ready do you feel today?

**Scale:** 1–10

- 1 = foggy / overloaded
- 5 = steady enough
- 10 = clear and engaged

### Sleep Quality

**Question:** How well did you sleep?

**Scale:** 1–10

- 1 = terrible
- 5 = acceptable
- 10 = excellent

### Stress Load

**Question:** How heavy does life feel today?

**Scale:** 1–10

- 1 = calm
- 5 = normal
- 10 = overloaded

### Motivation / Willingness

**Question:** How willing are you to practice today?

**Scale:** 1–10

- 1 = strong resistance
- 5 = willing to start
- 10 = eager

### Overall Stiffness

**Question:** How stiff does your body feel overall?

**Scale:** 1–10

- 1 = loose and easy
- 5 = noticeable
- 10 = locked up

### Overall Pain

**Question:** What is your overall pain level?

**Scale:** 0–10

- 0 = no pain
- 3 = noticeable but manageable
- 6 = limiting
- 8+ = high priority

---

# 3. Body Area Map

The app should allow quick ratings for pain and stiffness by area.

## 3.1 Pain Map

Scale: 0–10

- Neck
- Thoracic spine
- Shoulders
- Lower back
- Hips
- Knees
- Feet / arches
- Achilles / calves

## 3.2 Stiffness Map

Scale: 0–10

- Neck
- Thoracic spine
- Shoulders
- Lower back
- Hips
- Knees
- Feet / arches
- Achilles / calves

## 3.3 Optional Weakness / Confidence Map

This can be included later.

Scale: 0–10

- 0 = no confidence
- 10 = strong confidence

Suggested first areas:

- Neck
- Feet
- Achilles / calves
- Hips
- Lower back

---

# 4. Context Questions

These questions help the app adapt the recommendation.

## 4.1 Today’s Physical Demands

**Question:** What physical demands are coming today?

Options:

- None / normal day
- Long coaching day
- Volleyball practice
- Volleyball playing
- Strength session planned
- Tournament / long gym day
- Long computer day
- Travel day
- Yard work / physical labor
- Other

## 4.2 Time Available

**Question:** How much time do you realistically have?

Options:

- 5 minutes
- 10 minutes
- 20–25 minutes
- 45+ minutes

## 4.3 Training Intention

**Question:** What do you hope today’s practice gives you?

Options:

- Feel better
- Reduce stiffness
- Build strength
- Build spring
- Prepare to coach/play
- Recover from yesterday
- Just keep the habit alive

---

# 5. Safety Gate

Before assigning a track, the app checks for red flags.

## 5.1 Safety Questions

Ask only when pain is elevated, or allow the user to expand this section.

**Question:** Is anything sharp, sudden, new, or unusual today?

Options:

- No
- Sharp pain
- New pain
- Swelling
- Numbness / tingling
- Dizziness
- Chest pain / shortness of breath
- Pain that changes your gait
- Pain that feels unsafe

## 5.2 Safety Rules

If the user selects:

- Chest pain / shortness of breath
- Dizziness
- New numbness / tingling
- Major swelling
- Sudden severe pain
- Pain that changes gait
- Pain that feels unsafe

Then the app should recommend:

> Red Track. Do not push through this. Use gentle movement only if it feels safe, and consider getting medical guidance.

This app should not diagnose.

It should protect the user from turning warning signs into workouts.

---

# 6. Readiness Score v0.1

The readiness score should be simple and transparent.

## 6.1 Positive Readiness Inputs

Average these:

- Physical Energy
- Mental Energy
- Sleep Quality
- Motivation / Willingness

Call this:

```text
Positive Readiness = average(physical_energy, mental_energy, sleep_quality, motivation)
```

## 6.2 Load Inputs

Average these:

- Stress Load
- Overall Pain
- Overall Stiffness

Call this:

```text
Constraint Load = average(stress, overall_pain, overall_stiffness)
```

## 6.3 Area Flags

Identify the highest pain and stiffness scores from the body map.

```text
Max Pain = highest body-area pain score
Max Stiffness = highest body-area stiffness score
```

For Loren’s current profile, these areas should receive extra attention in recommendations:

- Neck
- Thoracic spine
- Achilles / calves
- Feet / arches
- Lower back

Do not necessarily weight them more in the score yet.

Use them to guide the recommendation focus.

## 6.4 Simple Readiness Score

Convert to a 0–100 score:

```text
Readiness Score = (Positive Readiness * 10) - (Constraint Load * 4)
```

Then clamp between 0 and 100.

Example:

- Positive Readiness = 7
- Constraint Load = 5

```text
Readiness Score = 70 - 20 = 50
```

This score is not the final decision.

It supports the track recommendation.

---

# 7. Track Assignment Rules

## 7.1 Red Track Override

Assign **Red Track** if any are true:

- Safety gate is triggered
- Physical Energy <= 3
- Overall Pain >= 7
- Max Pain >= 8
- Overall Stiffness >= 9
- Max Stiffness >= 9
- Sleep Quality <= 3 and Pain >= 5
- Achilles pain >= 7
- Neck pain >= 8
- Pain changes walking, jumping, or normal movement

### Red Track Message

> Today is a restore day. This is not a failure. The goal is to lower threat, restore options, and keep the practice alive.

Recommended practice:

- Gentle Morning Practice
- No jumping
- No power work
- No aggressive stretching
- Breathing
- Floor movement
- Easy walking
- Optional gentle isometrics

---

## 7.2 Green Track

Assign **Green Track** if all are true:

- Physical Energy >= 7
- Mental Energy >= 6
- Sleep Quality >= 6
- Overall Pain <= 3
- Max Pain <= 4
- Overall Stiffness <= 5
- Max Stiffness <= 6
- No safety gate
- No major upcoming fatigue concern

### Green Track Message

> Today is a build day. Your body looks ready for meaningful work. Build capacity, express athleticism, and leave wanting more.

Recommended practice:

- Full Morning Practice
- Full strength session if scheduled
- Tendon loading
- Elasticity
- Power finish
- Energy development

---

## 7.3 Yellow Track

Assign **Yellow Track** if neither Red nor Green applies.

Yellow is the default adaptive state.

### Yellow Track Message

> Today is a restore + build day. Keep the structure, reduce the dose, and focus on useful movement.

Recommended practice:

- Full or shortened Morning Practice
- Reduced strength volume
- More isometrics
- More controlled tempo
- Less jumping
- No maximal intent work if pain is elevated
- Movement snack recommended for highest-limitation area

---

# 8. Recommendation Focus

After assigning the track, the app should identify the top 1–3 focus areas.

## 8.1 Priority Area Rules

### Neck Priority

If neck pain >= 6 or neck stiffness >= 7:

Recommend:

- Neck + thoracic reset
- Eye/head movement
- Rolling
- Crawling
- Open books
- Avoid aggressive overhead loading that day

### Thoracic Priority

If thoracic pain >= 5 or thoracic stiffness >= 7:

Recommend:

- Spine Flow emphasis
- Thread the Needle
- Open Books
- Foam roller extension
- Crawling
- Rotation-focused warm-up

### Achilles Priority

If Achilles pain >= 5 or Achilles stiffness >= 7:

Recommend:

- Slow calf raises
- Bent-knee calf raises
- Isometric calf holds
- Tibialis raises
- Reduce or remove pogos and jumps depending on pain

### Feet Priority

If feet stiffness >= 7 or feet weakness/confidence <= 4:

Recommend:

- Toe yoga
- Short foot
- Barefoot balance
- Slow pressure shifts
- Gentle bouncing only if Achilles allows

### Lower Back Priority

If lower back pain >= 5 or stiffness >= 7:

Recommend:

- Breathing
- Cat-cow
- Hip flow
- Crawling
- Gentle hinging
- Avoid aggressive loaded flexion early in the session

---

# 9. Daily Recommendation Output

After check-in, the app should display a simple summary.

## 9.1 Example Output

```text
Good morning, Loren.

Recommended Track:
YELLOW — Restore + Build

Readiness Score:
58 / 100

Today’s Priorities:
1. Reduce neck stiffness
2. Support Achilles capacity
3. Keep the habit alive

Recommended Practice:
Morning Practice v0.1 with extra Spine Flow.
Reduce jumping to 1–2 easy jumps.
Use Achilles isometrics instead of pogos if pain increases.

Suggested Snack:
2-Minute Neck + Thoracic Reset
```

---

# 10. App Copy

## 10.1 Green Copy

**Title:** Green Track — Build

**Message:**  
Your body looks ready for meaningful work today. Build capacity, express athleticism, and leave wanting more.

**Button:** Start Today’s Practice

## 10.2 Yellow Copy

**Title:** Yellow Track — Restore + Build

**Message:**  
You do not need to skip today. You need to adapt. Keep the structure, reduce the dose, and focus on useful work.

**Button:** Start Adapted Practice

## 10.3 Red Copy

**Title:** Red Track — Restore

**Message:**  
Today is a restore day. The goal is not to push through. The goal is to lower threat, restore options, and keep the practice alive.

**Button:** Start Restore Practice

---

# 11. Data Model v0.1

## 11.1 Daily Readiness Entry

```json
{
  "id": "uuid",
  "date": "YYYY-MM-DD",
  "physical_energy": 7,
  "mental_energy": 6,
  "sleep_quality": 5,
  "stress": 6,
  "motivation": 7,
  "overall_pain": 4,
  "overall_stiffness": 7,
  "body_pain": {
    "neck": 8,
    "thoracic": 5,
    "shoulders": 4,
    "lower_back": 4,
    "hips": 6,
    "knees": 2,
    "feet": 1,
    "achilles_calves": 7
  },
  "body_stiffness": {
    "neck": 8,
    "thoracic": 8,
    "shoulders": 3,
    "lower_back": 8,
    "hips": 6,
    "knees": 3,
    "feet": 7,
    "achilles_calves": 7
  },
  "context": {
    "long_coaching_day": false,
    "volleyball_practice": false,
    "volleyball_playing": false,
    "strength_planned": true,
    "long_computer_day": false,
    "travel_day": false
  },
  "time_available": "20-25",
  "training_intention": "reduce stiffness",
  "safety_flags": [],
  "readiness_score": 58,
  "recommended_track": "yellow",
  "priority_areas": ["neck", "thoracic", "achilles_calves"],
  "recommended_snacks": ["neck_thoracic_reset", "achilles_iso_reset"],
  "user_override_track": null,
  "notes": ""
}
```

---

# 12. MVP UI Flow

## Screen 1: Today

- Greeting
- Start Check-In
- Last practice summary
- Suggested next action

## Screen 2: Check-In

Quick sliders:

- Physical Energy
- Mental Energy
- Sleep Quality
- Stress
- Motivation
- Overall Pain
- Overall Stiffness

Then body map:

- Neck
- Thoracic
- Shoulders
- Lower Back
- Hips
- Knees
- Feet
- Achilles / Calves

Then context:

- What demands are coming today?
- How much time do you have?
- What do you want from practice?

## Screen 3: Recommendation

Display:

- Track
- Readiness score
- Top priorities
- Practice adjustment
- Suggested snack
- Start Practice button
- Override option

## Screen 4: Practice

Display:

- Morning Practice or Strength Session
- Track-specific modifications
- Section notes

## Screen 5: Reflection

Ask:

- What felt surprisingly good?
- What felt restricted?
- What changed?
- What deserves exploration tomorrow?

---

# 13. First Build Priority

The first build should implement:

1. Check-in form
2. Readiness score
3. Green / Yellow / Red recommendation
4. Priority area detection
5. Track-specific message
6. Save readiness entry locally
7. Display today’s recommendation on Home screen

This is the first intelligent loop.

Once this works, the rest of The Practice has a foundation.

---

# 14. Known Questions to Resolve Later

- Should pain and stiffness be rated separately every day, or should the app offer a quick mode?
- Should certain areas be weighted differently based on user profile?
- Should strength session days use stricter readiness rules than Morning Practice days?
- How should the app detect chronic patterns versus temporary spikes?
- Should the user be asked, “Did the recommendation feel right?” after each day?
- Should Green Track ever appear if sleep is poor but energy is high?
- Should Red Track automatically block jumping?
- Should the app recommend medical guidance when repeated high pain persists?

---

# 15. Guiding Sentence

The Daily Readiness Model exists to protect consistency.

It does this by helping the user adapt today’s practice instead of abandoning it or forcing it.
