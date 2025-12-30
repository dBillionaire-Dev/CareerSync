import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Google icon component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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
      title: `Welcome back ${username || email.split('@')[0]}!`,
      description: 'Successfully signed in to your account.',
    });

    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: 'Google Sign In',
      description: 'Google OAuth requires backend integration with Lovable Cloud. Please set up Supabase Auth or use email/password login.',
      variant: 'destructive',
    });
    
    setIsGoogleLoading(false);
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
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="ml-2">Continue with Google</span>
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

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