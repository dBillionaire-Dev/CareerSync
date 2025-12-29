import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Filter, X, LayoutGrid, List, Columns3 } from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { JobCard } from '@/components/JobCard';
import { JobTableRow } from '@/components/JobTableRow';
import { KanbanBoard } from '@/components/KanbanBoard';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { FollowUpModal } from '@/components/FollowUpModal';
import { DataExport } from '@/components/DataExport';
import { OfferComparison } from '@/components/OfferComparison';
import { EmptyState } from '@/components/EmptyState';
import { JobStage, LocationType, stageLabels, Job } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const allStages: JobStage[] = [
  'tagged',
  'applying',
  'interviewing',
  'offer',
  'accepted',
  'withdrawn',
  'rejected',
  'ghosting',
];

const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

type ViewMode = 'grid' | 'table' | 'kanban';

const Jobs = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [selectedStages, setSelectedStages] = useState<JobStage[]>([]);
  const [interestFilter, setInterestFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? 'table' : 'grid');
  const [showArchived, setShowArchived] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  
  // Follow-up modal state
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [jobForFollowUp, setJobForFollowUp] = useState<Job | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Archive filter
      if (showArchived) {
        if (!job.isArchived) return false;
      } else {
        if (job.isArchived) return false;
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !job.company.toLowerCase().includes(searchLower) &&
          !job.role.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Stage filter
      if (selectedStages.length > 0 && !selectedStages.includes(job.stage)) {
        return false;
      }

      // Interest filter
      if (interestFilter !== 'all' && job.interestScore !== parseInt(interestFilter)) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && job.locationType !== locationFilter) {
        return false;
      }

      return true;
    });
  }, [jobs, search, selectedStages, interestFilter, locationFilter, showArchived]);

  const handleStageToggle = (stage: JobStage) => {
    setSelectedStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedStages([]);
    setInterestFilter('all');
    setLocationFilter('all');
  };

  const hasActiveFilters =
    search || selectedStages.length > 0 || interestFilter !== 'all' || locationFilter !== 'all';

  const totalCount = jobs.filter((j) => (showArchived ? j.isArchived : !j.isArchived)).length;

  const handleEdit = (job: Job) => {
    toast({ title: 'Edit', description: `Editing ${job.company} - ${job.role}` });
  };

  const handleView = (job: Job) => {
    toast({ title: 'View', description: `Viewing ${job.company} - ${job.role}` });
  };

  const handleDeleteClick = (job: Job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
      toast({ title: 'Deleted', description: `${jobToDelete.company} - ${jobToDelete.role} has been deleted`, variant: 'destructive' });
      setJobToDelete(null);
    }
    setDeleteDialogOpen(false);
  };
  
  const handleFollowUpClick = (job: Job) => {
    setJobForFollowUp(job);
    setFollowUpModalOpen(true);
  };
  
  const handleScheduleFollowUp = async (date: Date) => {
    if (jobForFollowUp) {
      toast({ 
        title: 'Follow-up Scheduled', 
        description: `Reminder set for ${jobForFollowUp.company} on ${date.toLocaleDateString()}` 
      });
    }
    setJobForFollowUp(null);
  };

  const handleKanbanUpdate = (jobId: string, newStage: JobStage) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, stage: newStage } : job))
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground mt-1">
            {filteredJobs.length} of {totalCount} jobs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DataExport jobs={filteredJobs} />
          <OfferComparison jobs={jobs} />
          <Link to="/dashboard/jobs/new">
            <Button className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90">
              <Plus size={18} className="mr-2" />
              Add Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Show Archived toggle */}
            <div className="flex items-center gap-2 px-3 py-2 border rounded-lg border-border/50">
              <Checkbox
                id="showArchived"
                checked={showArchived}
                onCheckedChange={(checked) => setShowArchived(checked === true)}
              />
              <label htmlFor="showArchived" className="text-sm cursor-pointer">
                Show archived
              </label>
            </div>

            {/* Stage filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Stages
                  {selectedStages.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {selectedStages.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {allStages.map((stage) => (
                  <DropdownMenuCheckboxItem
                    key={stage}
                    checked={selectedStages.includes(stage)}
                    onCheckedChange={() => handleStageToggle(stage)}
                  >
                    {stageLabels[stage]}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Interest filter */}
            <Select value={interestFilter} onValueChange={setInterestFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interest</SelectItem>
                <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                <SelectItem value="3">⭐⭐⭐</SelectItem>
                <SelectItem value="2">⭐⭐</SelectItem>
                <SelectItem value="1">⭐</SelectItem>
              </SelectContent>
            </Select>

            {/* Location filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locationTypes.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View mode toggle - hidden on mobile */}
            {!isMobile && (
              <div className="flex items-center border rounded-lg border-border/50 overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('table')}
                  title="Table View"
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('kanban')}
                  title="Kanban View"
                >
                  <Columns3 size={16} />
                </Button>
              </div>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="icon" onClick={clearFilters} className="text-muted-foreground">
                <X size={18} />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Jobs Display */}
      {filteredJobs.length > 0 ? (
        <>
          {/* Mobile always shows table */}
          {isMobile ? (
            <Card className="border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <JobTableRow
                      key={job.id}
                      job={job}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteClick}
                      onFollowUp={handleFollowUpClick}
                      compact
                    />
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onEdit={() => handleEdit(job)}
                  onView={() => handleView(job)}
                  onDelete={() => handleDeleteClick(job)}
                  onFollowUp={() => handleFollowUpClick(job)}
                />
              ))}
            </div>
          ) : viewMode === 'kanban' ? (
            <KanbanBoard
              jobs={filteredJobs}
              onJobUpdate={handleKanbanUpdate}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDeleteClick}
            />
          ) : (
            <Card className="border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <JobTableRow
                      key={job.id}
                      job={job}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteClick}
                      onFollowUp={handleFollowUpClick}
                    />
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
                <Button variant="outline" size="sm" disabled>
                  Prev
                </Button>
                <span className="text-sm text-muted-foreground">
                  Showing 1–{filteredJobs.length} of {filteredJobs.length}
                </span>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </Card>
          )}
        </>
      ) : (
        <EmptyState 
          type={hasActiveFilters ? 'search' : showArchived ? 'archived' : 'jobs'} 
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        description="This action cannot be undone."
      />
      
      {/* Follow-up Modal */}
      {jobForFollowUp && (
        <FollowUpModal
          open={followUpModalOpen}
          onOpenChange={setFollowUpModalOpen}
          onSchedule={handleScheduleFollowUp}
          companyName={jobForFollowUp.company}
        />
      )}
    </div>
  );
};

export default Jobs;
