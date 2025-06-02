
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddItem?: () => void;
  addLineItemText: string;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onAddItem,
  addLineItemText
}) => {
  return (
    <div className="mb-4 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
        />
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="border border-gray-200 hover:bg-secondary/50 transition-all duration-200"
      >
        <Filter className="h-4 w-4" />
      </Button>
      {onAddItem && (
        <Button 
          onClick={onAddItem}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          {addLineItemText}
        </Button>
      )}
    </div>
  );
};

export default SearchAndFilters;
