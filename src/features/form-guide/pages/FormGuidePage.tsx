import { useState } from 'react';
import { NavArrowDown, NavArrowUp, WarningTriangle, CheckCircle } from 'iconoir-react';
import { EXERCISE_FORM_GUIDES } from '../../program/data/exercises';
import type { ExerciseFormGuide } from '../../program/types/program.types';

export function FormGuidePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-bold uppercase tracking-widest">Form Guide</h1>
        <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
          Proper technique from Mathew Zlat's guide
        </p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
        {Object.values(EXERCISE_FORM_GUIDES).map((guide) => (
          <ExerciseCard key={guide.exerciseId} guide={guide} />
        ))}
      </div>
    </div>
  );
}

function ExerciseCard({ guide }: { guide: ExerciseFormGuide }) {
  const [showSteps, setShowSteps] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);

  return (
    <div className="rounded-sm border border-border bg-surface dark:border-border-dark dark:bg-surface-secondary-dark overflow-hidden">
      <div className="p-4">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide mb-2">{guide.displayName}</h2>
        <div className="mb-3">
          <div className="text-[10px] font-medium uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-1.5">
            Muscles Worked
          </div>
          <div className="space-y-0.5">
            {guide.musclesWorked.map((m) => (
              <div key={m} className="text-sm">{m}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <button
        onClick={() => setShowSteps(!showSteps)}
        className="flex w-full items-center justify-between border-t border-border px-4 py-3 dark:border-border-dark hover:bg-surface-secondary dark:hover:bg-surface-dark transition-colors"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" strokeWidth={1.8} />
          <span className="text-sm font-medium">Proper Technique ({guide.steps.length} steps)</span>
        </div>
        {showSteps
          ? <NavArrowUp className="h-4 w-4" strokeWidth={1.8} />
          : <NavArrowDown className="h-4 w-4" strokeWidth={1.8} />
        }
      </button>
      {showSteps && (
        <div className="border-t border-border px-4 py-3 space-y-3 dark:border-border-dark">
          {guide.steps.map((step) => (
            <div key={step.stepNumber}>
              <div className="text-sm font-bold text-primary">
                <span className="font-mono">{String(step.stepNumber).padStart(2, '0')}</span> {step.title}
              </div>
              <div className="text-sm text-text-muted dark:text-text-muted-dark mt-0.5">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mistakes Section */}
      <button
        onClick={() => setShowMistakes(!showMistakes)}
        className="flex w-full items-center justify-between border-t border-border px-4 py-3 dark:border-border-dark hover:bg-surface-secondary dark:hover:bg-surface-dark transition-colors"
      >
        <div className="flex items-center gap-2">
          <WarningTriangle className="h-4 w-4 text-warning" strokeWidth={1.8} />
          <span className="text-sm font-medium">Common Mistakes ({guide.mistakes.length})</span>
        </div>
        {showMistakes
          ? <NavArrowUp className="h-4 w-4" strokeWidth={1.8} />
          : <NavArrowDown className="h-4 w-4" strokeWidth={1.8} />
        }
      </button>
      {showMistakes && (
        <div className="border-t border-border px-4 py-3 space-y-3 dark:border-border-dark">
          {guide.mistakes.map((mistake) => (
            <div key={mistake.mistakeNumber}>
              <div className="text-sm font-bold text-danger">
                <span className="font-mono">{String(mistake.mistakeNumber).padStart(2, '0')}</span> {mistake.title}
              </div>
              <div className="text-sm text-text-muted dark:text-text-muted-dark mt-0.5">
                {mistake.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
