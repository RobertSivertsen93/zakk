
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import { Search, History, Database } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface HSCodeHistoryProps {
  onSelectCode: (code: string, description: string) => void;
}

// Type for historical HS code entries
interface HistoricalHSCode {
  code: string;
  description: string;
  frequency: number; // How many times this code has been used
  lastUsed: string; // Date string
  confidence: number; // Confidence score
}

const HSCodeHistory: React.FC<HSCodeHistoryProps> = ({ onSelectCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock historical data - in a real app this would come from a database
  const mockHistoricalData: HistoricalHSCode[] = [
    { 
      code: '6117.80.80', 
      description: 'Buff, 230 gsm - size 25*...',
      frequency: 12,
      lastUsed: '2023-12-03',
      confidence: 95
    },
    { 
      code: '4908.90.00', 
      description: 'Prøvetryk (voksen + barn)',
      frequency: 8,
      lastUsed: '2023-11-15',
      confidence: 88
    },
    { 
      code: '4901.99.00', 
      description: 'Eksportdokumenter',
      frequency: 5,
      lastUsed: '2023-10-20',
      confidence: 75
    },
    { 
      code: '8471.30.00', 
      description: 'Laptop computers, 15-inch',
      frequency: 3,
      lastUsed: '2023-09-12',
      confidence: 92
    },
    { 
      code: '8523.49.25', 
      description: 'Optical media for data storage',
      frequency: 7,
      lastUsed: '2023-11-05',
      confidence: 84
    },
  ];
  
  // Filter historical data based on search term
  const filteredData = searchTerm 
    ? mockHistoricalData.filter(item => 
        item.code.includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockHistoricalData;

  const handleSelectCode = (item: HistoricalHSCode) => {
    onSelectCode(item.code, item.description);
    setIsOpen(false);
    toast.success(`Added new line item with HS code: ${item.code}`);
  };
  
  return (
    <>
      <Button 
        variant="outline"
        className="gap-2"
        onClick={() => setIsOpen(true)}
      >
        <History className="h-4 w-4" />
        HS Code History
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Historical HS Code Database
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by HS code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>HS Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-medium">{item.code}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{item.frequency}x</span>
                          <span className="text-xs text-muted-foreground">
                            Last: {new Date(item.lastUsed).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={item.confidence} className="h-2 w-16" />
                          <span>{item.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSelectCode(item)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No historical data found for "{searchTerm}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HSCodeHistory;
