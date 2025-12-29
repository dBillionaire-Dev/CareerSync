import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - in real app, get username from API response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store a default username if not already set (in real app, get from API)
    if (!localStorage.getItem('username')) {
      const emailUsername = email.split('@')[0];
      localStorage.setItem('username', emailUsername);
    }

    toast({
      title: 'Welcome back!',
      description: 'Successfully signed in to your account.',
    });

    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <Briefcase size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">CareerSync</span>
          </Link>

          <Card className="border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue tracking your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <>
                      Sign In
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 relative gradient-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stage-interviewing/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Track Your Dream Job
          </h2>
          <p className="text-primary-foreground/70 max-w-md">
            Stay organized, never miss a follow-up, and land your next opportunity with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;