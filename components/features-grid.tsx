"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Zap, BarChart2, Lock, Globe, Clock } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-[#0ff]" />,
      title: "Seguridad Empresarial",
      description: "Encriptación y protocolos de seguridad de nivel bancario para proteger tus datos",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#0ff]" />,
      title: "Velocidad Relámpago",
      description: "Rendimiento optimizado con tiempos de respuesta sub-segundo",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-[#0ff]" />,
      title: "Analítica Avanzada",
      description: "Insights en tiempo real y paneles de informes personalizables",
    },
    {
      icon: <Lock className="h-8 w-8 text-[#0ff]" />,
      title: "Control de Acceso",
      description: "Permisos granulares y gestión de acceso basada en roles",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#0ff]" />,
      title: "CDN Global",
      description: "Infraestructura distribuida para un rendimiento óptimo en todo el mundo",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#0ff]" />,
      title: "Monitoreo 24/7",
      description: "Monitoreo continuo del sistema y alertas instantáneas",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">¿Por qué Elegirnos?</h2>
          <p className="text-xl text-[#0ff]/80">
            Características de vanguardia para empresas modernas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-black/40 backdrop-blur-lg border-[#0ff]/20 hover:border-[#0ff] transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-white hover-glow">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0ff]/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}