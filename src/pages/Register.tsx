import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Mail, Lock, User, AtSign, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const benefits = [
  'Track unlimited job applications',
  'Visualize your job search analytics',
  'Never miss a follow-up deadline',
  'Organize interviews and contacts',
];

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Store username in localStorage for greeting
    localStorage.setItem('username', username || name.split(' ')[0]);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Account created!',
      description: 'Welcome to JobTracker. Let\'s start organizing your job search.',
    });

    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 relative gradient-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-stage-offer/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col items-start justify-center p-12">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Start Your Success Story
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
            Join thousands of job seekers who've transformed their application process with JobTracker.
          </p>
          
          <ul className="space-y-4">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-primary-foreground/80">
                <CheckCircle2 size={20} className="text-stage-offer" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
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
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Get started with your free JobTracker account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="password">Password</Label>
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
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
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
                      Create Account
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;