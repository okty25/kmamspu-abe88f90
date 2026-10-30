
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Footer = () => {
  return (
    <footer className="fixed bottom-4 right-4 z-20">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group cursor-pointer">
            <img 
              src="/logo_kmam_edit.png" 
              alt="KAWALAN MUTU AIR MINUM (KMAM)" 
              className="w-16 h-16 rounded-full shadow-lg transition-all duration-1000 hover:scale-110 animate-pulse hover:shadow-2xl hover:shadow-primary/50"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
              }}
            />
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-white/90 backdrop-blur-sm text-primary text-xs rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              KAWALAN MUTU AIR MINUM (KMAM)
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader className="sr-only">
            <DialogTitle>KAWALAN MUTU AIR MINUM (KMAM) Video</DialogTitle>
          </DialogHeader>
          <video src="/logo.mp4" controls autoPlay className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
