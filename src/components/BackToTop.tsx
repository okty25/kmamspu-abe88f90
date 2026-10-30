
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-2xl hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:scale-110 flex items-center justify-center"
      style={{
        filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))',
      }}
    >
      <ArrowUp className="h-6 w-6 text-sky-300" />
    </button>
  );
};

export default BackToTop;
