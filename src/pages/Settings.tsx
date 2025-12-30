import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Mail, Shield, Trash2, Camera, ImageIcon } from 'lucide-react';
import { DeleteAccountDialog } from '@/components/DeleteAccountDialog';

const Settings = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-3xl">
      <div><h1 className="text-3xl font-bold tracking-tight">Settings</h1><p className="text-muted-foreground mt-1">Manage your account and preferences</p></div>

      {/* Profile */}
      <Card className="border-border/50">
        <CardHeader><CardTitle className="flex items-center gap-2"><User size={20} className="text-primary" />Profile</CardTitle><CardDescription>Update your personal information</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          {/* Cover Banner Upload */}
          <div className="space-y-2">
            <Label>Cover Banner</Label>
            <div className="relative w-full h-32 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={24} className="mx-auto text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload cover banner</span>
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <Label>Profile Avatar</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center overflow-hidden">
                <Camera size={24} className="text-muted-foreground" />
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div>
                <p className="text-sm font-medium">Upload avatar</p>
                <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" defaultValue="John Doe" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="john@example.com" /></div>
          </div>
          <Button className="gradient-hero text-primary-foreground">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/50">
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell size={20} className="text-primary" />Notifications</CardTitle><CardDescription>Configure how you receive updates</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between"><div><p className="font-medium">Email Notifications</p><p className="text-sm text-muted-foreground">Receive email reminders for follow-ups</p></div><Switch defaultChecked /></div>
          <Separator />
          <div className="flex items-center justify-between"><div><p className="font-medium">Interview Reminders</p><p className="text-sm text-muted-foreground">Get notified 24 hours before interviews</p></div><Switch defaultChecked /></div>
          <Separator />
          <div className="flex items-center justify-between"><div><p className="font-medium">Weekly Summary</p><p className="text-sm text-muted-foreground">Receive a weekly report of your job search</p></div><Switch /></div>
        </CardContent>
      </Card>

      {/* Email Integration */}
      <Card className="border-border/50">
        <CardHeader><CardTitle className="flex items-center gap-2"><Mail size={20} className="text-primary" />Email Integration</CardTitle><CardDescription>Connect your email for follow-up automation</CardDescription></CardHeader>
        <CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Connect your email account to automatically send follow-up emails and track responses.</p><Button variant="outline">Connect Email</Button></CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border/50">
        <CardHeader><CardTitle className="flex items-center gap-2"><Shield size={20} className="text-primary" />Security</CardTitle><CardDescription>Manage your account security</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label htmlFor="current-password">Current Password</Label><Input id="current-password" type="password" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="new-password">New Password</Label><Input id="new-password" type="password" /></div>
            <div className="space-y-2"><Label htmlFor="confirm-password">Confirm Password</Label><Input id="confirm-password" type="password" /></div>
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><Trash2 size={20} />Danger Zone</CardTitle><CardDescription>Irreversible actions for your account</CardDescription></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Deleting your account will schedule it for permanent removal after 30 days. 
            You can recover your account by logging back in within that period.
          </p>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 size={16} className="mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <DeleteAccountDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </div>
  );
};

export default Settings;
