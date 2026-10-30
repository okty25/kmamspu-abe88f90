import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, Minimize2, Droplet, Gauge, Thermometer, FlaskConical, MonitorSmartphone } from "lucide-react";
import type { User, Session } from "@supabase/supabase-js";
import AICommandPanel from "@/components/dashboard/AICommandPanel";
import BentoCard, { Accent } from "@/components/dashboard/BentoCard";
import SafetyIndexCard from "@/components/dashboard/SafetyIndexCard";
import BasinMapCard, { Station } from "@/components/dashboard/BasinMapCard";
import ParameterChartCard, { Reading } from "@/components/dashboard/ParameterChartCard";
import TelemetryStreamCard, { LogEntry } from "@/components/dashboard/TelemetryStreamCard";
import MetricCard from "@/components/dashboard/MetricCard";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const jitter = (v: number, amp: number) => v + (Math.random() - 0.5) * amp;

const STATIONS: Station[] = [
  { id: "ST-01", name: "Sungai Muda", x: 44, y: 22, status: "safe" },
  { id: "ST-04", name: "Loji Sungai Dua", x: 58, y: 34, status: "safe" },
  { id: "ST-07", name: "Kepala Batas", x: 36, y: 46, status: "warn" },
  { id: "ST-09", name: "Rumah Pam Bertam", x: 62, y: 58, status: "safe" },
  { id: "ST-12", name: "Tasek Gelugor", x: 48, y: 70, status: "alert" },
  { id: "ST-15", name: "Penaga", x: 70, y: 80, status: "safe" },
];

const LOG_TEMPLATES: { text: (s: string) => string; status: LogEntry["status"] }[] = [
  { text: (s) => `${s} — pH normal (7.12)`, status: "safe" },
  { text: (s) => `${s} — Lonjakan kekeruhan 5.8 NTU`, status: "warn" },
  { text: (s) => `${s} — Klorin sisa 0.42 mg/L`, status: "safe" },
  { text: (s) => `${s} — Oksigen terlarut menurun`, status: "warn" },
  { text: (s) => `${s} — Sensor tidak bertindak balas`, status: "alert" },
  { text: (s) => `${s} — Aliran stabil, telemetri OK`, status: "safe" },
];

const timeLabel = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;

