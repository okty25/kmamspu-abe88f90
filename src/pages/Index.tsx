import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Organization from "@/components/Organization";
import News from "@/components/News";
import Gallery from "@/components/Gallery";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SanitarySurveyButton from "@/components/SanitarySurveyButton";
import VisitorCounter from "@/components/VisitorCounter";
import { GridPattern } from "@/components/ui/grid-pattern";
const Index = () => {
  return <ThemeProvider defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <GridPattern className="fixed inset-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
            <Navbar />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
            <Hero />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <Services />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
            <About />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
            <Organization />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
            <News />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '550ms', animationFillMode: 'backwards' }}>
            <Gallery />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
            <Contact />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
            <Footer />
          </div>
          
          {/* Copyright Footer */}
          <div className="bg-background border-t border-border/20 py-4 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
            <div className="container mx-auto flex items-center justify-center gap-3 group cursor-default transition-all duration-300 hover:scale-[1.02]">
              <img 
                src="/logo_kmam_edit.png" 
                alt="KMAM SPU Logo" 
                className="w-8 h-8 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30"
              />
              <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground">Hakcipta terpelihara KMAMSPU-KLIK©{new Date().getFullYear()}.</p>
            </div>
            <VisitorCounter />
          </div>
        </div>
        <BackToTop />
        <SanitarySurveyButton />
      </div>
    </ThemeProvider>;
};
export default Index;