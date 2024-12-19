"use client";

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "Las características de seguridad han transformado la forma en que manejamos la autenticación. No podríamos estar más satisfechos con los resultados.",
      author: "Sarah Chen",
      role: "CTO en TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      content: "La implementación fue perfecta y el aumento del rendimiento fue inmediato. Nuestro equipo adora el nuevo flujo de trabajo.",
      author: "Michael Rodriguez",
      role: "Desarrollador Líder en Innovate",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    {
      content: "El panel de análisis proporciona información que nunca antes tuvimos. Un cambio revolucionario para nuestra toma de decisiones.",
      author: "Emily Watson",
      role: "Gerente de Producto en DataSync",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-[#0ff]/80">
            Confiado por empresas líderes en todo el mundo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-black/40 backdrop-blur-lg border-[#0ff]/20 hover:border-[#0ff] transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-[#0ff] mb-4" />
                <p className="text-white/80 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-[#0ff]/50">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-[#0ff]/70">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}