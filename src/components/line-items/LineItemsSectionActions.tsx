
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "@/lib/toast";

interface LineItemsSectionActionsProps {
  onComplete?: () => void;
  approveText: string;
}

const LineItemsSectionActions: React.FC<LineItemsSectionActionsProps> = ({
  onComplete,
  approveText
}) => {
  const handleApprove = () => {
    if (onComplete) {
      onComplete();
      toast.success('Line items approved successfully');
    }
  };

  if (!onComplete) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-end">
      <Button onClick={handleApprove} className="gap-2" aria-label={approveText}>
        <CheckCircle className="h-4 w-4" />
        {approveText}
      </Button>
    </div>
  );
};

export default LineItemsSectionActions;
