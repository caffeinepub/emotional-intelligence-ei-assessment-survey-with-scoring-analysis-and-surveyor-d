export type InterpretationCategory = 'strength' | 'needsAttention' | 'developmentPriority';

export function interpretScore(total: number): InterpretationCategory {
  if (total >= 35) return 'strength';
  if (total >= 18) return 'needsAttention';
  return 'developmentPriority';
}

export function getCategoryLabel(category: InterpretationCategory): string {
  switch (category) {
    case 'strength':
      return 'This area is a strength for you';
    case 'needsAttention':
      return 'Giving attention to where you feel you need improvement';
    case 'developmentPriority':
      return 'Make this area a development priority';
  }
}

export function getCategoryColor(category: InterpretationCategory): string {
  switch (category) {
    case 'strength':
      return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30';
    case 'needsAttention':
      return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30';
    case 'developmentPriority':
      return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30';
  }
}
