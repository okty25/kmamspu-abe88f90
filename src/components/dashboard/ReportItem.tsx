
import React from "react";
import { Clock } from "lucide-react";

interface ReportItemProps {
  title: string;
  location: string;
  time: string;
  status: "normal" | "warning" | "critical";
}

const ReportItem = ({ 
  title, 
  location, 
  time, 
  status 
}: ReportItemProps) => {
  const statusColor = {
    normal: "bg-green-500",
    warning: "bg-amber-500",
    critical: "bg-red-500"
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      <div className="flex items-center">
        <div className={`h-3 w-3 rounded-full ${statusColor[status]} mr-4`}></div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Clock className="h-3 w-3 mr-1" />
        {time}
      </div>
    </div>
  );
};

export default ReportItem;
