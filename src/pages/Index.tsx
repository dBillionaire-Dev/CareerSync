import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Briefcase,
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Sparkles,
  Send,
  Code2,
} from 'lucide-react';
import { MobileNav } from '@/components/MobileNav';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const features = [
  {
    icon: Target,
    title: 'Track Every Application',
    description: 'Never lose track of where you applied. Organize jobs by stage from tagged to accepted.',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Visualize your job search with charts showing success rates, ghosting trends, and more.',
  },
  {
    icon: Clock,
    title: 'Timeline View',
    description: 'Keep a detailed history of interviews, follow-ups, and important dates for each application.',
  },
  {
    icon: TrendingUp,
    title: 'Interest Scoring',
    description: 'Rate your interest in each role to prioritize where to focus your energy.',
  },
];

const stats = [
  { value: '8+', label: 'Application Stages' },
  { value: '100%', label: 'Organized' },
  { value: '0', label: 'Missed Opportunities' },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent!', description: 'We\'ll get back to you soon.' });
    setContactForm({ name: '', email: '', message: '' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <Briefcase size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">CareerSync</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              {/* <Button variant="ghost" className="font-medium"> */}
              <Button className="gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity">
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav onLogout={handleLogout} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-stage-interviewing/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles size={16} />
              Your job search, organized
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
              Track Your
              <span className="text-gradient block mt-2">Job Applications</span>
              <span className="block mt-2">Like a Pro</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              From first application to offer accepted. Stay organized, never miss a follow-up, 
              and land your dream job with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register">
                <Button size="lg" className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all px-8 py-6 text-lg">
                  Start Tracking Free
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="font-semibold px-8 py-6 text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-gradient"> Land Your Next Role</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern job seekers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Track Every Stage of
              <span className="text-gradient"> Your Journey</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              { label: 'Tagged', color: 'bg-stage-tagged/10 text-stage-tagged border-stage-tagged/30' },
              { label: 'Applying', color: 'bg-stage-applying/10 text-stage-applying border-stage-applying/30' },
              { label: 'Interviewing', color: 'bg-stage-interviewing/10 text-stage-interviewing border-stage-interviewing/30' },
              { label: 'Offer', color: 'bg-stage-offer/10 text-stage-offer border-stage-offer/30' },
              { label: 'Accepted', color: 'bg-stage-accepted/10 text-stage-accepted border-stage-accepted/30' },
              { label: 'Withdrawn', color: 'bg-stage-withdrawn/10 text-stage-withdrawn border-stage-withdrawn/30' },
              { label: 'Rejected', color: 'bg-stage-rejected/10 text-stage-rejected border-stage-rejected/30' },
              { label: 'Ghosting', color: 'bg-stage-ghosting/10 text-stage-ghosting border-stage-ghosting/30' },
            ].map((stage, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-transform hover:scale-105 ${stage.color}`}
              >
                {stage.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark -z-10" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-stage-offer/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Organize Your Job Search?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            Join thousands of job seekers who've transformed their application process
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:bg-primary-foreground/90 px-8 py-6 text-lg transition-opacity">
              Get Started for Free
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl">Contact Us</CardTitle>
                <p className="text-muted-foreground mt-2">Have questions? We'd love to hear from you.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input 
                        placeholder="Your name" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="How can we help?" 
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-hero text-primary-foreground font-semibold">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Briefcase size={16} className="text-primary-foreground" />
              </div>
              <span className="font-bold">CareerSync</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/developer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Code2 size={16} />
                Developer
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} CareerSync. Built for ambitious job seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;