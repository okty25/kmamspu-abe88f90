
import React from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  notificationCount: number;
  onNotificationClick: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({ 
  notificationCount, 
  onNotificationClick, 
  onLogout
}: DashboardHeaderProps) => {
  const navigationLinks = [
    {
      title: "WATER QUALITY SURVEILLANCE (WQS)",
      url: "http://kmam.moh.gov.my/kmamv2/index.php?&login"
    },
    {
      title: "DATA SPREADSHEET",
      url: "https://docs.google.com/spreadsheets/d/1ZHtm1WwzPI7GJKvynJR4ELJtoDzZy7IKKXB7PGUyAhg/edit?usp=sharing"
    },
    {
      title: "PETA LOKASI PERSAMPELAN",
      url: "https://www.google.com/maps/d/u/0/edit?mid=1AcQQCOjWc1YIhR0MJzVrTpmLifhJ2O0&usp=sharing#target=_system"
    }
  ];

  const handleExternalLink = (url: string, _title: string) => {
    // Validate URL before opening
    try {
      const linkUrl = new URL(url);
      const allowedDomains = ['kmam.moh.gov.my', 'docs.google.com', 'www.google.com', 'lovable.app'];
      
      if (allowedDomains.some(domain => linkUrl.hostname.includes(domain))) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      // Silently block unauthorized domains - no logging in production
    } catch {
      // Silently handle invalid URLs - no logging in production
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo_kmam_edit.png"
            alt="Logo KMAM SPU"
            className="h-9 w-9 rounded-full object-cover shadow-sm"
          />
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Papan Pemuka Staf</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navigationLinks.map((link) => (
            <Button
              key={link.title}
              variant="ghost"
              size="sm"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={() => handleExternalLink(link.url, link.title)}
            >
              {link.title}
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          ))}
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden">
          <select
            className="bg-card border border-input rounded-lg px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            onChange={(e) => {
              if (e.target.value) {
                const selectedLink = navigationLinks.find(link => link.url === e.target.value);
                if (selectedLink) {
                  handleExternalLink(selectedLink.url, selectedLink.title);
                }
              }
              e.target.value = '';
            }}
          >
            <option value="">Navigasi</option>
            {navigationLinks.map((link) => (
              <option key={link.title} value={link.url}>
                {link.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-border/80 text-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Keluar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
