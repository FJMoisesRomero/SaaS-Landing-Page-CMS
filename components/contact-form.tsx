"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Dirección de email inválida"),
  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: "¡Mensaje enviado! ",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "¡Error! ",
        description: "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo de cuadrícula cyberpunk */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Efectos de brillo neón */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Sección de encabezado */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Estemos conectados</h2>
          <p className="text-xl text-[#0ff]/80">
            Déjanos tu consulta y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        {/* Diseño de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Ilustración */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-full flex items-center justify-center p-12">
              {/* Efectos de brillo detrás de la imagen */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-300" />
              </div>
              
              {/* Imagen principal con efecto de hover */}
              <div className="relative transition-transform duration-300 hover:scale-105">
                <img
                  src="https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-thinking-robot-png-image_12619398.png"
                  alt="Robot pensante"
                  className="w-[500px] h-auto drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="relative">
            {/* Contenedor de tarjeta */}
            <div className="backdrop-blur-sm bg-black/40 rounded-lg border border-[#0ff]/20 p-8 shadow-2xl shadow-cyan-500/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Campo de nombre */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0ff]">Nombre y Apellido</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Tu nombre" 
                            {...field} 
                            className="bg-black/50 border-[#0ff]/20 focus:border-[#0ff] transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Campo de email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0ff]">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="tu@email.com" 
                            type="email" 
                            {...field} 
                            className="bg-black/50 border-[#0ff]/20 focus:border-[#0ff] transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Campo de teléfono */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0ff]">Tel de contacto</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Tu teléfono" 
                            {...field} 
                            className="bg-black/50 border-[#0ff]/20 focus:border-[#0ff] transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Campo de mensaje */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0ff]">Tu mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="¿Cómo podemos ayudarte?"
                            className="min-h-[120px] bg-black/50 border-[#0ff]/20 focus:border-[#0ff] transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    className="w-full bg-[#0ff] text-black hover:bg-[#0ff]/80 hover:scale-105 transition-all duration-300 font-semibold text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}