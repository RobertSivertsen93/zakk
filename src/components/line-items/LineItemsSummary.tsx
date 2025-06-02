
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineItem } from './types';

interface LineItemsSummaryProps {
  items: LineItem[];
}

const LineItemsSummary: React.FC<LineItemsSummaryProps> = ({ items }) => {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);

  return (
    <Card className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalQuantity.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Quantity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalAmount.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{totalWeight.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Weight</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineItemsSummary;
