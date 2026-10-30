
import React from "react";

interface QuickSettingItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickSettingItem = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: QuickSettingItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-start p-4 w-full text-left border-b border-white/10 transition-colors hover:bg-white/5"
    >
      <div className="p-2 rounded-full bg-primary/10 mr-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default QuickSettingItem;
