
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import LineItemsTable from '@/components/LineItemsTable';
import { toast } from "@/lib/toast";

const LineItemsSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <Card className="glass-panel">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Line Items</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Review and edit the line items extracted from the invoice. 
            Pay attention to the confidence score which indicates the reliability of the HS code extraction.
          </p>
          
          <LineItemsTable 
            items={[]} 
            onEditItem={() => {}} 
            onDeleteItem={() => {}} 
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default LineItemsSection;
