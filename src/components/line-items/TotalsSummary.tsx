
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, Scale, Hash, DollarSign } from 'lucide-react';
import { LineItem } from './types';

interface TotalsSummaryProps {
  items: LineItem[];
  selectedItems?: LineItem[];
  showSelectedOnly?: boolean;
}

const TotalsSummary: React.FC<TotalsSummaryProps> = ({ 
  items, 
  selectedItems = [],
  showSelectedOnly = false 
}) => {
  const dataToAnalyze = showSelectedOnly && selectedItems.length > 0 ? selectedItems : items;
  
  const totals = React.useMemo(() => {
    return dataToAnalyze.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const amount = parseFloat(item.amount) || 0;
      const weight = parseFloat(item.weight) || 0;
      
      return {
        totalQuantity: acc.totalQuantity + quantity,
        totalAmount: acc.totalAmount + amount,
        totalWeight: acc.totalWeight + weight,
        itemCount: acc.itemCount + 1
      };
    }, {
      totalQuantity: 0,
      totalAmount: 0,
      totalWeight: 0,
      itemCount: 0
    });
  }, [dataToAnalyze]);

  const formatNumber = (num: number, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const summaryCards = [
    {
      icon: Hash,
      label: 'Total Items',
      value: totals.itemCount.toString(),
      color: 'text-blue-600'
    },
    {
      icon: Package,
      label: 'Total Quantity',
      value: formatNumber(totals.totalQuantity),
      color: 'text-green-600'
    },
    {
      icon: Scale,
      label: 'Total Weight',
      value: `${formatNumber(totals.totalWeight)} kg`,
      color: 'text-purple-600'
    },
    {
      icon: DollarSign,
      label: 'Total Amount',
      value: `$${formatNumber(totals.totalAmount)}`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="mb-6">
      {showSelectedOnly && selectedItems.length > 0 && (
        <div className="mb-2 text-sm text-muted-foreground">
          Showing totals for {selectedItems.length} selected item{selectedItems.length !== 1 ? 's' : ''}
        </div>
      )}
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-50 ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-lg font-semibold">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TotalsSummary;
