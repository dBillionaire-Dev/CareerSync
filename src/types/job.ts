export type JobStage =
  | 'tagged'
  | 'applying'
  | 'interviewing'
  | 'offer'
  | 'accepted'
  | 'withdrawn'
  | 'rejected'
  | 'ghosting';

export type LocationType = 'remote' | 'hybrid' | 'onsite';

export interface TimelineEntry {
  id: string;
  date: string;
  type: 'interview' | 'followup' | 'offer' | 'note' | 'application';
  title: string;
  description?: string;
  recruiterName?: string;
  interviewers?: string[];
  resumeLink?: string;
  coverLetterLink?: string;
}

export interface StarStory {
  situation: string;
  task: string;
  action: string;
  result: string;
  linkedRequirement?: string;
}

export interface Contact {
  name: string;
  role?: string;
  linkedinUrl?: string;
  email?: string;
  notes?: string;
  lastContactedAt?: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'NGN' | 'CAD' | 'AUD' | 'INR' | 'JPY';

export const currencyLabels: Record<Currency, string> = {
  USD: 'USD ($)',
  EUR: 'EUR (€)',
  GBP: 'GBP (£)',
  NGN: 'NGN (₦)',
  CAD: 'CAD (C$)',
  AUD: 'AUD (A$)',
  INR: 'INR (₹)',
  JPY: 'JPY (¥)',
};

export interface SalaryRange {
  min: number;
  max: number;
  currency: Currency;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  locationType: LocationType;
  stage: JobStage;
  interestScore: number; // 1-5
  salary?: string;
  salaryRange?: SalaryRange;
  compensation?: string; // bonuses, equity, etc.
  currency?: Currency;
  url?: string;
  notes?: string;
  description?: string; // detailed job description
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEntry[];
  isArchived: boolean;
  followUpDate?: string;
  // Interview Intelligence
  companyResearch?: string;
  starStories?: StarStory[];
  contacts?: Contact[];
}

export interface JobFilters {
  search: string;
  stages: JobStage[];
  interestScore: number | null;
  locationType: LocationType | null;
}

export const stageLabels: Record<JobStage, string> = {
  tagged: 'Tagged (Not Yet)',
  applying: 'Applying',
  interviewing: 'Interviewing',
  offer: 'Offer',
  accepted: 'Accepted',
  withdrawn: 'Withdrawn',
  rejected: 'Rejected',
  ghosting: 'Ghosting',
};

export const stageColors: Record<JobStage, string> = {
  tagged: 'bg-stage-tagged/10 text-stage-tagged border-stage-tagged/30',
  applying: 'bg-stage-applying/10 text-stage-applying border-stage-applying/30',
  interviewing: 'bg-stage-interviewing/10 text-stage-interviewing border-stage-interviewing/30',
  offer: 'bg-stage-offer/10 text-stage-offer border-stage-offer/30',
  accepted: 'bg-stage-accepted/10 text-stage-accepted border-stage-accepted/30',
  withdrawn: 'bg-stage-withdrawn/10 text-stage-withdrawn border-stage-withdrawn/30',
  rejected: 'bg-stage-rejected/10 text-stage-rejected border-stage-rejected/30',
  ghosting: 'bg-stage-ghosting/10 text-stage-ghosting border-stage-ghosting/30',
};