const buildSeries = (): Reading[] =>
  Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    ph: Number(clamp(jitter(7.1, 0.5), 6.5, 8.0).toFixed(2)),
    turbidity: Number(clamp(jitter(3.2, 2.2), 0.4, 8).toFixed(2)),
    oxygen: Number(clamp(jitter(6.8, 1.4), 4, 9.5).toFixed(2)),
  }));

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationCount, setNotificationCount] = useState(3);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulated live telemetry
  const [safetyIndex, setSafetyIndex] = useState(94.2);
  const [metrics, setMetrics] = useState({ ph: 7.12, turbidity: 3.1, oxygen: 6.9, chlorine: 0.45 });
  const [deltas, setDeltas] = useState({ ph: 0.02, turbidity: -0.14, oxygen: 0.08, chlorine: 0.01 });
  const [series, setSeries] = useState<Reading[]>(() => buildSeries());
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 12 }, (_, i) => {
      const t = LOG_TEMPLATES[i % LOG_TEMPLATES.length];
      const st = STATIONS[i % STATIONS.length];
      return { id: i, time: timeLabel(new Date(Date.now() - i * 47000)), text: t.text(st.id), status: t.status };
    })
  );
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const openModal = useCallback((title: string, body: string) => setModal({ title, body }), []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (event === "SIGNED_OUT" || !currentSession) navigate("/staff-login");
    });

    const checkSession = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        if (error) {
          navigate("/staff-login");
          return;
        }
        if (!existingSession) {
          toast({ title: "Sesi tamat tempoh", description: "Sila log masuk semula", variant: "destructive" });
          navigate("/staff-login");
          return;
        }
        setSession(existingSession);
        setUser(existingSession.user);
      } catch {
        navigate("/staff-login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  // Live data ticks
  useEffect(() => {
    const id = window.setInterval(() => {
      setMetrics((m) => {
        const next = {
          ph: Number(clamp(jitter(m.ph, 0.14), 6.6, 7.9).toFixed(2)),
          turbidity: Number(clamp(jitter(m.turbidity, 0.7), 0.5, 7.5).toFixed(2)),
          oxygen: Number(clamp(jitter(m.oxygen, 0.4), 4.5, 9.2).toFixed(2)),
          chlorine: Number(clamp(jitter(m.chlorine, 0.08), 0.2, 1.0).toFixed(2)),
        };
        setDeltas({
          ph: next.ph - m.ph,
          turbidity: next.turbidity - m.turbidity,
          oxygen: next.oxygen - m.oxygen,
          chlorine: next.chlorine - m.chlorine,
        });
        return next;
      });
      setSafetyIndex((v) => Number(clamp(jitter(v, 1.6), 78, 99.4).toFixed(1)));
      setSeries((s) => [
        ...s.slice(1),
        {
          time: s[s.length - 1].time,
          ph: Number(clamp(jitter(7.1, 0.5), 6.5, 8).toFixed(2)),
          turbidity: Number(clamp(jitter(3.2, 2.2), 0.4, 8).toFixed(2)),
          oxygen: Number(clamp(jitter(6.8, 1.4), 4, 9.5).toFixed(2)),
        },
      ]);
      setLogs((l) => {
        const t = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
        const st = STATIONS[Math.floor(Math.random() * STATIONS.length)];
        return [{ id: Date.now(), time: timeLabel(new Date()), text: t.text(st.id), status: t.status }, ...l].slice(0, 14);
      });
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const indexAccent: Accent = safetyIndex >= 92 ? "safe" : safetyIndex >= 85 ? "warn" : "alert";

  const metricAccents = useMemo(
    () => ({
      ph: (metrics.ph >= 6.8 && metrics.ph <= 7.6 ? "safe" : "warn") as Accent,
      turbidity: (metrics.turbidity <= 4 ? "safe" : metrics.turbidity <= 5.5 ? "warn" : "alert") as Accent,
      oxygen: (metrics.oxygen >= 6 ? "safe" : "warn") as Accent,
      chlorine: (metrics.chlorine >= 0.3 && metrics.chlorine <= 0.8 ? "safe" : "warn") as Accent,
    }),
    [metrics]
  );

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({ title: "Ralat", description: "Ralat berlaku semasa log keluar", variant: "destructive" });
        return;
      }
      setUser(null);
      setSession(null);
      setNotificationCount(0);
      toast({ title: "Log keluar berjaya", description: "Terima kasih kerana menggunakan Papan Pemuka Staf KMAM SPU" });
      navigate("/");
    } catch {
      toast({ title: "Ralat", description: "Ralat berlaku semasa log keluar", variant: "destructive" });
    }
  };

  const handleNotificationClick = () => {
    toast({ title: "Notifikasi", description: `Anda mempunyai ${notificationCount} notifikasi baharu` });
    setNotificationCount(0);
  };

  if (isLoading) {
    return (
      <div className="dash-future min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Memuatkan...</p>
        </div>
      </div>
    );
  }

  if (!session || !user) return null;

  return (
    <div className="dash-future relative min-h-screen overflow-x-hidden">
      {/* subtle ambient glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-muted/40 blur-[130px]" />
      </div>

      <div className="relative z-10">
        <DashboardHeader
          notificationCount={notificationCount}
          onNotificationClick={handleNotificationClick}
          onLogout={handleLogout}
        />

        <main className="container mx-auto space-y-5 px-4 py-6">
          <AICommandPanel />

          {/* Metric strip */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={FlaskConical} title="Nilai pH" value={metrics.ph.toFixed(2)} delta={deltas.ph} accent={metricAccents.ph}
              onClick={() => openModal("Nilai pH", `Bacaan pH semasa ialah ${metrics.ph.toFixed(2)}. Julat selamat KKM: 6.5 – 8.5.`)} />
            <MetricCard icon={Gauge} title="Kekeruhan" value={metrics.turbidity.toFixed(2)} unit="NTU" delta={deltas.turbidity} accent={metricAccents.turbidity}
              onClick={() => openModal("Kekeruhan", `Kekeruhan semasa ${metrics.turbidity.toFixed(2)} NTU. Had maksimum yang disyorkan: 5 NTU.`)} />
            <MetricCard icon={Droplet} title="Oksigen Terlarut" value={metrics.oxygen.toFixed(2)} unit="mg/L" delta={deltas.oxygen} accent={metricAccents.oxygen}
              onClick={() => openModal("Oksigen Terlarut", `Oksigen terlarut ${metrics.oxygen.toFixed(2)} mg/L. Tahap sihat melebihi 6 mg/L.`)} />
            <MetricCard icon={Thermometer} title="Klorin Sisa" value={metrics.chlorine.toFixed(2)} unit="mg/L" delta={deltas.chlorine} accent={metricAccents.chlorine}
              onClick={() => openModal("Klorin Sisa", `Klorin sisa ${metrics.chlorine.toFixed(2)} mg/L. Julat operasi: 0.3 – 0.8 mg/L.`)} />
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <SafetyIndexCard
              index={safetyIndex}
              accent={indexAccent}
              onClick={() => openModal("Indeks Keselamatan Air", `Indeks komposit ${safetyIndex.toFixed(1)}% dikira daripada pH, kekeruhan, oksigen terlarut dan klorin sisa merentas ${STATIONS.length} stesen telemetri.`)}
            />
            <ParameterChartCard
              data={series}
              onClick={() => openModal("Analitik 24 Jam", "Trend pH, kekeruhan dan oksigen terlarut bagi 24 jam terakhir. Data dikemas kini setiap 3.5 saat daripada aliran telemetri simulasi.")}
            />
            <TelemetryStreamCard
              logs={logs}
              onClick={() => openModal("Aliran Telemetri", "Log masuk langsung daripada stesen telemetri jarak jauh. Setiap entri direkodkan dengan cap masa dan status risiko.")}
            />
            <BasinMapCard
              stations={STATIONS}
              onClick={() => openModal("Peta Lokasi PERSAMPELAN", "Pemantauan 52 lokasi persampelan merangkumi Loji Rawatan Air Sungai Dua.")}
            />

            {/* Embedded app */}
            <BentoCard accent="safe" className="lg:col-span-2 min-h-[340px] p-0">
              <div className="relative h-full min-h-[340px]">
                <div className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <MonitorSmartphone className="h-4 w-4 text-primary" />
                    Aplikasi KMAM SPU
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsExpanded(true)}
                    aria-label="Besarkan"
                  >
                    <Maximize2 className="h-4 w-4 mr-1" /> Besarkan
                  </Button>
                </div>
                <div className="h-[400px] overflow-auto rounded-b-[1.25rem] bg-card">
                  <iframe
                    src="https://www.swing2app.com/maker_view/app-preview?appId=f0e8f296-1501-4cae-9b24-ff38f3b8836d"
                    className="block min-h-[800px] w-full border-0 bg-card"
                    title="Aplikasi KMAM SPU"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </main>
      </div>

      <Dialog open={!!modal} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="dash-future glass-panel border-0 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{modal?.title}</DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-relaxed">{modal?.body}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Expanded app popup */}
      <Dialog open={isExpanded} onOpenChange={(o) => setIsExpanded(o)}>
        <DialogContent className="dash-future glass-panel border-0 max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>Aplikasi KMAM SPU</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <MonitorSmartphone className="h-4 w-4 text-primary" />
              Aplikasi KMAM SPU
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setIsExpanded(false)}
              aria-label="Kecilkan"
            >
              <Minimize2 className="h-4 w-4 mr-1" /> Kecilkan
            </Button>
          </div>
          <div className="flex-1 overflow-auto bg-card">
            <iframe
              src="https://www.swing2app.com/maker_view/app-preview?appId=f0e8f296-1501-4cae-9b24-ff38f3b8836d"
              className="block min-h-[900px] h-full w-full border-0 bg-card"
              title="Aplikasi KMAM SPU"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
