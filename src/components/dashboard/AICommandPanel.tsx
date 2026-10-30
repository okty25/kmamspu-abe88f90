import React, { useState } from "react";
import { Sparkles, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const prompts = [
  "Jana Laporan Bahaya Mingguan",
  "Semak Anomali",
  "Ringkasan Kualiti Air 24 Jam",
  "Status Stesen Telemetri",
];

const AICommandPanel = () => {
  const { toast } = useToast();
  const [value, setValue] = useState("");

  const run = (q: string) => {
    if (!q.trim()) return;
    toast({
      title: "Arahan AI diterima",
      description: `Memproses: “${q}” — analisis simulasi sedang dijana.`,
    });
    setValue("");
  };

  return (
    <div className="glass-panel p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
        className="flex items-center gap-3"
      >
        <Sparkles className="h-5 w-5 text-primary shrink-0" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tanya AI: 'Stesen mana paling berisiko hari ini?'"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
          aria-label="Arahan AI"
        />
        <Button type="submit" size="sm" className="shrink-0">
          <SendHorizonal className="h-4 w-4" />
          <span className="sr-only">Hantar</span>
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => run(p)}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AICommandPanel;
