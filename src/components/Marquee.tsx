import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MarqueeItem = {
  src: string;
  alt?: string;
};

type MarqueeProps = {
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  items?: MarqueeItem[];
};

const Marquee = ({
  direction = 'left',
  speed = 30,
  className = '',
  items = []
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollDirection = direction === 'left' ? -1 : 1;
    const scrollSpeed = speed * 0.12;
    let animationFrameId: number;

    const scroll = () => {
      if (!containerRef.current || !scrollerRef.current) return;

      scrollPosRef.current += scrollSpeed * scrollDirection;
      const scrollWidth = scrollerRef.current.scrollWidth / 2;

      if (Math.abs(scrollPosRef.current) >= scrollWidth) {
        scrollPosRef.current = 0;
      }

      scrollerRef.current.style.transform = `translateX(${scrollPosRef.current}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    const containerWidth = containerRef.current.clientWidth;
    const firstItem = scrollerRef.current.firstElementChild as HTMLElement | null;
    const initialOffset = firstItem ? (containerWidth - firstItem.getBoundingClientRect().width) / 2 : 0;

    scrollPosRef.current = initialOffset;
    scrollerRef.current.style.transform = `translateX(${initialOffset}px)`;
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, items.length]);

  const marqueeItems = items.length > 0 ? items : [{ src: "/retirement-banner.svg", alt: "Banner utama KMAM SPU" }];
  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
  };

  const goToSlide = (offset: number) => {
    if (!marqueeItems.length || !scrollerRef.current) return;

    const nextIndex = (currentIndex + offset + marqueeItems.length) % marqueeItems.length;
    const firstItem = scrollerRef.current.firstElementChild as HTMLElement | null;
    const gap = 18;
    const itemWidth = firstItem ? firstItem.getBoundingClientRect().width + gap : 0;

    setCurrentIndex(nextIndex);
    scrollPosRef.current = -nextIndex * itemWidth;
    scrollerRef.current.style.transform = `translateX(${scrollPosRef.current}px)`;
  };

  return (
    <div className={`relative ${className}`} aria-label="Banner promosi">
      <div className="relative overflow-hidden rounded-[22px] border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 shadow-[0_14px_30px_-20px_rgba(14,116,144,0.45)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sky-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cyan-50 to-transparent z-10" />

        <div ref={containerRef} className="relative overflow-hidden px-2 py-4 sm:px-3 sm:py-5">
          <div className="mx-auto flex w-full justify-center">
            <div ref={scrollerRef} className="inline-flex items-center justify-center gap-[18px] py-1">
              {duplicatedItems.map((item, index) => {
                const isActive = index % marqueeItems.length === currentIndex;
                return (
                  <div
                    key={`${item.src}-${index}`}
                    className="group relative flex-shrink-0 overflow-hidden rounded-[22px] border border-sky-100/80 bg-white/90 shadow-[0_12px_22px_-16px_rgba(15,23,42,0.85)] transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0.93,
                      transform: isActive ? 'scale(1.02)' : 'scale(0.98)',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt ?? "Kesihatan Awam"}
                      loading="lazy"
                      className="h-40 w-[260px] max-w-none object-cover sm:h-52 sm:w-[300px] md:h-64 md:w-[360px] lg:h-72 lg:w-[420px]"
                      onError={handleImageError}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;