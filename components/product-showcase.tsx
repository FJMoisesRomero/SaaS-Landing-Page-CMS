"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart2, Shield, Zap } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import Image from "next/image";
import { motion } from "framer-motion";

interface Feature {
  id?: number;
  text: string;
  productId?: number;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Product {
  id?: number;
  icon: string;
  image?: string | null;
  title: string;
  description: string;
  features: Feature[];
  buttonText?: string | null;
  buttonUrl?: string | null;
  order?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export function ProductShowcase() {
  const { products: fetchedProducts, isLoading } = useProducts();

  const defaultProducts: Product[] = [
    {
      icon: "BarChart2",
      title: "Analytics Suite",
      description: "Powerful insights and data visualization tools to drive informed decision-making",
      features: [
        { text: "Real-time tracking" },
        { text: "Custom reports" },
        { text: "AI predictions" },
      ],
    },
    {
      icon: "Shield",
      title: "Security Platform",
      description: "Enterprise-grade security solutions to protect your valuable business assets",
      features: [
        { text: "End-to-end encryption" },
        { text: "Compliance tools" },
        { text: "Threat detection" },
      ],
    },
    {
      icon: "Zap",
      title: "Automation Tools",
      description: "Streamline your workflow with intelligent automation solutions",
      features: [
        { text: "Workflow builder" },
        { text: "API integration" },
        { text: "Smart triggers" },
      ],
    },
  ];

  const products = fetchedProducts || defaultProducts;

  if (isLoading) {
    return <div className="h-[600px] bg-background animate-pulse" />;
  }

  const renderFeature = (feature: Feature, index: number) => {
    return (
      <li key={feature.id} className="flex items-center text-white/80">
        <div className="h-1.5 w-1.5 rounded-full bg-[#0ff] mr-2" />
        {feature.text}
      </li>
    );
  };

  const neonColors = [
    {
      from: "from-cyan-500/30",
      via: "via-cyan-300/30",
      to: "to-cyan-500/30",
      fromDim: "from-cyan-500/20",
      viaDim: "via-cyan-300/20",
      toDim: "to-cyan-500/20",
    },
    {
      from: "from-fuchsia-500/30",
      via: "via-purple-300/30",
      to: "to-fuchsia-500/30",
      fromDim: "from-fuchsia-500/20",
      viaDim: "via-purple-300/20",
      toDim: "to-fuchsia-500/20",
    },
    {
      from: "from-rose-500/30",
      via: "via-pink-300/30",
      to: "to-rose-500/30",
      fromDim: "from-rose-500/20",
      viaDim: "via-pink-300/20",
      toDim: "to-rose-500/20",
    },
    {
      from: "from-amber-500/30",
      via: "via-yellow-300/30",
      to: "to-amber-500/30",
      fromDim: "from-amber-500/20",
      viaDim: "via-yellow-300/20",
      toDim: "to-amber-500/20",
    },
    {
      from: "from-teal-500/30",
      via: "via-emerald-300/30",
      to: "to-teal-500/30",
      fromDim: "from-teal-500/20",
      viaDim: "via-emerald-300/20",
      toDim: "to-teal-500/20",
    },
    {
      from: "from-indigo-500/30",
      via: "via-blue-300/30",
      to: "to-indigo-500/30",
      fromDim: "from-indigo-500/20",
      viaDim: "via-blue-300/20",
      toDim: "to-indigo-500/20",
    },
    {
      from: "from-red-500/30",
      via: "via-orange-300/30",
      to: "to-red-500/30",
      fromDim: "from-red-500/20",
      viaDim: "via-orange-300/20",
      toDim: "to-red-500/20",
    }
  ];

  const getRandomNeonColor = () => {
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Nuestras Soluciones</h2>
          <p className="text-xl text-[#0ff]/80">
            Descubre herramientas diseñadas para transformar tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {(fetchedProducts?.length ? fetchedProducts : defaultProducts).map((product: Product, index: any) => (
            <motion.div 
              key={product.id || index} 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pt-[100px]"
            >
              {product.image && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] z-20">
                {(() => {
                  const color = getRandomNeonColor();
                  return (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${color.from} ${color.via} ${color.to} blur-xl rounded-full animate-pulse`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${color.fromDim} ${color.viaDim} ${color.toDim} blur-2xl rounded-full animate-pulse delay-75`} />
                    </>
                  );
                })()}
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    quality={90}
                  />
                </div>
              </div>
              )}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden bg-white/5 backdrop-blur-sm hover:border-cyan-500 transition-all duration-300">
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                        {product.icon && (
                          <Image
                            src={`/icons/${product.icon}.svg`}
                            alt={product.title}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold">{product.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <div className="mr-2 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  {(product.buttonText && product.buttonUrl) && (
                    <CardFooter className="relative z-10">
                      <Button
                        variant="secondary"
                        className="w-full bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20"
                        asChild
                      >
                        <a href={product.buttonUrl} target="_blank" rel="noopener noreferrer">
                          {product.buttonText}
                        </a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}