import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubmission } from '../hooks/useQueries';
import ResultsTable from '../components/results/ResultsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: submission, isLoading } = useGetMySubmission();

  if (!identity) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              You must be logged in to view results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/' })} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-amber-200 dark:border-amber-900">
          <CardHeader>
            <CardTitle>No Results Available</CardTitle>
            <CardDescription>
              You haven't completed the assessment yet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Take the emotional intelligence assessment to receive your personalized results and insights.
            </p>
            <Button onClick={() => navigate({ to: '/assessment' })} className="w-full">
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Assessment Results
        </h1>
        <p className="text-muted-foreground">
          Completed on {new Date(Number(submission.timestamp) / 1_000_000).toLocaleDateString()}
        </p>
      </div>

      <ResultsTable results={submission.results} />
    </div>
  );
}
