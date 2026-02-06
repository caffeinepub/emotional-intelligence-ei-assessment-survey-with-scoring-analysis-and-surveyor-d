import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { EI_STATEMENTS } from '../../content/eiStatements';
import { answersArrayToBackendFormat } from '../../lib/eiScoring';
import { useSubmitAssessment } from '../../hooks/useQueries';
import LikertScale from './LikertScale';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AssessmentForm() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<(number | null)[]>(Array(50).fill(null));
  const submitAssessment = useSubmitAssessment();

  const handleAnswerChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const unansweredCount = answers.filter(a => a === null).length;
  const isComplete = unansweredCount === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isComplete) {
      toast.error(`Please answer all questions. ${unansweredCount} remaining.`);
      return;
    }

    try {
      const backendAnswers = answersArrayToBackendFormat(answers as number[]);
      await submitAssessment.mutateAsync(backendAnswers);
      toast.success('Assessment submitted successfully!');
      navigate({ to: '/results' });
    } catch (error: any) {
      if (error.message?.includes('already completed')) {
        toast.error('You have already completed this assessment');
        navigate({ to: '/results' });
      } else {
        toast.error('Failed to submit assessment. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertDescription className="text-amber-900 dark:text-amber-200">
          <strong>Instructions:</strong> Read each statement and decide how strongly it applies to YOU.
          Score yourself 1 to 5 based on the following guide:
          <br />
          <span className="font-semibold">1 = Does not apply</span> ~ 
          <span className="font-semibold"> 3 = Applies half the time</span> ~ 
          <span className="font-semibold"> 5 = Always applies</span>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {EI_STATEMENTS.map((statement, index) => (
          <LikertScale
            key={index}
            questionNumber={index + 1}
            statement={statement}
            value={answers[index]}
            onChange={(value) => handleAnswerChange(index, value)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            {isComplete ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  All questions answered!
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-muted-foreground">
                  {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} remaining
                </span>
              </>
            )}
          </div>
          
          <Button
            type="submit"
            size="lg"
            disabled={!isComplete || submitAssessment.isPending}
            className="min-w-[140px]"
          >
            {submitAssessment.isPending ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    </form>
  );
}
