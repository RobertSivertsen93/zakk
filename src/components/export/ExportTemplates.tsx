
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Check, AlertTriangle } from "lucide-react";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExportFormat = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  validationRules?: string[];
};

interface ExportTemplatesProps {
  data: Record<string, any>;
  onExport: (format: string, templateId: string) => void;
}

const ExportTemplates: React.FC<ExportTemplatesProps> = ({ data, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('json');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const exportFormats: Record<string, ExportFormat[]> = {
    json: [
      {
        id: 'standard',
        name: 'Standard JSON',
        description: 'Export all invoice data as a standard JSON file',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        id: 'customs-declaration',
        name: 'Customs Declaration',
        description: 'Formatted for customs declaration filing',
        icon: <FileText className="h-5 w-5" />,
        validationRules: ['Must have valid HS codes for all items', 'Country of origin required for all items']
      }
    ],
    xml: [
      {
        id: 'standard',
        name: 'Standard XML',
        description: 'Export all invoice data as a standard XML file',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        id: 'tfsci',
        name: 'TFSCI Format',
        description: 'XML format for TFSCI customs integration',
        icon: <FileText className="h-5 w-5" />,
        validationRules: ['Must have valid HS codes', 'All items need quantity and price']
      }
    ],
    csv: [
      {
        id: 'standard',
        name: 'Standard CSV',
        description: 'Export line items as a CSV spreadsheet',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        id: 'customs-simplified',
        name: 'Customs Simplified',
        description: 'CSV format with only customs-relevant fields',
        icon: <FileText className="h-5 w-5" />
      }
    ]
  };

  // Validate export data based on template requirements
  const validateData = (templateId: string): { valid: boolean; issues: string[] } => {
    const issues: string[] = [];
    let valid = true;
    
    // Find the selected template
    const templates = exportFormats[selectedFormat];
    const template = templates.find(t => t.id === templateId);
    
    if (!template || !template.validationRules) {
      return { valid: true, issues: [] };
    }
    
    // Check validation rules
    if (template.validationRules.includes('Must have valid HS codes for all items')) {
      // Check if all items have valid HS codes (simplified check)
      const lineItems = data.lineItems || [];
      const invalidItems = lineItems.filter((item: any) => 
        !item.productNumber || !item.productNumber.match(/^\d{4}\.\d{2}\.\d{2}$/)
      );
      
      if (invalidItems.length > 0) {
        issues.push(`${invalidItems.length} items have invalid or missing HS codes`);
        valid = false;
      }
    }
    
    if (template.validationRules.includes('Country of origin required for all items')) {
      // Check if all items have countries of origin
      const lineItems = data.lineItems || [];
      const missingOrigin = lineItems.filter((item: any) => !item.countryOfOrigin);
      
      if (missingOrigin.length > 0) {
        issues.push(`${missingOrigin.length} items are missing country of origin`);
        valid = false;
      }
    }
    
    return { valid, issues };
  };

  const handleExport = (templateId: string) => {
    // Validate data before export
    const validation = validateData(templateId);
    
    if (!validation.valid) {
      toast.error('Validation failed. Please fix the issues before exporting.');
      
      // Show detailed validation issues
      validation.issues.forEach(issue => {
        toast.warning(issue);
      });
      return;
    }
    
    onExport(selectedFormat, templateId);
    setSelectedTemplate(null);
    
    // Create data string based on format
    let dataString: string;
    
    if (selectedFormat === 'json') {
      dataString = JSON.stringify(data, null, 2);
    } else if (selectedFormat === 'xml') {
      // Simple XML conversion (in real app this would be more sophisticated)
      dataString = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice>
  <Details>
    <InvoiceNumber>${data.invoiceNumber || ''}</InvoiceNumber>
    <InvoiceDate>${data.invoiceDate || ''}</InvoiceDate>
  </Details>
  <LineItems>
    ${(data.lineItems || []).map((item: any) => `
      <Item>
        <HSCode>${item.productNumber || ''}</HSCode>
        <Description>${item.description || ''}</Description>
        <Quantity>${item.quantity || ''}</Quantity>
        <UnitPrice>${item.unitPrice || ''}</UnitPrice>
        <Amount>${item.amount || ''}</Amount>
      </Item>
    `).join('')}
  </LineItems>
</Invoice>`;
    } else if (selectedFormat === 'csv') {
      // Simple CSV conversion
      const headers = ['HS Code', 'Country of Origin', 'Description', 'Quantity', 'Unit Price', 'Amount'];
      const rows = (data.lineItems || []).map((item: any) => [
        item.productNumber || '',
        item.countryOfOrigin || '',
        item.description || '',
        item.quantity || '',
        item.unitPrice || '',
        item.amount || ''
      ]);
      
      dataString = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
    } else {
      dataString = JSON.stringify(data, null, 2); // Default to JSON
    }
    
    // Create blob and download
    const blob = new Blob([dataString], { 
      type: selectedFormat === 'json' 
        ? 'application/json' 
        : selectedFormat === 'xml'
          ? 'application/xml'
          : 'text/csv'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-data.${selectedFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`File exported successfully as ${selectedFormat.toUpperCase()}`);
  };
  
  const handlePreviewData = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="json" value={selectedFormat} onValueChange={setSelectedFormat}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="xml">XML</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
        </TabsList>
        
        {Object.entries(exportFormats).map(([format, templates]) => (
          <TabsContent key={format} value={format} className="grid md:grid-cols-2 gap-4">
            {templates.map(template => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {template.icon}
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  {template.validationRules && (
                    <div className="mt-2 text-xs text-muted-foreground border-l-2 border-muted pl-2">
                      <p className="font-medium">Requirements:</p>
                      <ul className="list-disc pl-4 mt-1">
                        {template.validationRules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreviewData(template.id)}
                    >
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleExport(template.id)}
                    >
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Export Preview</DialogTitle>
          </DialogHeader>
          <div className="border rounded-md p-4 bg-muted/20 overflow-auto">
            <pre className="text-xs">
              {selectedFormat === 'json' && JSON.stringify(data, null, 2)}
              {selectedFormat === 'xml' && `<?xml version="1.0" encoding="UTF-8"?>
<Invoice>
  <Details>
    <InvoiceNumber>${data.invoiceNumber || ''}</InvoiceNumber>
    <InvoiceDate>${data.invoiceDate || ''}</InvoiceDate>
  </Details>
  <LineItems>
    ${(data.lineItems || []).map((item: any) => `
      <Item>
        <HSCode>${item.productNumber || ''}</HSCode>
        <Description>${item.description || ''}</Description>
        <Quantity>${item.quantity || ''}</Quantity>
        <UnitPrice>${item.unitPrice || ''}</UnitPrice>
        <Amount>${item.amount || ''}</Amount>
      </Item>
    `).join('')}
  </LineItems>
</Invoice>`}
              {selectedFormat === 'csv' && `HS Code,Country of Origin,Description,Quantity,Unit Price,Amount
${(data.lineItems || []).map((item: any) => 
  `${item.productNumber || ''},${item.countryOfOrigin || ''},${item.description || ''},${item.quantity || ''},${item.unitPrice || ''},${item.amount || ''}`
).join('\n')}`}
            </pre>
          </div>
          
          {selectedTemplate && (
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                onClick={() => handleExport(selectedTemplate)}
                className="gap-2"
              >
                <Download className="h-4 w-4" /> 
                Export Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExportTemplates;
