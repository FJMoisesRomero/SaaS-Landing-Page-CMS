"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Edit, Plus, Trash2 } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
  order: number;
  isActive: boolean;
}

export default function SlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/slides");
      if (!response.ok) throw new Error("Error al obtener los slides");
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      toast({
        title: "¡Error!",
        description: "Error al obtener los slides",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const isActiveSwitch = form.querySelector('#isActive') as HTMLInputElement;

      const slideData = {
        image: formData.get("image") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        buttonText: formData.get("buttonText") as string || undefined,
        buttonUrl: formData.get("buttonUrl") as string || undefined,
        order: parseInt(formData.get("order") as string) || 0,
        isActive: isActiveSwitch.checked,
      };

      const response = await fetch(
        selectedSlide 
          ? `/api/admin/slides/${selectedSlide.id}` 
          : "/api/admin/slides",
        {
          method: selectedSlide ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedSlide ? { ...slideData, id: selectedSlide.id } : slideData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al guardar el slide");
      }

      toast({
        title: "¡Éxito!",
        description: selectedSlide ? "Slide actualizado con éxito" : "Slide creado con éxito",
        variant: "default",
      });
      
      setIsDialogOpen(false);
      setSelectedSlide(null);
      await fetchSlides();
    } catch (error) {
      toast({
        title: "¡Error!",
        description: error instanceof Error ? error.message : "Error al guardar el slide",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slide: Slide) => {
    try {
      const response = await fetch(`/api/admin/slides/${slide.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el slide");
      }

      toast({
        title: "¡Éxito!",
        description: "Slide eliminado con éxito",
        variant: "default",
      });

      await fetchSlides();
    } catch (error) {
      toast({
        title: "¡Error!",
        description: "Error al eliminar el slide",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (slide: Slide, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/slides/${slide.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...slide,
          isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del slide");
      }

      toast({
        title: "¡Éxito!",
        description: "Estado actualizado con éxito",
        variant: "default",
      });

      await fetchSlides();
    } catch (error) {
      toast({
        title: "¡Error!",
        description: "Error al actualizar el estado del slide",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold gradient-text">Slides del Hero</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setSelectedSlide(null)}
                className="bg-[#0ff]/10 text-[#0ff] hover:bg-[#0ff]/20 border border-[#0ff]/50 hover:border-[#0ff]"
              >
                Agregar Slide
              </Button>
            </DialogTrigger>
            <DialogContent className="dialog-gradient sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                  {selectedSlide ? "Editar Slide" : "Agregar Slide"}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedSlide
                    ? "Realiza cambios en tu slide aquí."
                    : "Agrega un nuevo slide a tu hero."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Columna izquierda */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image" className="text-sm font-medium text-gray-200">
                        URL de la Imagen
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        defaultValue={selectedSlide?.image}
                        required
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-200">
                        Título
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={selectedSlide?.title}
                        required
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-gray-200">
                        Descripción
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={selectedSlide?.description}
                        required
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="buttonText" className="text-sm font-medium text-gray-200">
                        Texto del Botón (opcional)
                      </Label>
                      <Input
                        id="buttonText"
                        name="buttonText"
                        defaultValue={selectedSlide?.buttonText || ""}
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buttonUrl" className="text-sm font-medium text-gray-200">
                        URL del Botón (opcional)
                      </Label>
                      <Input
                        id="buttonUrl"
                        name="buttonUrl"
                        defaultValue={selectedSlide?.buttonUrl || ""}
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="order" className="text-sm font-medium text-gray-200">
                          Orden
                        </Label>
                        <Input
                          id="order"
                          name="order"
                          type="number"
                          defaultValue={selectedSlide?.order ?? 0}
                          required
                          className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                        />
                      </div>

                      <div className="flex items-center space-x-2 mt-6">
                        <Switch
                          id="isActive"
                          name="isActive"
                          defaultChecked={selectedSlide?.isActive ?? true}
                        />
                        <Label htmlFor="isActive" className="text-white">Activo</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white cyberpunk-glow"
                  >
                    {isLoading ? (
                      <>
                        <Edit className="mr-2 h-4 w-4 animate-spin" />
                        {selectedSlide ? "Actualizando..." : "Creando..."}
                      </>
                    ) : (
                      selectedSlide ? "Actualizar" : "Crear"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border border-[#0ff]/20">
          <DataTable
            data={slides}
            columns={[
              {
                header: "Imagen",
                accessorKey: "image",
                cell: (slide) => (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                ),
              },
              {
                header: "Título",
                accessorKey: "title",
              },
              {
                header: "Descripción",
                accessorKey: "description",
                cell: (slide) => (
                  <div className="max-w-[200px] truncate">
                    {slide.description}
                  </div>
                ),
              },
              {
                header: "Orden",
                accessorKey: "order",
              },
              {
                header: "Estado",
                accessorKey: "isActive",
                cell: (slide) => (
                  <Switch
                    checked={slide.isActive}
                    onCheckedChange={(checked) => handleStatusChange(slide, checked)}
                  />
                ),
              },
              {
                header: "Acciones",
                accessorKey: "_actions",
                cell: (slide) => (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedSlide(slide);
                        setIsDialogOpen(true);
                      }}
                      className="border-[#0ff]/20 hover:border-[#0ff] hover:bg-[#0ff]/10"
                    >
                      <Edit className="w-4 h-4 text-[#0ff]" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(slide)}
                      className="border-[#0ff]/20 hover:border-[#0ff] hover:bg-[#0ff]/10"
                    >
                      <Trash2 className="w-4 h-4 text-[#0ff]" />
                    </Button>
                  </div>
                ),
              },
            ]}
            searchPlaceholder="Buscar slides..."
            itemsPerPage={5}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
}
