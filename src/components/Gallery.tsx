import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import { Images } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import g1 from "@/assets/gallery/g1.jpg";
import g2 from "@/assets/gallery/g2.jpg";
import g3 from "@/assets/gallery/g3.jpg";
import g4 from "@/assets/gallery/g4.jpg";
import g5 from "@/assets/gallery/g5.jpg";
import g6 from "@/assets/gallery/g6.jpg";
import g7 from "@/assets/gallery/g7.jpg";
import g8 from "@/assets/gallery/g8.jpg";
import g9 from "@/assets/gallery/g9.jpg";
import g10 from "@/assets/gallery/g10.jpg";
import g11 from "@/assets/gallery/g11.jpg";
import g12 from "@/assets/gallery/g12.jpg";
import g13 from "@/assets/gallery/g13.jpg";
import g14 from "@/assets/gallery/g14.jpg";
import g15 from "@/assets/gallery/g15.jpg";
import g16 from "@/assets/gallery/g16.jpg";
import g17 from "@/assets/gallery/g17.jpg";
import g18 from "@/assets/gallery/g18.jpg";
import g19 from "@/assets/gallery/g19.jpg";
import g20 from "@/assets/gallery/g20.jpg";
import g21 from "@/assets/gallery/g21.jpg";
import g22 from "@/assets/gallery/g22.jpg";
import g23 from "@/assets/gallery/g23.jpg";
import g24 from "@/assets/gallery/g24.jpg";
import g25 from "@/assets/gallery/g25.jpg";
import g26 from "@/assets/gallery/g26.jpg";
import g27 from "@/assets/gallery/g27.jpg";
import g28 from "@/assets/gallery/g28.jpg";
import g29 from "@/assets/gallery/g29.jpg";
import g30 from "@/assets/gallery/g30.jpg";

const jasamuDikenangPhotos = [
  { src: "/aecaf359-1624-4c11-bdbb-2222062d693c-mr23010f8d-82c9-4c43-be9a-cc0f0de1b912.JPG", caption: "Kenangan Majlis Penghargaan Pejabat Kesihatan Daerah SPU" },
  { src: "/ed1cb7b6-f144-4333-92e8-36d69cab7503-mr-7460f0e-fd6c-4204-b91c-a41d17f87af1.JPG", caption: "Selamat Bersara Encik Heng Chian Shien" },
  { src: "/1ee0cd8b-db64-461d-ab01-b20f607d021c-mr-4869296a-2602-4805-b130-0cc62a1a46f0.JPG", caption: "Majlis Pemberian Tanda Jasa kepada Encik Heng Chian Shien" },
  { src: "/5434f597-4376-4353-b0dd-899e86724d35-mr-4075a5fe-eb57-428a-800f-b37981c9e787.JPG", caption: "Kenangan Bersama Rakan-Rakan Seperjuangan Encik Heng Chian Shien" },
  { src: "/094cb2f3-687b-4320-a49c-45a0350348c6-mrheng2.JPG", caption: "Encik Heng Chian Shien di Pejabat" },
  { src: "/3cbd93fa-4330-4d25-a637-c0bcce7ae906-mrheng1.JPG", caption: "Portret Encik Heng Chian Shien" },
  { src: "/ad1ffba3-3756-4cad-8cbc-86378559cb9c-mrf1acc9d4-8b17-448a-add8-c4091f9b8243.JPG", caption: "Encik Heng Chian Shien di Makmal Pemeriksaan Kualiti Air" },
  { src: "/mrheng3.jpg", caption: "Kenangan Majlis Penghargaan Encik Heng Chian Shien bersama rakan sekerja" },
  { src: "/lovable-uploads/mr heng.png", caption: "Jasamu Dikenang Encik Heng Chian Shien" },
];

