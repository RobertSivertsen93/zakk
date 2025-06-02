
import React from 'react';
import CustomsModeToggle from '@/components/line-items/CustomsModeToggle';

interface LineItemsSectionHeaderProps {
  title: string;
  description: string;
  enableCustomsMode: boolean;
  onToggleCustomsMode: (enabled: boolean) => void;
  customsModeText: string;
  customsModeDescText: string;
}

const LineItemsSectionHeader: React.FC<LineItemsSectionHeaderProps> = ({
  title,
  description,
  enableCustomsMode,
  onToggleCustomsMode,
  customsModeText,
  customsModeDescText
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      
      <CustomsModeToggle
        enabled={enableCustomsMode}
        onToggle={onToggleCustomsMode}
        customsModeText={customsModeText}
        customsModeDescText={customsModeDescText}
      />
    </div>
  );
};

export default LineItemsSectionHeader;
