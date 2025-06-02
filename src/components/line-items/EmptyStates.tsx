
import React from 'react';

interface EmptyStatesProps {
  hasItems: boolean;
  hasFilteredItems: boolean;
  searchQuery: string;
}

const EmptyStates: React.FC<EmptyStatesProps> = ({
  hasItems,
  hasFilteredItems,
  searchQuery
}) => {
  if (!hasItems) {
    return (
      <div className="text-center py-8 text-muted-foreground bg-secondary/10 rounded-md">
        No line items yet
      </div>
    );
  }

  if (!hasFilteredItems && searchQuery) {
    return (
      <div className="text-center py-6 text-muted-foreground bg-secondary/10 rounded-md mt-4">
        No items match your search
      </div>
    );
  }

  return null;
};

export default EmptyStates;
