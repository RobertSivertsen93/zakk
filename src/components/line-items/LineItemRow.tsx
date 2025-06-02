
import React from 'react';
import { LineItem } from './types';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pen, Trash2, Info, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { hsCodeDatabase } from './HSCodeValidator';

interface LineItemRowProps {
  item: LineItem;
  onEdit: (item: LineItem) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  hasSelection?: boolean;
}

const LineItemRow: React.FC<LineItemRowProps> = ({ 
  item, 
  onEdit, 
  onDelete, 
  isSelected, 
  onToggleSelect,
  hasSelection = false
}) => {
  // Function to determine confidence indicator color
  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Function to determine confidence class
  const getConfidenceClass = (percentage: number) => {
    if (percentage >= 85) return "text-green-700 bg-green-100";
    if (percentage >= 60) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
  };
  
  // Get HS code description from database
  const getHSCodeDescription = (code: string): string => {
    const hsCodeEntry = hsCodeDatabase.find(entry => entry.code === code);
    return hsCodeEntry?.description || 'No description available';
  };

  // Check if description is too long
  const isDescriptionLong = item.description.length > 25;
  const truncatedDescription = isDescriptionLong 
    ? `${item.description.substring(0, 25)}...` 
    : item.description;
  
  return (
    <TooltipProvider>
      <tr className={`border-b hover:bg-muted/30 ${isSelected ? 'bg-muted/40' : ''}`}>
        {hasSelection && (
          <td className="py-3 px-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(item.id)}
              aria-label={`Select item ${item.productNumber}`}
            />
          </td>
        )}
        <td className="py-3 px-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="relative">
              <span className="font-medium">{item.productNumber}</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-sm">
                <p>{getHSCodeDescription(item.productNumber)}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </td>
        <td className="py-3 px-4 text-sm">{item.countryOfOrigin}</td>
        <td className="py-3 px-4 text-sm">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer flex items-center">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] inline-block">
                  {truncatedDescription}
                </span>
                {isDescriptionLong && (
                  <ChevronRight className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
            </HoverCardTrigger>
            {isDescriptionLong && (
              <HoverCardContent className="w-80 p-4 text-sm">
                <p>{item.description}</p>
              </HoverCardContent>
            )}
          </HoverCard>
        </td>
        <td className="py-3 px-4 text-sm text-right">{item.weight || '-'}</td>
        <td className="py-3 px-4 text-sm text-right">{item.quantity}</td>
        <td className="py-3 px-4 text-sm text-right">{item.unitPrice}</td>
        <td className="py-3 px-4 text-sm text-right">{item.amount}</td>
        <td className="py-3 px-4 text-sm text-right">{item.vatNumber || '-'}</td>
        <td className="py-3 px-4 text-sm text-right">{item.goodsNumber || '-'}</td>
        <td className="py-3 px-4 text-right">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceClass(item.confidencePercentage)}`}>
                <span className={`w-2 h-2 rounded-full mr-1.5 ${getConfidenceColor(item.confidencePercentage)}`}></span>
                {item.confidencePercentage}%
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                {item.confidencePercentage >= 85 ? 'High confidence' : 
                item.confidencePercentage >= 60 ? 'Medium confidence' : 'Low confidence'} 
                in HS code recognition
              </p>
            </TooltipContent>
          </Tooltip>
        </td>
        <td className="py-2 px-4 text-right">
          <div className="flex justify-end gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onEdit(item)}
            >
              <Pen className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 p-0 hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>
    </TooltipProvider>
  );
};

export default LineItemRow;