const posterInovasiPhotos = [
  "IMG_20260930_125808.jpg",
  "IMG_20260930_151111.jpg",
  "IMG_20260930_151120.jpg",
  "IMG_20260930_151233.jpg",
  "IMG_20260930_151237.jpg",
  "IMG_20260930_151248.jpg",
  "IMG_20260930_151255.jpg",
  "IMG_20260930_151334.jpg",
  "IMG_20260930_151446.jpg",
  "IMG_20260930_151521.jpg",
  "IMG_20260930_151527.jpg",
  "IMG_20260930_151612.jpg",
  "IMG_20260930_151617.jpg",
  "IMG_20260930_151623.jpg",
  "IMG_20260930_151624.jpg",
  "IMG_20260930_152633.jpg",
  "IMG_20260930_155958.jpg",
  "IMG_20260930_160005.jpg",
  "IMG_20260930_160659.jpg",
  "IMG_20260930_160711.jpg",
  "IMG_20260930_204404.jpg",
  "IMG_20260930_204517.jpg",
  "IMG_20260930_204520.jpg",
  "IMG_20260930_225103.jpg",
  "IMG_20260930_225104.jpg",
  "IMG_20260930_225106.jpg",
  "IMG_20261009_092848.jpg",
  "IMG_20261009_092910.jpg",
  "IMG_20261009_093000.jpg",
  "IMG_20261009_093011.jpg",
  "IMG_20261009_093030.jpg",
  "IMG_20261009_093524.jpg",
  "IMG_20261009_093556.jpg",
  "IMG_20261009_093600.jpg",
  "IMG_20261009_093604.jpg",
  "IMG_20261009_093605.jpg",
  "IMG_20261009_093607.jpg",
  "IMG_20261009_093608.jpg",
  "IMG_20261009_093610.jpg",
  "IMG_20261009_093612.jpg",
  "IMG_20261009_093614.jpg",
  "IMG_20261009_093616.jpg",
  "IMG_20261009_093621.jpg",
  "IMG_20261009_093630.jpg",
  "IMG_20261009_093908.jpg",
  "IMG_20261009_093918.jpg",
].map((filename, index) => ({
  src: `/poster-inovasi/${filename}`,
  caption: `Pertandingan Poster Inovasi Proses Dashboard - Foto ${index + 1}`,
}));

const photos = [
  { src: g1, caption: "Pengukuran parameter kualiti air di lapangan" },
  { src: g2, caption: "Persampelan air bersama pasukan pemeriksaan" },
  { src: g3, caption: "Persampelan di loji rawatan air" },
  { src: g4, caption: "Pengambilan sampel air mentah" },
  { src: g5, caption: "Persampelan air di struktur pengambilan sungai" },
  { src: g6, caption: "Pemeriksaan kolam pengendapan" },
  { src: g7, caption: "Pemantauan proses rawatan air" },
  { src: g8, caption: "Tinjauan sistem bekalan air" },
  { src: g9, caption: "Pemeriksaan kemudahan loji rawatan" },
  { src: g10, caption: "Tinjauan sumber air sungai" },
  { src: g11, caption: "Penyediaan botol dan bekas sampel di lapangan" },
  { src: g12, caption: "Persiapan peralatan persampelan di kenderaan pasukan" },
  { src: g13, caption: "Persampelan air sungai dari jambatan" },
  { src: g14, caption: "Taklimat pasukan sebelum aktiviti persampelan" },
  { src: g15, caption: "Pengambilan sampel air sungai menggunakan tali dan baldi" },
  { src: g16, caption: "Pemindahan sampel air untuk ujian kualiti" },
  { src: g17, caption: "Kerja berpasukan semasa persampelan di jambatan" },
  { src: g18, caption: "Sesi pemeriksaan di dalam loji rawatan air" },
  { src: g19, caption: "Persampelan di struktur pengambilan air loji" },
  { src: g20, caption: "Pemantauan kolam rawatan di loji bekalan air" },
  { src: g21, caption: "Keadaan air sungai keruh berhampiran kawasan perbandaran" },
  { src: g22, caption: "Jambatan besi lama merentasi sungai kawasan kajian" },
  { src: g23, caption: "Pemerhatian aliran sungai dari atas jambatan" },
  { src: g24, caption: "Tinjauan sungai di bawah jambatan konkrit" },
  { src: g25, caption: "Sumber air sungai dikelilingi kawasan hijau" },
  { src: g26, caption: "Struktur paip bekalan air merentasi sungai" },
  { src: g27, caption: "Pemeriksaan keadaan sungai dan kawasan tebing" },
  { src: g28, caption: "Kolam pengendapan loji rawatan air" },
  { src: g29, caption: "Terusan pengambilan air mentah berhampiran loji" },
  { src: g30, caption: "Struktur pintu air di stesen pengambilan air mentah" },
];


