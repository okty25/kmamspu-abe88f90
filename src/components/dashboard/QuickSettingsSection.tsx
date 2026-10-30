
import React from "react";
import { Droplet, MessageSquare, Users, Settings } from "lucide-react";
import QuickSettingItem from "./QuickSettingItem";

interface QuickSettingsSectionProps {
  onSettingClick: (setting: string) => void;
}

const QuickSettingsSection = ({ onSettingClick }: QuickSettingsSectionProps) => {
  return (
    <div className="glass p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Settings className="mr-2 h-5 w-5" />
        Tetapan Pantas
      </h2>
      <div>
        <QuickSettingItem 
          icon={Droplet} 
          title="Periksa Status Air" 
          description="Lihat status kualiti air semua kawasan" 
          onClick={() => onSettingClick("Periksa Status Air")} 
        />
        <QuickSettingItem 
          icon={MessageSquare} 
          title="Urus Aduan" 
          description="Semak dan kemaskini status aduan pelanggan" 
          onClick={() => onSettingClick("Urus Aduan")} 
        />
        <QuickSettingItem 
          icon={Users} 
          title="Urus Pengguna" 
          description="Tambah, edit atau padam akaun pengguna" 
          onClick={() => onSettingClick("Urus Pengguna")} 
        />
        <QuickSettingItem 
          icon={Settings} 
          title="Konfigurasi Sistem" 
          description="Ubah tetapan sistem dan notifikasi" 
          onClick={() => onSettingClick("Konfigurasi Sistem")} 
        />
      </div>
    </div>
  );
};

export default QuickSettingsSection;
