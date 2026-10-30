
import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface StatusCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  status?: "normal" | "warning" | "critical";
}

const StatusCard = ({ 
  icon: Icon, 
  title, 
  value, 
  status = "normal" 
}: StatusCardProps) => {
  const statusColor = {
    normal: "text-green-500",
    warning: "text-amber-500",
    critical: "text-red-500"
  };

  const StatusIcon = {
    normal: CheckCircle,
    warning: AlertTriangle,
    critical: AlertTriangle
  }[status];

  return (
    <div className="glass p-6 flex items-start justify-between">
      <div className="flex items-start">
        <div className="p-3 rounded-full bg-primary/10 mr-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <StatusIcon className={`h-5 w-5 ${statusColor[status]}`} />
    </div>
  );
};

export default StatusCard;
