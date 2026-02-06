import { COMPETENCY_LABELS } from '../../content/eiStatements';
import { interpretScore, getCategoryLabel, getCategoryColor } from '../../lib/eiInterpretation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AssessmentResults } from '../../backend';

interface ResultsTableProps {
  results: AssessmentResults;
}

export default function ResultsTable({ results }: ResultsTableProps) {
  const competencies = [
    { key: 'selfAwareness', data: results.selfAwareness },
    { key: 'managingEmotions', data: results.managingEmotions },
    { key: 'motivatingOneself', data: results.motivatingOneself },
    { key: 'empathy', data: results.empathy },
    { key: 'socialSkill', data: results.socialSkill },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Emotional Intelligence Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {competencies.map(({ key, data }) => {
            const total = Number(data.total);
            const category = interpretScore(total);
            const categoryLabel = getCategoryLabel(category);
            const colorClass = getCategoryColor(category);

            return (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {COMPETENCY_LABELS[key]}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{categoryLabel}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">{total}</div>
                    <div className="text-xs text-muted-foreground">out of 50</div>
                  </div>
                  <Badge className={`${colorClass} border-0 px-3 py-1 font-medium`}>
                    {category === 'strength' ? 'Strength' : 
                     category === 'needsAttention' ? 'Needs Attention' : 
                     'Development Priority'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <h4 className="font-semibold text-sm text-foreground mb-2">Interpretation Guide:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><strong className="text-emerald-700 dark:text-emerald-400">35-50:</strong> This area is a strength for you</li>
            <li><strong className="text-amber-700 dark:text-amber-400">18-34:</strong> Giving attention to where you feel you need improvement</li>
            <li><strong className="text-rose-700 dark:text-rose-400">10-17:</strong> Make this area a development priority</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
