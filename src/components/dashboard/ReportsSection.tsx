
import React from "react";
import { Clock } from "lucide-react";
import ReportItem from "./ReportItem";

const ReportsSection = () => {
  return (
    <div className="glass p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Clock className="mr-2 h-5 w-5" />
        Laporan Terkini
      </h2>
      <div>
        <ReportItem 
          title="Gangguan bekalan air" 
          location="Taman Desa, SPU" 
          time="2 jam lepas" 
          status="critical" 
        />
        <ReportItem 
          title="Air keruh" 
          location="Kampung Selamat, SPU" 
          time="5 jam lepas" 
          status="warning" 
        />
        <ReportItem 
          title="Tekanan air rendah" 
          location="Taman Indah, SPU" 
          time="12 jam lepas" 
          status="warning" 
        />
        <ReportItem 
          title="Paip pecah" 
          location="Jalan Besar, SPU" 
          time="1 hari lepas" 
          status="normal" 
        />
        <ReportItem 
          title="Gangguan bekalan air" 
          location="Kampung Makmur, SPU" 
          time="2 hari lepas" 
          status="normal" 
        />
      </div>
    </div>
  );
};

export default ReportsSection;
