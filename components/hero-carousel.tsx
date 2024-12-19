"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSlides } from "@/hooks/use-slides";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText?: string | null;
  buttonUrl?: string | null;
  order: number;
  isActive: boolean;
}

export function HeroCarousel() {
  const { slides: fetchedSlides, isLoading } = useSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = fetchedSlides || [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=2070&q=80",
      title: "Transform Your Business",
      description: "Streamline operations and boost productivity with our innovative SaaS solutions",
      order: 0,
      isActive: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506733831867-39b3d40549d4?auto=format&fit=crop&w=2070&q=80",
      title: "Scale With Confidence",
      description: "Enterprise-grade solutions that grow with your business",
      order: 1,
      isActive: true,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=2070&q=80",
      title: "Empower Your Team",
      description: "Collaborative tools designed for modern workspaces",
      order: 2,
      isActive: true,
    },
  ];

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (isLoading) {
    return <div className="h-[600px] bg-background animate-pulse" />;
  }

  return (
    <div 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 cyber-grid" />
      
      {slides.map((slide: Slide, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              animation: index === currentSlide ? 'slowZoom 10s linear forwards' : 'none'
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-4xl px-4">
              <h1 
                className="text-5xl md:text-7xl font-bold mb-6 glitch"
                data-text={slide.title}
              >
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 neon-text">
                {slide.description}
              </p>
              <div className="flex gap-4 justify-center">
                {slide.buttonText && slide.buttonUrl ? (
                  <Button 
                    size="lg"
                    className="bg-[#0ff] text-black hover:bg-[#0ff]/80 hover:scale-105 transition-all"
                    asChild
                  >
                    <a href={slide.buttonUrl}>{slide.buttonText}</a>
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg"
                      className="bg-[#0ff] text-black hover:bg-[#0ff]/80 hover:scale-105 transition-all"
                    >
                      Get Started
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-[#0ff] text-[#0ff] hover:bg-[#0ff]/10 hover:scale-105 transition-all"
                    >
                      Learn More
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-[#0ff]"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-[#0ff]"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_: Slide, index: number) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-[#0ff] w-8 neon-border" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}