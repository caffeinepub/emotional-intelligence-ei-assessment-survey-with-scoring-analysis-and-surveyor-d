import type { Submission } from '../backend';
import { COMPETENCY_LABELS } from '../content/eiStatements';
import { interpretScore, getCategoryLabel } from './eiInterpretation';

export function exportToJSON(submissions: Submission[]): void {
  const data = submissions.map(sub => ({
    respondent: sub.respondent.toString(),
    timestamp: new Date(Number(sub.timestamp) / 1_000_000).toISOString(),
    answers: Object.fromEntries(
      Array.from({ length: 50 }, (_, i) => [
        `item${i + 1}`,
        Number((sub.answers as any)[`item${i + 1}`])
      ])
    ),
    results: {
      selfAwareness: {
        total: Number(sub.results.selfAwareness.total),
        category: getCategoryLabel(interpretScore(Number(sub.results.selfAwareness.total)))
      },
      managingEmotions: {
        total: Number(sub.results.managingEmotions.total),
        category: getCategoryLabel(interpretScore(Number(sub.results.managingEmotions.total)))
      },
      motivatingOneself: {
        total: Number(sub.results.motivatingOneself.total),
        category: getCategoryLabel(interpretScore(Number(sub.results.motivatingOneself.total)))
      },
      empathy: {
        total: Number(sub.results.empathy.total),
        category: getCategoryLabel(interpretScore(Number(sub.results.empathy.total)))
      },
      socialSkill: {
        total: Number(sub.results.socialSkill.total),
        category: getCategoryLabel(interpretScore(Number(sub.results.socialSkill.total)))
      }
    }
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ei-assessment-results-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCSV(submissions: Submission[]): void {
  const headers = [
    'Respondent',
    'Timestamp',
    ...Array.from({ length: 50 }, (_, i) => `Q${i + 1}`),
    'Self Awareness Total',
    'Self Awareness Category',
    'Managing Emotions Total',
    'Managing Emotions Category',
    'Motivating Oneself Total',
    'Motivating Oneself Category',
    'Empathy Total',
    'Empathy Category',
    'Social Skill Total',
    'Social Skill Category'
  ];

  const rows = submissions.map(sub => {
    const answers = Array.from({ length: 50 }, (_, i) => 
      Number((sub.answers as any)[`item${i + 1}`])
    );
    
    return [
      sub.respondent.toString(),
      new Date(Number(sub.timestamp) / 1_000_000).toISOString(),
      ...answers,
      Number(sub.results.selfAwareness.total),
      getCategoryLabel(interpretScore(Number(sub.results.selfAwareness.total))),
      Number(sub.results.managingEmotions.total),
      getCategoryLabel(interpretScore(Number(sub.results.managingEmotions.total))),
      Number(sub.results.motivatingOneself.total),
      getCategoryLabel(interpretScore(Number(sub.results.motivatingOneself.total))),
      Number(sub.results.empathy.total),
      getCategoryLabel(interpretScore(Number(sub.results.empathy.total))),
      Number(sub.results.socialSkill.total),
      getCategoryLabel(interpretScore(Number(sub.results.socialSkill.total)))
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ei-assessment-results-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
