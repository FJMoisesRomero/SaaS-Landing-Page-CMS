"use client";

import { HeroCarousel } from "@/components/hero-carousel";
import { ProductShowcase } from "@/components/product-showcase";
import { MetricsSection } from "@/components/metrics-section";
import { FeaturesGrid } from "@/components/features-grid";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { InfiniteScroller } from "@/components/infinite-scroller";

const placeholderItems = [
  {
    id: "1",
    title: "Integración Cyberpunk",
    description: "Integra mejoras cibernéticas de vanguardia en tu infraestructura existente.",
  },
  {
    id: "2",
    title: "Redes Neuronales",
    description: "Sistemas de IA avanzados que aprenden y se adaptan a las necesidades específicas de tu negocio.",
  },
  {
    id: "3",
    title: "Seguridad Cuántica",
    description: "Protocolos de encriptación de próxima generación impulsados por tecnología cuántica.",
  },
  {
    id: "4",
    title: "Interfaz Holográfica",
    description: "Interfaces 3D inmersivas que revolucionan la interacción del usuario y la visualización de datos.",
  },
  {
    id: "5",
    title: "Analítica Neón",
    description: "Análisis de datos en tiempo real con impresionantes representaciones visuales y perspectivas predictivas.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <MetricsSection />
      <ProductShowcase />
      
      {/* Sección de Desplazamiento Infinito */}
      <section className="w-full py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h2 className="text-4xl font-bold gradient-text text-center">
              Tecnologías Destacadas
            </h2>
            <p className="text-[#0ff]/70 text-center mt-4 text-lg">
              Descubre nuestras soluciones de vanguardia para la era digital
            </p>
          </div>
          <InfiniteScroller items={placeholderItems} baseVelocity={0.5} />
        </div>
      </section>
      
      <FeaturesGrid />
      <TestimonialsSection />
      <ContactForm />
      
      <section className="w-full py-24 bg-gradient-to-b from-black/40 to-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            ¿Listo para dar el paso hacia el futuro?
          </h2>
          <p className="text-[#0ff]/70 text-lg mb-8 max-w-2xl mx-auto">
            Únete a la revolución de soluciones tecnológicas de próxima generación que transforman la forma en que haces negocios.
          </p>
          <button className="px-8 py-3 rounded-lg bg-[#0ff]/10 text-[#0ff] border border-[#0ff]/50 hover:bg-[#0ff]/20 hover:border-[#0ff] transition-all cyberpunk-glow">
            Comienza Ahora
          </button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}