import { Users } from "lucide-react";
import rosmayatiImg from "@/assets/team/rosmayati.jpg";
import tanSeokHongImg from "@/assets/team/tan-seok-hong.jpg";
import hengChianShienImg from "@/assets/team/heng-chian-shien.jpg";
import ismailImg from "@/assets/team/ismail.jpg";
import akmalImg from "@/assets/team/akmal.jpg";
import khairulanuarImg from "@/assets/team/khairulanuar.jpg";
import faizImg from "@/assets/team/faiz.jpg";
import izaniImg from "@/assets/team/izani.jpg";

interface TeamMember {
  name: string;
  position: string;
  department: string;
  about: string;
  image?: string;
  imgPos?: string;
}

const Organization = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "DR. IZANI UZAIR ZUBAIR",
      position: "PEGAWAI KESIHATAN DAERAH",
      department: "(PKD UD15)",
      about: "Bertanggungjawab dalam pengurusan dan pentadbiran kesihatan daerah",
      image: izaniImg
    },
    {
      name: "DR. TAN SEOK HONG",
      position: "PEGAWAI KESIHATAN EPIDEMIOLOGI",
      department: "(PKE UD15)",
      about: "Pakar dalam bidang epidemiologi dan kawalan penyakit berjangkit",
      image: tanSeokHongImg
    },
    {
      name: "EN. HENG CHIAN SHIEN",
      position: "PEGAWAI KESIHATAN PERSEKITARAN",
      department: "(PKP U10)",
      about: "Bertanggungjawab dalam pemantauan kualiti air dan persekitaran",
      image: hengChianShienImg
    },
    {
      name: "EN. ISMAIL",
      position: "KETUA PENOLONG PEGAWAI KESIHATAN PERSEKITARAN",
      department: "(KPPKP U7)",
      about: "Mengetuai operasi pemantauan kualiti air minum di lapangan",
      image: ismailImg,
      imgPos: "center 25%"
    },
    {
      name: "PN HJH. ROSMAYATI",
      position: "PENOLONG PEGAWAI KESIHATAN PERSEKITARAN KANAN",
      department: "(PPKPK U6)",
      about: "Menyelia aktiviti kawalan mutu air minum dan dokumentasi",
      image: rosmayatiImg
    },
    {
      name: "EN. FAIZ HAFFIZUDDIN",
      position: "PENOLONG PEGAWAI KESIHATAN PERSEKITARAN",
      department: "(PPKP U6)",
      about: "Melaksanakan pemeriksaan dan analisis sampel air",
      image: faizImg
    },
    {
      name: "EN. MUHAMMAD AKMAL",
      position: "PEMBANTU KESIHATAN AWAM",
      department: "(PKA U1)",
      about: "Membantu dalam aktiviti pemantauan dan pengumpulan data",
      image: akmalImg
    },
    {
      name: "EN. KHAIRULANUAR",
      position: "PEMBANTU KHIDMAT AM",
      department: "(PKA H1)",
      about: "Menyokong operasi pentadbiran dan logistik unit",
      image: khairulanuarImg
    }
  ];

  return (
    <section id="organization" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="heading text-center">Carta Organisasi</h2>
        <p className="subheading text-center max-w-2xl mx-auto">
          Struktur organisasi KMAM Seberang Perai Utara
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flip-card h-[320px] perspective-1000">
              <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d">
                {/* Front Side */}
                <div className="flip-card-front absolute w-full h-full backface-hidden rounded-2xl glass p-6 flex flex-col items-center justify-center text-center">
                  {member.image ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/30">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" style={{ objectPosition: member.imgPos || 'center 20%' }} />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-4">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-1">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                  <p className="text-xs text-muted-foreground mt-4 opacity-70">Gerakkan tetikus ke sini untuk info lanjut.</p>
                </div>
                
                {/* Back Side */}
                <div className="flip-card-back absolute w-full h-full backface-hidden rounded-2xl bg-primary p-6 flex flex-col items-center justify-center text-center rotate-y-180">
                  <h3 className="text-lg font-bold mb-2 text-primary-foreground">Tentang</h3>
                  <div className="w-12 h-1 bg-primary-foreground/50 rounded mb-4"></div>
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                    {member.about}
                  </p>
                  <div className="mt-auto">
                    <p className="text-primary-foreground font-semibold text-sm">{member.name}</p>
                    <p className="text-primary-foreground/70 text-xs">{member.department}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organization;
