import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, Plus, Search, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'jobs' | 'timeline' | 'search' | 'archived';
  className?: string;
}

const emptyStates = {
  jobs: {
    icon: Briefcase,
    title: 'Your journey starts here',
    description: 'Add your first job application and start tracking your career progress.',
    cta: 'Add Your First Job',
    ctaLink: '/dashboard/jobs/new',
  },
  timeline: {
    icon: Calendar,
    title: 'No timeline entries yet',
    description: 'Timeline entries will appear here as you add interviews, follow-ups, and notes to your applications.',
    cta: 'Browse Jobs',
    ctaLink: '/dashboard/jobs',
  },
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    cta: null,
    ctaLink: null,
  },
  archived: {
    icon: FileText,
    title: 'No archived jobs',
    description: 'Jobs you archive will appear here for your records.',
    cta: null,
    ctaLink: null,
  },
};

export const EmptyState = ({ type, className }: EmptyStateProps) => {
  const config = emptyStates[type];
  const Icon = config.icon;

  return (
    <Card className={cn('p-12 text-center border-border/50', className)}>
      <div className="max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-6 flex items-center justify-center">
          <Icon size={32} className="text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-2">{config.title}</h3>
        <p className="text-muted-foreground mb-6">{config.description}</p>
        {config.cta && config.ctaLink && (
          <Link to={config.ctaLink}>
            <Button className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90">
              <Plus size={18} className="mr-2" />
              {config.cta}
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};
