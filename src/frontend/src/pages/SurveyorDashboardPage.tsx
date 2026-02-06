import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllSubmissions, useIsCallerAdmin } from '../hooks/useQueries';
import { exportToJSON, exportToCSV } from '../lib/exporters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

export default function SurveyorDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: submissions = [], isLoading: submissionsLoading, error } = useGetAllSubmissions();

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
              You must be logged in to access the surveyor dashboard
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

  if (adminLoading || submissionsLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin || error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You do not have permission to access the surveyor dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Only authorized surveyors can view and download assessment results.
            </p>
            <Button onClick={() => navigate({ to: '/' })} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleExportJSON = () => {
    if (submissions.length === 0) {
      toast.error('No submissions to export');
      return;
    }
    exportToJSON(submissions);
    toast.success('JSON file downloaded successfully');
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      toast.error('No submissions to export');
      return;
    }
    exportToCSV(submissions);
    toast.success('CSV file downloaded successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Surveyor Dashboard
        </h1>
        <p className="text-muted-foreground">
          View and export all assessment submissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Assessment Submissions</CardTitle>
              <CardDescription>
                {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExportJSON}
                disabled={submissions.length === 0}
                variant="outline"
                className="gap-2"
              >
                <FileJson className="w-4 h-4" />
                Export JSON
              </Button>
              <Button
                onClick={handleExportCSV}
                disabled={submissions.length === 0}
                className="gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No submissions yet</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Respondent</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Self Awareness</TableHead>
                    <TableHead className="text-right">Managing Emotions</TableHead>
                    <TableHead className="text-right">Motivating Oneself</TableHead>
                    <TableHead className="text-right">Empathy</TableHead>
                    <TableHead className="text-right">Social Skill</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-xs">
                        {submission.respondent.toString().slice(0, 12)}...
                      </TableCell>
                      <TableCell>
                        {new Date(Number(submission.timestamp) / 1_000_000).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(submission.results.selfAwareness.total)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(submission.results.managingEmotions.total)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(submission.results.motivatingOneself.total)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(submission.results.empathy.total)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(submission.results.socialSkill.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
