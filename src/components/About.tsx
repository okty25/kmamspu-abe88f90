
import { Target, Award, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="heading text-center">Tentang Kami</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-3">Sejarah Kami</h3>
              <p className="text-muted-foreground">
                KMAM Seberang Perai Utara telah ditubuhkan untuk memastikan kualiti air minum yang selamat dan bersih untuk komuniti. Kami telah berkhidmat dengan dedikasi sejak penubuhan kami.
              </p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-3">Visi</h3>
              <p className="text-muted-foreground">
                Menjadi peneraju dalam pemantauan dan kawalan kualiti air minum di Seberang Perai Utara.
              </p>
            </div>
            
            <div className="glass p-6">
              <h3 className="text-xl font-semibold mb-3">Misi</h3>
              <p className="text-muted-foreground">
                Memastikan bekalan air minum yang selamat dan berkualiti tinggi untuk semua penduduk melalui pemantauan dan kawalan yang berterusan.
              </p>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="glass p-6 flex items-start gap-4">
              <Target className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Matlamat Kami</h3>
                <p className="text-muted-foreground">
                  Memastikan setiap titik air yang sampai kepada pengguna adalah selamat dan memenuhi standard kualiti yang ditetapkan.
                </p>
              </div>
            </div>
            
            <div className="glass p-6 flex items-start gap-4">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Komitmen Kami</h3>
                <p className="text-muted-foreground">
                  Kami komited dalam menyediakan perkhidmatan berkualiti tinggi dan memenuhi keperluan komuniti.
                </p>
              </div>
            </div>
            
            <div className="glass p-6 flex items-start gap-4">
              <Users className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Pasukan Kami</h3>
                <p className="text-muted-foreground">
                  Pasukan profesional kami terdiri daripada pakar-pakar yang berpengalaman dalam bidang kualiti air.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
