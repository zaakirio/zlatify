# Zlatify

A workout companion app for **Zlat's Weighted Calisthenics Program** — a structured progression system for weighted pull-ups and weighted dips.

## What is it?

Zlatify guides you through a multi-stage calisthenics program that takes you from novice (12 bodyweight pull-ups / 15 bodyweight dips) through advanced stages using periodized training with weighted progressions. The app handles:

- **Workout logging** — track sets, reps, and weight for each session
- **Automatic progression** — rep-based and RPE-based rules determine when to add weight
- **Stage & phase tracking** — novice → advanced novice → intermediate → advanced, each with distinct training phases
- **Session prescriptions** — heavy, deload, volume, max, and other session types with calculated percentages
- **Form guides** — step-by-step technique cues and common mistakes for pull-ups and dips
- **Workout history** — review past sessions and track progress over time

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev/build
- **Tailwind CSS v4** for styling
- **React Router v7** for navigation
- **Dexie** (IndexedDB) for local-first storage — no backend required
- **Zustand** for state management
- **Recharts** for progress visualization

## Getting Started

```bash
npm install
npm run dev
```

## Acknowledgement

The training program implemented in this app follows **Matthew Zlat** Philosophy. For more information check out his video on weighted calisthenics: [Zlat's Weighted Calisthenics Program](https://www.youtube.com/watch?v=WGn9HyaTJwY).