const Gallery = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    Fancybox.bind(el, "[data-fancybox]");
    return () => Fancybox.unbind(el);
  }, []);


  return (
    <section
      id="gallery"
      ref={rootRef}
      className="py-20 relative"
      aria-label="Galeri Kajian Kebersihan Sistem Bekalan Air"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Images className="w-4 h-4" />
            Galeri Gambar
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-balance">
            Jasamu Dikenang Encik Heng Chian Shien
          </h2>
          <p className="text-muted-foreground mt-4">
            Kenangan majlis penghargaan dan tanda jasa buat Encik Heng Chian Shien.
          </p>
        </header>

        {/* Reel / highlight - Swiper */}
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          centeredSlidesBounds
          centerInsufficientSlides
          loop
          slidesPerView="auto"
          spaceBetween={24}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 2, slideShadows: false }}
          className="!pb-14 kmam-reel mx-auto"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {jasamuDikenangPhotos.map((p, i) => (
            <SwiperSlide key={i} className="!w-[240px] md:!w-[280px]">
              <a
                href={p.src}
                data-fancybox="jasamu-dikenang"
                data-caption={p.caption}
                className="block group relative aspect-[9/16] overflow-hidden rounded-2xl glass"
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-[10px] md:text-xs font-medium text-foreground/90 leading-snug">
                  {p.caption}
                </span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <h3 className="text-center text-xl md:text-2xl font-bold text-balance mt-12 mb-6">
          PERTANDINGAN POSTER INOVASI PROSES DASHBOARD
        </h3>
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          centeredSlidesBounds
          centerInsufficientSlides
          loop
          slidesPerView="auto"
          spaceBetween={24}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 2, slideShadows: false }}
          className="!pb-14 kmam-reel mx-auto"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {posterInovasiPhotos.map((photo) => (
            <SwiperSlide key={photo.src} className="!w-[280px] md:!w-[360px]">
              <a
                href={photo.src}
                data-fancybox="poster-inovasi"
                data-caption={photo.caption}
                className="block group relative aspect-[4/3] overflow-hidden rounded-2xl glass"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-[10px] md:text-xs font-medium text-foreground/90 leading-snug">
                  {photo.caption}
                </span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <h3 className="text-center text-xl md:text-2xl font-bold text-balance mt-12 mb-6">
          Kajian Kebersihan Sistem Bekalan Air Paip SPU
        </h3>
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          centeredSlidesBounds
          centerInsufficientSlides
          loop
          slidesPerView="auto"
          spaceBetween={24}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 2, slideShadows: false }}
          className="!pb-14 kmam-reel mx-auto"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo.src} className="!w-[240px] md:!w-[280px]">
                <a
                  href={photo.src}
                  data-fancybox="kajian-2026"
                  data-caption={photo.caption}
                  className="block group relative aspect-[9/16] overflow-hidden rounded-2xl glass"
                >
                  <img
                    src={photo.src}
                    alt={`${photo.caption}, gambar ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-[10px] md:text-xs font-medium text-foreground/90 leading-snug">
                    {photo.caption}
                  </span>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

        {/* Galeri penuh - grid + Fancybox */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {photos.map((p, i) => (
            <a
              key={i}
              href={p.src}
              data-fancybox="jasamu-dikenang-grid"
              data-caption={p.caption}
              className="group relative aspect-square overflow-hidden rounded-xl glass"
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2 text-[10px] font-medium text-foreground/90 leading-snug">
                {p.caption}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
