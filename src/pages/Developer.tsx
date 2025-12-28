import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail,
  Code2,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const Developer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <Briefcase size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">JobTracker</span>
          </Link>
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-full gradient-hero mx-auto mb-6 flex items-center justify-center shadow-glow">
              <Code2 size={48} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Developer Profile</h1>
            <p className="text-xl text-muted-foreground">Full-Stack Developer</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="mailto:developer@example.com">
                <Mail size={20} />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://portfolio.dev" target="_blank" rel="noopener noreferrer">
                <Globe size={20} />
              </a>
            </Button>
          </div>

          {/* About */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} className="text-primary" />
                About This Project
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                JobTracker is a modern job application tracking system built with React, 
                TypeScript, and Tailwind CSS. It helps job seekers organize their applications, 
                track interview stages, and analyze their job search progress.
              </p>
              <p className="text-muted-foreground">
                The backend is powered by Node.js, Express, and MongoDB, providing a robust 
                RESTful API for managing job data securely.
              </p>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 size={20} className="text-primary" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'React', 'TypeScript', 'Tailwind CSS', 'Vite',
                  'Node.js', 'Express', 'MongoDB', 'JWT Auth',
                  'Axios', 'Recharts', 'shadcn/ui', 'React Router'
                ].map((tech) => (
                  <div 
                    key={tech}
                    className="px-4 py-2 bg-muted rounded-lg text-center text-sm font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" />
                Skills & Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  Full-stack web development with modern JavaScript frameworks
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  RESTful API design and implementation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  Database design with SQL and NoSQL solutions
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  UI/UX design with responsive, accessible interfaces
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 JobTracker. Built with ❤️ by the developer.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Developer;
