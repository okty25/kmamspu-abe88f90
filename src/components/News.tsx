import { Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import hengChianShienImg from "@/assets/team/heng-chian-shien.jpg";

const News = () => {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  useEffect(() => {
    const scriptId = "sociablekit-widget-script";
    const widgetSelector = ".sk-ww-facebook-page-posts";

    document.querySelectorAll(widgetSelector).forEach((node, index) => {
      if (index > 0) node.remove();
    });

    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.src = "https://widgets.sociablekit.com/facebook-page-posts/widget.js";
      s.defer = true;
      s.id = scriptId;
      document.body.appendChild(s);
    }
  }, []);
  
  const news = [
    {
      date: "14 Ogos 2026",
      title: "Jasamu Dikenang Encik Heng Chian Shien",
      excerpt: "Majlis penghargaan bagi Pegawai Kesihatan Persekitaran, Encik Heng Chian Shien, di Penang Golf Resort, Kepala Batas.",
      content: `Jasamu Dikenang bagi Pegawai Kesihatan Persekitaran, Encik Heng Chian Shien, dijadualkan berlangsung petang ini, 14 Ogos 2026 (Jumaat), bertempat di Penang Golf Resort (PGR), Kepala Batas, Pulau Pinang. Majlis penghargaan yang bermula dari jam 4:00 petang hingga 6:00 petang ini dianjurkan oleh Pejabat Kesihatan Daerah Seberang Perai Utara (PKD SPU) sebagai tanda penghargaan atas jasa dan khidmat bakti beliau. Tetamu terhomat pada majlis itu adalah Encik EN. HENG CHIAN SHIEN itu sendiri dan masjis turut dimeriahkan oleh tetamu VIP adalah Dr. Izani Uzair Bin Zubair, yang mana merupakan Pengarah Kesihatan Dearah Seberang Perai Utara (PKDSPU).`,
      image: hengChianShienImg
    },
    {
      date: "29 Jun 2026",
      title: "Kajian Kebersihan Sistem Bekalan Air Paip SPU",
      excerpt: "Kementerian Kesihatan Malaysia (KKM) melalui Pejabat Kesihatan Daerah Seberang Perai Utara menjalankan kajian kebersihan sistem bekalan air paip di daerah berkenaan.",
      content: `Kementerian Kesihatan Malaysia (KKM) melalui Pejabat Kesihatan Daerah Seberang Perai Utara (SPU) telah menjalankan kajian kebersihan sistem bekalan air paip di daerah berkenaan. Kajian ini melibatkan pengambilan sampel di beberapa kawasan dan analisis makmal bagi memastikan piawaian keselamatan air minuman dipatuhi.`,
      galleryLink: "#gallery"
    },
    {
      date: "28 Mei 2025",
      title: "PKD SPU Sertai Program Pemantauan Mutu Air Minum EU 2025",
      excerpt: "Pejabat Kesihatan Daerah Seberang Perai Utara akan terlibat dalam Program Kawalan Mutu Air Minum Kesatuan Eropah bagi tahun 2025.",
      content: `Seberang Perai Utara, 21 Julai 2025 – Pejabat Kesihatan Daerah (PKD) Seberang Perai Utara akan terlibat secara langsung dalam Program Kawalan Mutu Air Minum Kesatuan Eropah (KMAM)...`
    },
    {
      date: "28 Februari 2024",
      title: "Peperiksaan Perkhidmatan Awam",
      excerpt: "Pusat peperiksaan di Institut Latihan KKM Kepala Batas untuk calon Penolong Pegawai Perubatan Gred U29.",
      content: `Peperiksaan Perkhidmatan Awam telah diadakan di Pusat peperiksaan Institut Latihan KKM Kepala Batas untuk calon Penolong Pegawai Perubatan Gred U29. Program ini telah berlangsung dengan jayanya...`
    },
    {
      date: "22 Februari 2024",
      title: "Majlis Perhimpunan Bulanan JKN Pulau Pinang",
      excerpt: "Majlis Perhimpunan Bulanan JKN Pulau Pinang Bil.2/2024 telah diadakan di Dewan Kenanga.",
      content: `Majlis Perhimpunan Bulanan JKN Pulau Pinang Bil.2/2024 telah diadakan di Dewan Kenanga dengan jayanya. Majlis ini dihadiri oleh semua kakitangan JKN Pulau Pinang...`
    },
    {
      date: "15 Februari 2024",
      title: "Kursus Asas Pengawal Keselamatan KKM",
      excerpt: "Program Kursus Asas Pengawal Keselamatan KKM Siri 1/2024 telah diadakan di ILTM Kepala Batas.",
      content: `Program Kursus Asas Pengawal Keselamatan KKM Siri 1/2024 telah diadakan di ILTM Kepala Batas dengan jayanya. Kursus ini bertujuan untuk melatih pengawal keselamatan KKM...`
    },
    {
      date: "8 Februari 2024",
      title: "Majlis Jasamu Dikenang",
      excerpt: "Majlis Jasamu Dikenang bagi pesara JKN Pulau Pinang tahun 2023 di Hotel Ixora Perai.",
      content: `Majlis Jasamu Dikenang bagi pesara JKN Pulau Pinang tahun 2023 telah diadakan di Hotel Ixora Perai. Majlis ini diadakan sebagai tanda penghargaan kepada semua pesara yang telah berkhidmat...`
    }
  ];

  const openNewsDetail = (index: number) => {
    setSelectedNews(index);
  };

  const closeNewsDetail = () => {
    setSelectedNews(null);
  };

  return (
    <section id="news" className="section-padding">
      <div className="container mx-auto">
        <h2 className="heading text-center">Berita & Kemas Kini</h2>
        <p className="subheading text-center max-w-2xl mx-auto">
          Berita terkini dan perkembangan dari JKN Pulau Pinang
        </p>

        <div className="mt-12 mb-8 glass p-4">
          <div
            id="sociablekit-facebook-page-posts"
            className="sk-ww-facebook-page-posts w-full overflow-hidden rounded-md bg-black/5"
            data-embed-id="25684947"
          ></div>
        </div>

        <ScrollArea className="h-[600px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pr-4">
            {news.map((item, index) => (
              <div key={index} className="glass p-6 group cursor-pointer" onClick={() => openNewsDetail(index)}>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                <button 
                  className="flex items-center text-primary font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    openNewsDetail(index);
                  }}
                >
                  Baca Lanjut
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Dialog open={selectedNews !== null} onOpenChange={closeNewsDetail}>
          <DialogContent className="sm:max-w-md max-h-[85vh]">
            {selectedNews !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{news[selectedNews].title}</DialogTitle>
                  <div className="flex items-center gap-2 text-primary mt-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{news[selectedNews].date}</span>
                  </div>
                </DialogHeader>
                <ScrollArea className="h-[450px] w-full pr-4">
                  <div className="space-y-4 pt-4">
                    {news[selectedNews].image && (
                      <div className="w-full flex justify-center">
                        <img
                          src={news[selectedNews].image}
                          alt={news[selectedNews].title}
                          className="w-32 h-32 rounded-full object-cover border-2 border-primary/30"
                        />
                      </div>
                    )}
                    <DialogDescription className="text-base text-foreground">
                      {news[selectedNews].content}
                    </DialogDescription>
                  </div>
                </ScrollArea>
                {news[selectedNews].galleryLink && (
                  <a
                    href={news[selectedNews].galleryLink}
                    onClick={() => setSelectedNews(null)}
                    className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Pergi ke Galeri Gambar
                  </a>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default News;
