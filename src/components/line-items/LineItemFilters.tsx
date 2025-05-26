
import React, { useState } from 'react';
import { Filter, Search, Save, SortAsc, SortDesc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export type FilterOptions = {
  search: string;
  confidenceLevel: string;
  countryOfOrigin: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

export type SavedFilter = {
  id: string;
  name: string;
  filter: FilterOptions;
}

interface LineItemFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  savedFilters: SavedFilter[];
  onSaveFilter: (name: string) => void;
  onApplySavedFilter: (filter: FilterOptions) => void;
  activeFilters: FilterOptions;
  countries: string[];
}

const LineItemFilters: React.FC<LineItemFiltersProps> = ({
  onFilterChange,
  savedFilters,
  onSaveFilter,
  onApplySavedFilter,
  activeFilters,
  countries
}) => {
  const [filterName, setFilterName] = useState('');
  const [showSaveFilter, setShowSaveFilter] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...activeFilters, search: e.target.value });
  };
  
  const handleConfidenceChange = (value: string) => {
    onFilterChange({ ...activeFilters, confidenceLevel: value });
  };
  
  const handleCountryChange = (value: string) => {
    onFilterChange({ ...activeFilters, countryOfOrigin: value });
  };
  
  const handleSortByChange = (value: string) => {
    onFilterChange({ ...activeFilters, sortBy: value });
  };
  
  const handleSortDirectionChange = (value: string) => {
    onFilterChange({ 
      ...activeFilters, 
      sortDirection: value as 'asc' | 'desc' 
    });
  };
  
  const handleSaveFilter = () => {
    if (filterName) {
      onSaveFilter(filterName);
      setFilterName('');
      setShowSaveFilter(false);
    }
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.search) count++;
    if (activeFilters.confidenceLevel) count++;
    if (activeFilters.countryOfOrigin) count++;
    return count;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search HS codes, descriptions..."
            className="pl-8"
            value={activeFilters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-2">
                <p className="text-xs font-medium mb-1">Confidence Level</p>
                <Select value={activeFilters.confidenceLevel} onValueChange={handleConfidenceChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Confidence Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="high">High (85%+)</SelectItem>
                    <SelectItem value="medium">Medium (60-84%)</SelectItem>
                    <SelectItem value="low">Low (Below 60%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-2">
                <p className="text-xs font-medium mb-1">Country of Origin</p>
                <Select value={activeFilters.countryOfOrigin} onValueChange={handleCountryChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-2">
                <p className="text-xs font-medium mb-1">Field</p>
                <Select value={activeFilters.sortBy} onValueChange={handleSortByChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Sort By..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productNumber">HS Code</SelectItem>
                    <SelectItem value="confidencePercentage">Confidence</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="countryOfOrigin">Country</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-2">
                <p className="text-xs font-medium mb-1">Direction</p>
                <ToggleGroup 
                  type="single" 
                  value={activeFilters.sortDirection} 
                  onValueChange={(value) => value && handleSortDirectionChange(value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="asc" size="sm">
                    <SortAsc className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="desc" size="sm">
                    <SortDesc className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Save className="h-4 w-4" />
                Saved
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {savedFilters.length === 0 ? (
                <DropdownMenuItem disabled>No saved filters</DropdownMenuItem>
              ) : (
                savedFilters.map(filter => (
                  <DropdownMenuItem 
                    key={filter.id}
                    onClick={() => onApplySavedFilter(filter.filter)}
                  >
                    {filter.name}
                  </DropdownMenuItem>
                ))
              )}
              
              <DropdownMenuSeparator />
              
              {showSaveFilter ? (
                <div className="p-2 space-y-2">
                  <Input 
                    placeholder="Filter name" 
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      className="h-7 text-xs w-full"
                      onClick={handleSaveFilter}
                      disabled={!filterName}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => {
                        setShowSaveFilter(false);
                        setFilterName('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <DropdownMenuItem onClick={() => setShowSaveFilter(true)}>
                  Save Current Filter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Display active filters as badges */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.search && (
            <Badge variant="secondary" className="px-2 py-1 flex gap-1 items-center">
              Search: {activeFilters.search}
              <button 
                className="ml-1 hover:text-destructive" 
                onClick={() => onFilterChange({...activeFilters, search: ''})}
              >
                ×
              </button>
            </Badge>
          )}
          
          {activeFilters.confidenceLevel && (
            <Badge variant="secondary" className="px-2 py-1 flex gap-1 items-center">
              Confidence: {activeFilters.confidenceLevel}
              <button 
                className="ml-1 hover:text-destructive" 
                onClick={() => onFilterChange({...activeFilters, confidenceLevel: ''})}
              >
                ×
              </button>
            </Badge>
          )}
          
          {activeFilters.countryOfOrigin && (
            <Badge variant="secondary" className="px-2 py-1 flex gap-1 items-center">
              Country: {activeFilters.countryOfOrigin}
              <button 
                className="ml-1 hover:text-destructive" 
                onClick={() => onFilterChange({...activeFilters, countryOfOrigin: ''})}
              >
                ×
              </button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={() => onFilterChange({
              search: '',
              confidenceLevel: '',
              countryOfOrigin: '',
              sortBy: activeFilters.sortBy,
              sortDirection: activeFilters.sortDirection
            })}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default LineItemFilters;
