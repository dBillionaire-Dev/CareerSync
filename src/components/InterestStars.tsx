import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterestStarsProps {
  score: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const InterestStars = ({ score, className, size = 'sm' }: InterestStarsProps) => {
  const iconSize = size === 'sm' ? 14 : 18;
  
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={iconSize}
          className={cn(
            'transition-colors duration-200',
            star <= score
              ? 'fill-amber-400 text-amber-400'
              : 'fill-transparent text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
};
