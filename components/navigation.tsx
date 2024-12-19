"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Code2 className="h-8 w-8 text-[#0ff] hover-glow" />
            <span className="ml-2 text-xl font-bold gradient-text">SaaSCo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="hover-glow text-[#0ff]">Inicio</Button>
            <Button variant="ghost" className="hover-glow text-[#0ff]">Productos</Button>
            <Button variant="ghost" className="hover-glow text-[#0ff]">Contacto</Button>
            <Button className="bg-[#0ff] text-black hover:bg-[#0ff]/80 hover:scale-105 transition-all">
              Comenzar
            </Button>
          </div>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0ff]"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-black/95 backdrop-blur">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-[#0ff] hover-glow">
              Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#0ff] hover-glow">
              Productos
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#0ff] hover-glow">
              Contacto
            </Button>
            <Button className="w-full bg-[#0ff] text-black hover:bg-[#0ff]/80">
              Comenzar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}