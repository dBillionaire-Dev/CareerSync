import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Trash2, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
  const [step, setStep] = useState<'confirm' | 'password'>('confirm');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConfirmStep = () => {
    setStep('password');
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      toast({
        title: 'Password required',
        description: 'Please enter your password to confirm account deletion.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real app, this would call the API to schedule deletion
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 30);
    
    localStorage.setItem('accountDeletionScheduled', deletionDate.toISOString());
    
    toast({
      title: 'Account deletion scheduled',
      description: 'Your account will be permanently deleted in 30 days. You will receive reminders at 7 and 3 days before deletion.',
    });

    setIsLoading(false);
    onOpenChange(false);
    setStep('confirm');
    setPassword('');

    // Log out user
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep('confirm');
    setPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'confirm' ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 text-destructive">
                <div className="p-2 rounded-full bg-destructive/10">
                  <AlertTriangle size={24} />
                </div>
                <DialogTitle>Delete Account</DialogTitle>
              </div>
              <DialogDescription className="pt-4 space-y-3">
                <p>Are you sure you want to delete your account? This action will:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Schedule your account for deletion in 30 days</li>
                  <li>Send you reminders at 7 and 3 days before deletion</li>
                  <li>Allow you to recover your account within 30 days by logging back in</li>
                  <li>Permanently delete all your data after 30 days</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmStep}>
                <Trash2 size={16} className="mr-2" />
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 text-destructive">
                <div className="p-2 rounded-full bg-destructive/10">
                  <Lock size={24} />
                </div>
                <DialogTitle>Confirm Your Password</DialogTitle>
              </div>
              <DialogDescription className="pt-2">
                Please enter your current password to confirm account deletion.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="delete-password">Current Password</Label>
              <Input
                id="delete-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setStep('confirm')}>
                Back
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Delete My Account'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
