
import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-muted/50">
        <th className="text-left p-2 text-sm font-medium">HS Kota</th>
        <th className="text-left p-2 text-sm font-medium">Vørulýsing</th>
        <th className="text-right p-2 text-sm font-medium">Sannlíkindi</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
