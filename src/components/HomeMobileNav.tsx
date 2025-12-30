import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function HomeMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                <Briefcase size={18} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">CareerSync</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-3">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 font-medium">
                <LogIn size={18} />
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}>
              <Button className="w-full justify-start gap-3 gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-opacity">
                <UserPlus size={18} />
                Get Started
                <ArrowRight size={16} className="ml-auto" />
              </Button>
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
