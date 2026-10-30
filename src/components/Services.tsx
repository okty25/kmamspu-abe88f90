
import { Beaker, Search, FileCheck, HelpCircle } from "lucide-react";
import Marquee from "./Marquee";

const Services = () => {
  const marqueeItems = [
    { src: "/lovable-uploads/9bd4bee4-0a17-4a70-83f5-f523680e99f0.png", alt: "Banner KMAM SPU" },
    { src: "/lovable-uploads/9f886ca5-0be9-485e-b08b-ece2ac409805.png", alt: "Banner KMAM SPU" },
    { src: "/lovable-uploads/ea8513ed-c7d9-420b-8b72-a0bdb1b909c7.png", alt: "Banner KMAM SPU" },
    { src: "/lovable-uploads/mr heng.png", alt: "Banner KMAM SPU" },
    { src: "/mrheng1.JPG", alt: "Mr Heng banner KMAM SPU" }
  ];
  const services = [
    {
      icon: <Beaker className="w-8 h-8" aria-hidden="true" />,
      title: "Pemantauan Kualiti Air",
      description: "Pemeriksaan berkala dan sistematik kualiti air minum di seluruh kawasan Seberang Perai Utara untuk memastikan pematuhan kepada piawaian keselamatan air minum negara dan antarabangsa.",
      keywords: "pemantauan air, kualiti air, keselamatan air"
    },
    {
      icon: <Search className="w-8 h-8" aria-hidden="true" />,
      title: "Analisis Makmal",
      description: "Pengujian terperinci parameter mikrobiologi dan kimia di makmal yang dilengkapi dengan peralatan moden untuk analisis kualiti air yang tepat dan dipercayai.",
      keywords: "analisis makmal, ujian air, parameter air"
    },
    {
      icon: <FileCheck className="w-8 h-8" aria-hidden="true" />,
      title: "Konsultasi Teknikal",
      description: "Khidmat nasihat profesional dan bimbingan teknikal kepada agensi kerajaan, pihak berkuasa air, dan orang awam berkaitan pengurusan dan pemantauan kualiti air minum.",
      keywords: "konsultasi air, nasihat teknikal, pengurusan air"
    },
    {
      icon: <HelpCircle className="w-8 h-8" aria-hidden="true" />,
      title: "Sokongan Pelanggan",
      description: "Perkhidmatan responsif untuk menjawab pertanyaan, menerima aduan, dan memberikan maklum balas berkaitan isu kualiti air minum di kawasan anda.",
      keywords: "khidmat pelanggan, aduan air, maklum balas"
    }
  ];

  return (
    <section id="services" className="section-padding bg-secondary/50" aria-labelledby="services-heading">
      <div className="mb-8" aria-hidden="true">
        <Marquee items={marqueeItems} speed={15} />
      </div>

      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h2 id="services-heading" className="heading text-center">Perkhidmatan Kami</h2>
          <p className="subheading text-center max-w-2xl mx-auto">
            Kami menawarkan pelbagai perkhidmatan profesional untuk memastikan kualiti air minum yang selamat dan terjamin di Seberang Perai Utara, Pulau Pinang.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <article
              key={index}
              className="glass p-6 text-center hover:scale-105 transition-transform duration-300"
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3" itemProp="name">{service.title}</h3>
              <p className="text-muted-foreground" itemProp="description">{service.description}</p>
              <meta itemProp="serviceType" content={service.title} />
              <meta itemProp="provider" content="KMAM SPU" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
