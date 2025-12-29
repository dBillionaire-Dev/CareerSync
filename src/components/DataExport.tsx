import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { Job } from '@/types/job';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface DataExportProps {
  jobs: Job[];
}

export const DataExport = ({ jobs }: DataExportProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const headers = [
        'Company', 'Role', 'Stage', 'Location', 'Location Type', 'Interest Score',
        'Salary', 'Currency', 'Applied At', 'Created At', 'Notes', 'URL'
      ];

      const rows = jobs.map((job) => [
        job.company,
        job.role,
        job.stage,
        job.location,
        job.locationType,
        job.interestScore,
        job.salary || '',
        job.currency || '',
        job.appliedAt ? format(new Date(job.appliedAt), 'yyyy-MM-dd') : '',
        format(new Date(job.createdAt), 'yyyy-MM-dd'),
        (job.notes || '').replace(/"/g, '""'),
        job.url || ''
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `job-applications-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: 'Export complete', description: `${jobs.length} jobs exported to CSV` });
    } catch (error) {
      toast({ title: 'Export failed', description: 'Could not export data', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamic import for react-to-print alternative - simple PDF generation
      const printContent = jobs.map((job) => 
        `${job.company} - ${job.role} (${job.stage})\nLocation: ${job.location} (${job.locationType})\nApplied: ${job.appliedAt ? format(new Date(job.appliedAt), 'MMM d, yyyy') : 'Not yet'}\n${job.notes ? 'Notes: ' + job.notes : ''}\n---`
      ).join('\n\n');

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Job Applications Export</title>
              <style>
                body { font-family: system-ui, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                .job { margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; }
                .job h2 { margin: 0 0 8px 0; color: #334155; font-size: 16px; }
                .job p { margin: 4px 0; color: #64748b; font-size: 14px; }
                .stage { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; background: #e2e8f0; }
              </style>
            </head>
            <body>
              <h1>Job Applications Export</h1>
              <p style="color: #64748b;">Generated on ${format(new Date(), 'MMMM d, yyyy')}</p>
              ${jobs.map((job) => `
                <div class="job">
                  <h2>${job.company} - ${job.role}</h2>
                  <p><span class="stage">${job.stage}</span></p>
                  <p>📍 ${job.location} (${job.locationType})</p>
                  ${job.appliedAt ? `<p>📅 Applied: ${format(new Date(job.appliedAt), 'MMM d, yyyy')}</p>` : ''}
                  ${job.salary ? `<p>💰 ${job.salary}</p>` : ''}
                  ${job.notes ? `<p>📝 ${job.notes}</p>` : ''}
                </div>
              `).join('')}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }

      toast({ title: 'PDF ready', description: 'Print dialog opened for PDF export' });
    } catch (error) {
      toast({ title: 'Export failed', description: 'Could not generate PDF', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting || jobs.length === 0}>
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet size={16} className="mr-2" />
          Export to CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF}>
          <FileText size={16} className="mr-2" />
          Export to PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
