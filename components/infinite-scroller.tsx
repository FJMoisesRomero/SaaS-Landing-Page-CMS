"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InfiniteScrollerProps {
  items: {
    id: string;
    title: string;
    description: string;
  }[];
  className?: string;
  baseVelocity?: number;
}

export function InfiniteScroller({
  items,
  className,
  baseVelocity = 1,
}: InfiniteScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentTranslate = 0;

    const animate = () => {
      if (!scrollerRef.current || !containerRef.current) return;

      currentTranslate -= baseVelocity;
      const scrollerWidth = scrollerRef.current.offsetWidth;

      if (Math.abs(currentTranslate) >= scrollerWidth / 2) {
        currentTranslate = 0;
      }

      scrollerRef.current.style.transform = `translateX(${currentTranslate}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [baseVelocity]);

  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden bg-black/20 backdrop-blur-sm border-t border-b border-[#0ff]/20",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className="flex gap-8 py-6 px-4 whitespace-nowrap"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-none w-[300px] p-4 rounded-lg bg-black/40 border border-[#0ff]/20 hover:border-[#0ff]/60 transition-all group"
          >
            <div className="h-32 mb-4 rounded bg-gradient-to-br from-[#0ff]/5 to-[#f0f]/5 group-hover:from-[#0ff]/10 group-hover:to-[#f0f]/10 transition-all" />
            <h3 className="text-lg font-bold text-white mb-2 gradient-text">
              {item.title}
            </h3>
            <p className="text-[#0ff]/70 text-sm line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
