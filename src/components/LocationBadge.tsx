import { MapPin, Home, Building2 } from 'lucide-react';
import { LocationType } from '@/types/job';
import { cn } from '@/lib/utils';

interface LocationBadgeProps {
  type: LocationType;
  location: string;
  className?: string;
}

const locationIcons: Record<LocationType, typeof MapPin> = {
  remote: Home,
  hybrid: Building2,
  onsite: MapPin,
};

const locationLabels: Record<LocationType, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

export const LocationBadge = ({ type, location, className }: LocationBadgeProps) => {
  const Icon = locationIcons[type];
  
  return (
    <div className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      <Icon size={14} className="shrink-0" />
      <span>{location}</span>
      <span className="text-muted-foreground/50">•</span>
      <span className="text-xs font-medium uppercase tracking-wider">{locationLabels[type]}</span>
    </div>
  );
};
