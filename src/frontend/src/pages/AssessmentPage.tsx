import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubmission } from '../hooks/useQueries';
import AssessmentForm from '../components/assessment/AssessmentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function AssessmentPage() {
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
              You must be logged in to take the assessment
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
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (submission) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-amber-200 dark:border-amber-900">
          <CardHeader>
            <CardTitle>Assessment Already Completed</CardTitle>
            <CardDescription>
              You have already submitted your emotional intelligence assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Each user can only complete the assessment once. You can view your results at any time.
            </p>
            <Button onClick={() => navigate({ to: '/results' })} className="w-full">
              View Your Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Emotional Intelligence Assessment
        </h1>
        <p className="text-muted-foreground">
          Answer all 50 questions honestly to receive your personalized EI profile
        </p>
      </div>

      <AssessmentForm />
    </div>
  );
}
