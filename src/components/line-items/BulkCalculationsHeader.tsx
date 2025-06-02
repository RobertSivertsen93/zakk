
import React from 'react';
import { Calculator } from 'lucide-react';
import { CardHeader, CardTitle } from "@/components/ui/card";

interface BulkCalculationsHeaderProps {
  selectedItemsCount: number;
}

const BulkCalculationsHeader: React.FC<BulkCalculationsHeaderProps> = ({ 
  selectedItemsCount 
}) => {
  return (
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Calculator className="h-5 w-5" />
        Bulk Calculations ({selectedItemsCount} items selected)
      </CardTitle>
    </CardHeader>
  );
};

export default BulkCalculationsHeader;
