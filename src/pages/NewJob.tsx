import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Plus, X, Building2, Target, Users, Link2 } from 'lucide-react';
import { JobStage, LocationType, stageLabels, TimelineEntry, Currency, currencyLabels, StarStory, Contact } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { TimelineEntryModal } from '@/components/TimelineEntryModal';
import { format } from 'date-fns';

const allStages: JobStage[] = ['tagged', 'applying', 'interviewing', 'offer', 'accepted', 'withdrawn', 'rejected', 'ghosting'];
const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];
const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'NGN', 'CAD', 'AUD', 'INR', 'JPY'];

const NewJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);
  const [timelineEntries, setTimelineEntries] = useState<Omit<TimelineEntry, 'id'>[]>([]);

  // Interview Intelligence
  const [companyResearch, setCompanyResearch] = useState('');
  const [starStories, setStarStories] = useState<Omit<StarStory, 'id'>[]>([]);
  const [contacts, setContacts] = useState<Omit<Contact, 'id'>[]>([]);
  const [newStory, setNewStory] = useState({ situation: '', task: '', action: '', result: '', linkedRequirement: '' });
  const [newContact, setNewContact] = useState({ name: '', linkedinUrl: '', email: '', notes: '' });

  const [formData, setFormData] = useState({
    company: '', role: '', location: '', locationType: 'remote' as LocationType,
    stage: 'tagged' as JobStage, interestScore: 3, salary: '', url: '', notes: '',
    currency: 'USD' as Currency, salaryMin: '', salaryMax: '', compensation: '', description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast({ title: 'Job added!', description: `${formData.role} at ${formData.company} has been added.` });
    setIsLoading(false);
    navigate('/dashboard/jobs');
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTimelineEntry = (entry: Omit<TimelineEntry, 'id'>) => {
    setTimelineEntries((prev) => [...prev, entry]);
  };

  const removeTimelineEntry = (index: number) => {
    setTimelineEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const addStarStory = () => {
    if (newStory.situation && newStory.result) {
      setStarStories((prev) => [...prev, newStory]);
      setNewStory({ situation: '', task: '', action: '', result: '', linkedRequirement: '' });
    }
  };

  const removeStarStory = (index: number) => {
    setStarStories((prev) => prev.filter((_, i) => i !== index));
  };

  const addContact = () => {
    if (newContact.name) {
      const contactToAdd: Omit<Contact, 'id'> = { ...newContact, lastContactedAt: new Date().toISOString() };
      setContacts((prev) => [...prev, contactToAdd]);
      setNewContact({ name: '', linkedinUrl: '', email: '', notes: '' });
    }
  };

  const removeContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2 text-muted-foreground">
          <ArrowLeft size={18} className="mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Job</h1>
        <p className="text-muted-foreground mt-1">Track a new job application in your pipeline</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input id="company" placeholder="e.g., Stripe" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input id="role" placeholder="e.g., Senior Frontend Engineer" value={formData.role} onChange={(e) => handleChange('role', e.target.value)} required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type</Label>
                <Select value={formData.locationType} onValueChange={(value) => handleChange('locationType', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{locationTypes.map((loc) => <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., San Francisco, CA" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} />
              </div>
            </div>

            {/* Financial Details */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Financial Details</CardTitle>
                <CardDescription>Salary, currency, and compensation info</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{currencies.map((c) => <SelectItem key={c} value={c}>{currencyLabels[c]}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Min Salary</Label>
                    <Input type="number" placeholder="80000" value={formData.salaryMin} onChange={(e) => handleChange('salaryMin', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Salary</Label>
                    <Input type="number" placeholder="120000" value={formData.salaryMax} onChange={(e) => handleChange('salaryMax', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Compensation</Label>
                  <Input placeholder="e.g., 10% bonus, 0.5% equity" value={formData.compensation} onChange={(e) => handleChange('compensation', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="url">Job link (optional)</Label>
              <Input id="url" type="url" placeholder="https://company.com/careers/..." value={formData.url} onChange={(e) => handleChange('url', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" placeholder="Paste the full job description here..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={6} />
            </div>

            {/* Interview Intelligence Section */}
            <Card className="border-border/50 border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-primary" />
                  <CardTitle className="text-base">Interview Intelligence</CardTitle>
                </div>
                <CardDescription>Prepare thoroughly for your interviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Research */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Building2 size={14} />
                    Company Research
                  </Label>
                  <Textarea
                    placeholder="Mission statement, values, recent news, key products, culture notes..."
                    value={companyResearch}
                    onChange={(e) => setCompanyResearch(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* STAR Method Bank */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Target size={14} />
                    STAR Method Bank
                  </Label>
                  <p className="text-xs text-muted-foreground">Link your experiences to job requirements</p>
                  
                  {starStories.length > 0 && (
                    <div className="space-y-2">
                      {starStories.map((story, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{story.situation.slice(0, 60)}...</p>
                              {story.linkedRequirement && (
                                <p className="text-xs text-primary mt-1">→ {story.linkedRequirement}</p>
                              )}
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeStarStory(i)}><X size={12} /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 p-3 border border-dashed border-border rounded-lg">
                    <Input placeholder="Situation: Describe the context..." value={newStory.situation} onChange={(e) => setNewStory(s => ({ ...s, situation: e.target.value }))} />
                    <Input placeholder="Task: What was your responsibility?" value={newStory.task} onChange={(e) => setNewStory(s => ({ ...s, task: e.target.value }))} />
                    <Input placeholder="Action: What did you do?" value={newStory.action} onChange={(e) => setNewStory(s => ({ ...s, action: e.target.value }))} />
                    <Input placeholder="Result: What was the outcome?" value={newStory.result} onChange={(e) => setNewStory(s => ({ ...s, result: e.target.value }))} />
                    <Input placeholder="Linked to requirement (optional): e.g., 'Leadership experience'" value={newStory.linkedRequirement} onChange={(e) => setNewStory(s => ({ ...s, linkedRequirement: e.target.value }))} />
                    <Button type="button" variant="outline" size="sm" onClick={addStarStory} disabled={!newStory.situation || !newStory.result}>
                      <Plus size={14} className="mr-1" /> Add Story
                    </Button>
                  </div>
                </div>

                {/* Networking Contacts */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Users size={14} />
                    Networking / Referral Contacts
                  </Label>
                  
                  {contacts.length > 0 && (
                    <div className="space-y-2">
                      {contacts.map((contact, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                              {contact.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{contact.name}</p>
                              {contact.linkedinUrl && (
                                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                                  <Link2 size={10} /> LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeContact(i)}><X size={12} /></Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid gap-2 sm:grid-cols-2 p-3 border border-dashed border-border rounded-lg">
                    <Input placeholder="Contact name" value={newContact.name} onChange={(e) => setNewContact(c => ({ ...c, name: e.target.value }))} />
                    <Input placeholder="LinkedIn URL" value={newContact.linkedinUrl} onChange={(e) => setNewContact(c => ({ ...c, linkedinUrl: e.target.value }))} />
                    <Input placeholder="Email (optional)" value={newContact.email} onChange={(e) => setNewContact(c => ({ ...c, email: e.target.value }))} />
                    <Input placeholder="Notes (optional)" value={newContact.notes} onChange={(e) => setNewContact(c => ({ ...c, notes: e.target.value }))} />
                    <Button type="button" variant="outline" size="sm" onClick={addContact} disabled={!newContact.name} className="sm:col-span-2">
                      <Plus size={14} className="mr-1" /> Add Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Interview prep, contacts, negotiation notes..." value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={4} />
            </div>

            {/* Timeline Section */}
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base">Timeline (optional)</CardTitle>
                  <CardDescription>Add interview dates, recruiter info, docs, and notes</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={() => setTimelineModalOpen(true)}>
                  <Plus size={16} className="mr-2" /> Add entry
                </Button>
              </CardHeader>
              <CardContent>
                {timelineEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">No timeline entries yet.</p>
                ) : (
                  <div className="space-y-2">
                    {timelineEntries.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{entry.title}</p>
                          <p className="text-xs text-muted-foreground">{entry.type.toUpperCase()} • {format(new Date(entry.date), 'MMM d, yyyy')}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeTimelineEntry(i)}><X size={14} /></Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90" disabled={isLoading || !formData.company || !formData.role}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={18} className="mr-2" />} Save Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <TimelineEntryModal open={timelineModalOpen} onOpenChange={setTimelineModalOpen} onAdd={handleAddTimelineEntry} />
    </div>
  );
};

export default NewJob;