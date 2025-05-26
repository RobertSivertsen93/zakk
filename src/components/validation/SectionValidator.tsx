import React, { useState } from 'react';
import { Check, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export type ValidationItem = {
  id: string;
  label: string;
  description?: string;
  isRequired: boolean;
  status: 'valid' | 'invalid' | 'warning' | 'pending';
};

export type ValidationSection = {
  id: string;
  title: string;
  items: ValidationItem[];
};

interface SectionValidatorProps {
  section: ValidationSection;
  onValidate: () => void;
  onUpdateStatus: (itemId: string, status: 'valid' | 'invalid' | 'warning' | 'pending') => void;
}

const SectionValidator: React.FC<SectionValidatorProps> = ({ 
  section, 
  onValidate,
  onUpdateStatus
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate section status
  const getSectionStatus = () => {
    const requiredItems = section.items.filter(item => item.isRequired);
    
    // If any required item is invalid, the section is invalid
    if (requiredItems.some(item => item.status === 'invalid')) {
      return 'invalid';
    }
    
    // If all required items are valid, but there are warnings, the section is warning
    if (requiredItems.every(item => item.status === 'valid') && 
        section.items.some(item => item.status === 'warning')) {
      return 'warning';
    }
    
    // If all required items are valid and no warnings, the section is valid
    if (requiredItems.every(item => item.status === 'valid')) {
      return 'valid';
    }
    
    // Otherwise, the section is pending
    return 'pending';
  };
  
  const sectionStatus = getSectionStatus();
  
  const handleValidateAll = () => {
    onValidate();
    toast.success(`Validated ${section.title} section`);
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            {sectionStatus === 'valid' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {sectionStatus === 'invalid' && <XCircle className="h-5 w-5 text-red-500" />}
            {sectionStatus === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            {sectionStatus === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-muted" />}
            {section.title}
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide' : 'Show'} Checklist
          </Button>
        </CardTitle>
      </CardHeader>
      
      {expanded && (
        <CardContent>
          <ul className="space-y-2">
            {section.items.map(item => (
              <li key={item.id} className="flex items-center gap-3">
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full
                  ${item.status === 'valid' ? 'bg-green-100 text-green-500' : 
                    item.status === 'invalid' ? 'bg-red-100 text-red-500' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                    'bg-muted text-muted-foreground'}
                `}>
                  {item.status === 'valid' && <Check className="h-4 w-4" />}
                  {item.status === 'invalid' && <XCircle className="h-4 w-4" />}
                  {item.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                  {item.status === 'pending' && <span className="text-xs">?</span>}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.isRequired && (
                      <span className="text-xs text-muted-foreground">(Required)</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Cycle through statuses: pending -> valid -> warning -> invalid -> pending
                    const nextStatus = 
                      item.status === 'pending' ? 'valid' :
                      item.status === 'valid' ? 'warning' :
                      item.status === 'warning' ? 'invalid' : 'pending';
                      
                    onUpdateStatus(item.id, nextStatus);
                  }}
                >
                  Update
                </Button>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={handleValidateAll}>
              Validate All Items
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SectionValidator;
