import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Job, currencyLabels } from '@/types/job';
import { Scale, Check, X, MapPin, DollarSign, Briefcase, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferComparisonProps {
  jobs: Job[];
}

export const OfferComparison = ({ jobs }: OfferComparisonProps) => {
  const [open, setOpen] = useState(false);
  const [job1Id, setJob1Id] = useState<string>('');
  const [job2Id, setJob2Id] = useState<string>('');

  const offerJobs = jobs.filter((j) => j.stage === 'offer' || j.stage === 'accepted');
  const job1 = jobs.find((j) => j.id === job1Id);
  const job2 = jobs.find((j) => j.id === job2Id);

  const compareValue = (val1: number | undefined, val2: number | undefined) => {
    if (!val1 && !val2) return 'equal';
    if (!val1) return 'job2';
    if (!val2) return 'job1';
    return val1 > val2 ? 'job1' : val1 < val2 ? 'job2' : 'equal';
  };

  const ComparisonRow = ({ 
    label, 
    job1Value, 
    job2Value, 
    icon,
    higherIsBetter = true 
  }: { 
    label: string; 
    job1Value: React.ReactNode; 
    job2Value: React.ReactNode;
    icon: React.ReactNode;
    higherIsBetter?: boolean;
  }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border/30">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-center">{job1Value || '-'}</div>
      <div className="text-sm font-medium text-center">{job2Value || '-'}</div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={offerJobs.length < 2}>
          <Scale size={16} className="mr-2" />
          Compare Offers
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Compare Offers</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select value={job1Id} onValueChange={setJob1Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select first offer" />
            </SelectTrigger>
            <SelectContent>
              {offerJobs.map((job) => (
                <SelectItem key={job.id} value={job.id} disabled={job.id === job2Id}>
                  {job.company} - {job.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={job2Id} onValueChange={setJob2Id}>
            <SelectTrigger>
              <SelectValue placeholder="Select second offer" />
            </SelectTrigger>
            <SelectContent>
              {offerJobs.map((job) => (
                <SelectItem key={job.id} value={job.id} disabled={job.id === job1Id}>
                  {job.company} - {job.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {job1 && job2 ? (
          <Card className="p-4 border-border/50">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border/50 mb-2">
              <div className="text-sm font-medium text-muted-foreground">Attribute</div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary mx-auto mb-1">
                  {job1.company.charAt(0)}
                </div>
                <p className="font-semibold text-sm truncate">{job1.company}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary mx-auto mb-1">
                  {job2.company.charAt(0)}
                </div>
                <p className="font-semibold text-sm truncate">{job2.company}</p>
              </div>
            </div>

            <ComparisonRow 
              label="Role" 
              job1Value={job1.role} 
              job2Value={job2.role}
              icon={<Briefcase size={14} />}
            />
            <ComparisonRow 
              label="Salary" 
              job1Value={job1.salaryRange ? `${job1.currency} ${job1.salaryRange.min.toLocaleString()}-${job1.salaryRange.max.toLocaleString()}` : job1.salary} 
              job2Value={job2.salaryRange ? `${job2.currency} ${job2.salaryRange.min.toLocaleString()}-${job2.salaryRange.max.toLocaleString()}` : job2.salary}
              icon={<DollarSign size={14} />}
            />
            <ComparisonRow 
              label="Location" 
              job1Value={`${job1.location} (${job1.locationType})`} 
              job2Value={`${job2.location} (${job2.locationType})`}
              icon={<MapPin size={14} />}
            />
            <ComparisonRow 
              label="Compensation" 
              job1Value={job1.compensation} 
              job2Value={job2.compensation}
              icon={<DollarSign size={14} />}
            />
            <ComparisonRow 
              label="Interest Score" 
              job1Value={<span>{'⭐'.repeat(job1.interestScore)}</span>} 
              job2Value={<span>{'⭐'.repeat(job2.interestScore)}</span>}
              icon={<Star size={14} />}
            />
          </Card>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Select two offers to compare
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
