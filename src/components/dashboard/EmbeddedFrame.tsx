
import React, { useState } from "react";
import { Globe, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmbeddedFrameProps {
  url: string;
  title: string;
  onUrlChange: (url: string) => void;
}

const EmbeddedFrame = ({ 
  url, 
  title, 
  onUrlChange 
}: EmbeddedFrameProps) => {
  const [inputUrl, setInputUrl] = useState(url);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlChange(inputUrl);
  };
  
  return (
    <div className="glass p-6 h-full flex flex-col">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <Globe className="h-5 w-5 mr-2" />
        {title}
      </h3>
      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <Input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Embed
        </Button>
      </form>
      <div className="flex-1 bg-black/10 rounded-md overflow-hidden">
        {url ? (
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Masukkan URL untuk memaparkan kandungan
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbeddedFrame;
