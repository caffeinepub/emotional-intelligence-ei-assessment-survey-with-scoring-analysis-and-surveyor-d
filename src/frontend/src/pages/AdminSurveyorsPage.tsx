import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useAssignSurveyorAccess, useRevokeSurveyorAccess } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Shield, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSurveyorsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const assignAccess = useAssignSurveyorAccess();
  const revokeAccess = useRevokeSurveyorAccess();
  const [principalInput, setPrincipalInput] = useState('');

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
              You must be logged in to access admin settings
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

  if (adminLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You do not have permission to access admin settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Only administrators can manage surveyor access.
            </p>
            <Button onClick={() => navigate({ to: '/' })} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAssignAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!principalInput.trim()) {
      toast.error('Please enter a principal ID');
      return;
    }

    try {
      await assignAccess.mutateAsync(principalInput.trim());
      toast.success('Surveyor access granted successfully');
      setPrincipalInput('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to assign surveyor access');
    }
  };

  const handleRevokeAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!principalInput.trim()) {
      toast.error('Please enter a principal ID');
      return;
    }

    try {
      await revokeAccess.mutateAsync(principalInput.trim());
      toast.success('Surveyor access revoked successfully');
      setPrincipalInput('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to revoke surveyor access');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          Admin Settings
        </h1>
        <p className="text-muted-foreground">
          Manage surveyor access permissions
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Grant Surveyor Access
            </CardTitle>
            <CardDescription>
              Add a user to the surveyor role to allow them to view and download all assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAssignAccess} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assign-principal">Principal ID</Label>
                <Input
                  id="assign-principal"
                  value={principalInput}
                  onChange={(e) => setPrincipalInput(e.target.value)}
                  placeholder="Enter principal ID (e.g., xxxxx-xxxxx-xxxxx-xxxxx-xxx)"
                  className="font-mono text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={assignAccess.isPending || !principalInput.trim()}
                className="w-full"
              >
                {assignAccess.isPending ? 'Granting Access...' : 'Grant Surveyor Access'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revoke Surveyor Access</CardTitle>
            <CardDescription>
              Remove surveyor permissions from a user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRevokeAccess} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revoke-principal">Principal ID</Label>
                <Input
                  id="revoke-principal"
                  value={principalInput}
                  onChange={(e) => setPrincipalInput(e.target.value)}
                  placeholder="Enter principal ID to revoke"
                  className="font-mono text-sm"
                />
              </div>
              <Button
                type="submit"
                variant="destructive"
                disabled={revokeAccess.isPending || !principalInput.trim()}
                className="w-full"
              >
                {revokeAccess.isPending ? 'Revoking Access...' : 'Revoke Surveyor Access'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">About Surveyor Role</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Surveyors have elevated permissions that allow them to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>View all assessment submissions from all users</li>
              <li>Download complete results in JSON and CSV formats</li>
              <li>Access the surveyor dashboard</li>
            </ul>
            <p className="mt-4 text-xs">
              <strong>Note:</strong> Only administrators can grant or revoke surveyor access.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
