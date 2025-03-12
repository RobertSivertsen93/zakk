
import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-muted/50">
        <th className="text-left p-2 text-sm font-medium">Product #</th>
        <th className="text-left p-2 text-sm font-medium">Origin</th>
        <th className="text-left p-2 text-sm font-medium">Qty</th>
        <th className="text-right p-2 text-sm font-medium">Net Weight</th>
        <th className="text-right p-2 text-sm font-medium">Amount</th>
        <th className="text-right p-2 text-sm font-medium">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
