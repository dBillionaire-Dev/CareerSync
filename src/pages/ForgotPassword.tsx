import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    toast({
      title: 'Reset link sent!',
      description: 'Check your email for password reset instructions.',
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
            <Briefcase size={18} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">CareerSync</span>
        </Link>

        <Card className="border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted
                ? 'Check your email for reset instructions'
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-stage-accepted/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-stage-accepted" />
                </div>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                  >
                    Try a different email
                  </Button>
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
