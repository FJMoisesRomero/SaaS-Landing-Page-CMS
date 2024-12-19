"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export function MetricsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metrics = [
    { number: 99.9, label: "Tiempo Activo", plus: true, suffix: "%" },
    { number: 24, label: "Soporte", prefix: "", suffix: "/7" },
    { number: 10, label: "Usuarios Activos", plus: true, suffix: "k" },
    { number: 50, label: "Países", plus: true },
  ];

  return (
    <motion.section 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            ¡Nuestras Estadísticas No Mienten!
          </h1>
          <p className="text-[#0ff]/80 text-lg">
            Resultados comprobados por nuestros clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="relative bg-black/40 backdrop-blur-lg border-[#0ff]/20 p-6 text-center group hover:border-[#0ff] transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div 
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h3 className="text-4xl font-bold mb-2 gradient-text flex justify-center items-center gap-1">
                    {metric.prefix}
                    <CountUp
                      start={0}
                      end={metric.number}
                      duration={2}
                      decimals={metric.number % 1 !== 0 ? 1 : 0}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                      useEasing
                    />
                    {metric.suffix}
                    {metric.plus && "+"}
                  </h3>
                  <p className="text-[#0ff]/80">{metric.label}</p>
                </motion.div>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-[#0ff]/5 blur-xl rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}