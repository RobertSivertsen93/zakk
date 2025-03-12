
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  FileJson, 
  FileText, 
  Download, 
  Table, 
  Check,
  Copy
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const formatOptions = [
  {
    id: 'json',
    label: 'JSON',
    icon: <FileJson className="h-8 w-8" />,
    description: 'Structured data format for API integration'
  },
  {
    id: 'csv',
    label: 'CSV',
    icon: <Table className="h-8 w-8" />,
    description: 'Comma-separated values for spreadsheet import'
  },
  {
    id: 'txt',
    label: 'Text',
    icon: <FileText className="h-8 w-8" />,
    description: 'Plain text format for simple integration'
  }
];

type ExportOptionsProps = {
  data: Record<string, any>;
  onExport: (format: string) => void;
};

const ExportOptions = ({ data, onExport }: ExportOptionsProps) => {
  const [selectedFormat, setSelectedFormat] = React.useState<string>('json');
  const [dataPreview, setDataPreview] = React.useState<string>('');
  
  React.useEffect(() => {
    // Generate preview based on selected format
    switch (selectedFormat) {
      case 'json':
        setDataPreview(JSON.stringify(data, null, 2));
        break;
      case 'csv':
        const headers = Object.keys(data).join(',');
        const values = Object.values(data).join(',');
        setDataPreview(`${headers}\n${values}`);
        break;
      case 'txt':
        let txtContent = '';
        Object.entries(data).forEach(([key, value]) => {
          txtContent += `${key}: ${value}\n`;
        });
        setDataPreview(txtContent);
        break;
      default:
        setDataPreview('');
    }
  }, [selectedFormat, data]);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dataPreview);
    toast.success('Copied to clipboard');
  };
  
  const handleExport = () => {
    onExport(selectedFormat);
    
    // Create blob and download
    const blob = new Blob([dataPreview], { 
      type: getContentType(selectedFormat) 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.${selectedFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File exported successfully');
  };
  
  const getContentType = (format: string) => {
    switch (format) {
      case 'json': return 'application/json';
      case 'csv': return 'text/csv';
      case 'txt': return 'text/plain';
      default: return 'text/plain';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formatOptions.map((format) => (
          <button
            key={format.id}
            className={cn(
              "glass-card flex flex-col items-center text-center p-6 cursor-pointer relative overflow-hidden group transition-all",
              selectedFormat === format.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedFormat(format.id)}
          >
            {selectedFormat === format.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className={cn(
              "text-muted-foreground group-hover:text-primary transition-colors mb-3",
              selectedFormat === format.id && "text-primary"
            )}>
              {format.icon}
            </div>
            <h3 className="font-medium text-lg mb-2">{format.label}</h3>
            <p className="text-sm text-muted-foreground">{format.description}</p>
          </button>
        ))}
      </div>
      
      <div className="glass-panel overflow-hidden">
        <div className="flex items-center justify-between bg-secondary/50 py-2 px-4 border-b">
          <div className="text-sm font-medium">Data Preview</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1 text-xs"
            onClick={handleCopyToClipboard}
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </Button>
        </div>
        <pre className="p-4 overflow-auto text-xs font-mono max-h-[300px] whitespace-pre-wrap">{dataPreview}</pre>
      </div>
      
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="gap-2"
          onClick={handleExport}
        >
          <Download className="h-5 w-5" />
          Export as {selectedFormat.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;
