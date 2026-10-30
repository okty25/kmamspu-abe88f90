
import React from "react";
import { Droplet, MessageSquare, Users } from "lucide-react";
import StatusCard from "./StatusCard";

const StatusSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatusCard 
        icon={Droplet} 
        title="Status Kualiti Air" 
        value="Baik" 
        status="normal" 
      />
      <StatusCard 
        icon={MessageSquare} 
        title="Aduan Hari Ini" 
        value="5" 
        status="warning" 
      />
      <StatusCard 
        icon={Users} 
        title="Pengguna Aktif" 
        value="247" 
        status="normal" 
      />
    </div>
  );
};

export default StatusSection;
