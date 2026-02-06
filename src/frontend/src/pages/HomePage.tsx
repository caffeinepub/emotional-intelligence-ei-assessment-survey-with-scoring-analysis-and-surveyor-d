import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMySubmission } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ClipboardCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: submission } = useGetMySubmission();

  const isAuthenticated = !!identity;
  const hasCompletedAssessment = !!submission;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Emotional Intelligence Assessment
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your emotional intelligence strengths and areas for growth through our comprehensive 50-question assessment
        </p>
      </div>

      {!isAuthenticated ? (
        <Card className="max-w-2xl mx-auto border-2">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Please log in to take the assessment and view your results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This assessment evaluates five key emotional competencies: Self Awareness, Managing Emotions, 
              Motivating Oneself, Empathy, and Social Skill.
            </p>
            <Button size="lg" className="w-full" onClick={() => {}}>
              Login to Begin
            </Button>
          </CardContent>
        </Card>
      ) : hasCompletedAssessment ? (
        <Card className="max-w-2xl mx-auto border-2 border-emerald-200 dark:border-emerald-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-emerald-600" />
              Assessment Complete
            </CardTitle>
            <CardDescription>
              You have already completed the emotional intelligence assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              View your detailed results and emotional intelligence profile to understand your strengths 
              and areas for development.
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/results' })}
            >
              View Your Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto border-2">
          <CardHeader>
            <CardTitle>Ready to Begin?</CardTitle>
            <CardDescription>
              Take the assessment to discover your emotional intelligence profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">50 Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Rate each statement from 1 (does not apply) to 5 (always applies)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">5 Competencies</h3>
                  <p className="text-sm text-muted-foreground">
                    Evaluated across Self Awareness, Managing Emotions, Motivating Oneself, Empathy, and Social Skill
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive immediate feedback with detailed interpretation of your scores
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/assessment' })}
            >
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Personal Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Identify your emotional intelligence strengths and areas for development
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Brain className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Self-Awareness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gain deeper insights into your emotional patterns and responses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-8 h-8 text-primary mb-2" />
            <CardTitle className="text-lg">Better Relationships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Improve your ability to connect with and understand others
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
