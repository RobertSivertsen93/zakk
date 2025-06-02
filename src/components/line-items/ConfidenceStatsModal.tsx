
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LineItem } from './types';

interface ConfidenceStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItems: LineItem[];
}

const ConfidenceStatsModal: React.FC<ConfidenceStatsModalProps> = ({
  open,
  onOpenChange,
  selectedItems
}) => {
  // Calculate confidence stats for selected items
  const getConfidenceStats = () => {
    if (selectedItems.length === 0) return { average: 0, high: 0, medium: 0, low: 0 };
    
    const totalConfidence = selectedItems.reduce((sum, item) => sum + item.confidencePercentage, 0);
    const average = totalConfidence / selectedItems.length;
    
    const high = selectedItems.filter(item => item.confidencePercentage >= 85).length;
    const medium = selectedItems.filter(item => item.confidencePercentage >= 60 && item.confidencePercentage < 85).length;
    const low = selectedItems.filter(item => item.confidencePercentage < 60).length;
    
    return {
      average,
      high,
      medium,
      low
    };
  };
  
  const stats = getConfidenceStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selection Statistics</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-medium mb-2">Confidence Levels</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average Confidence</span>
                  <span className="text-sm font-medium">{Math.round(stats.average)}%</span>
                </div>
                <Progress value={stats.average} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">High</span>
                    <span className="text-sm font-medium text-green-600">{stats.high}</span>
                  </div>
                  <Progress value={(stats.high / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-green-500" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Medium</span>
                    <span className="text-sm font-medium text-yellow-600">{stats.medium}</span>
                  </div>
                  <Progress value={(stats.medium / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-yellow-500" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Low</span>
                    <span className="text-sm font-medium text-red-600">{stats.low}</span>
                  </div>
                  <Progress value={(stats.low / selectedItems.length) * 100} className="h-1 bg-muted/50" indicatorClassName="bg-red-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Countries of Origin</h3>
            <div className="text-sm">
              {/* Group by country and count */}
              {Object.entries(
                selectedItems.reduce((acc: Record<string, number>, item) => {
                  const country = item.countryOfOrigin || 'Unknown';
                  acc[country] = (acc[country] || 0) + 1;
                  return acc;
                }, {})
              ).map(([country, count]) => (
                <div key={country} className="flex justify-between mb-1">
                  <span>{country}</span>
                  <span>{count} item{count !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfidenceStatsModal;
