"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { IconSelector } from "@/components/ui/icon-selector";
import * as Icons from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import React from "react";

interface Feature {
  id: number;
  text: string;
  order: number;
  productId: number;
}

interface Product {
  id: number;
  icon: string;
  image: string | null;
  title: string;
  description: string;
  features: Feature[];
  buttonText: string | null;
  buttonUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  icon: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  order: string;
  isActive: boolean;
  features: string[];
}

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    icon: "",
    image: "",
    title: "",
    description: "",
    buttonText: "",
    buttonUrl: "",
    order: "0",
    isActive: true,
    features: [""],
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedIcon(selectedProduct.icon);
      setFormData({
        icon: selectedProduct.icon,
        image: selectedProduct.image || "",
        title: selectedProduct.title,
        description: selectedProduct.description,
        buttonText: selectedProduct.buttonText || "",
        buttonUrl: selectedProduct.buttonUrl || "",
        order: selectedProduct.order.toString(),
        isActive: selectedProduct.isActive,
        features: selectedProduct.features.map((f) => f.text),
      });
    } else {
      setSelectedIcon("");
      setFormData({
        icon: "",
        image: "",
        title: "",
        description: "",
        buttonText: "",
        buttonUrl: "",
        order: "0",
        isActive: true,
        features: [""],
      });
    }
  }, [selectedProduct]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const form = e.currentTarget;
      const formElements = form.elements as HTMLFormControlsCollection;
      
      // Get all form values
      const formValues = {
        icon: formData.icon,
        image: formData.image,
        title: (formElements.namedItem('title') as HTMLInputElement).value,
        description: (formElements.namedItem('description') as HTMLTextAreaElement).value,
        features: (formElements.namedItem('features') as HTMLTextAreaElement).value
          .split('\n')
          .filter(f => f.trim()),
        buttonText: (formElements.namedItem('buttonText') as HTMLInputElement).value,
        buttonUrl: (formElements.namedItem('buttonUrl') as HTMLInputElement).value,
        order: parseInt((formElements.namedItem('order') as HTMLInputElement).value) || 0,
        isActive: (formElements.namedItem('isActive') as HTMLInputElement).checked,
      };

      // Validate required fields
      if (!formValues.icon || !formValues.title || !formValues.description) {
        toast({
          title: "Error de validación",
          description: "Por favor, rellena todos los campos requeridos (Icono, Título, Descripción)",
          variant: "destructive",
        });
        return;
      }

      // Prepare data for API
      const productData = {
        ...formValues,
        buttonText: formValues.buttonText || null,
        buttonUrl: formValues.buttonUrl || null,
      };

      // Make API request
      const url = selectedProduct 
        ? `/api/admin/products/${selectedProduct.id}`
        : "/api/admin/products";

      const response = await fetch(url, {
        method: selectedProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${selectedProduct ? "update" : "create"} product`);
      }

      // Show success message
      toast({
        title: "¡Éxito!",
        description: `Producto ${selectedProduct ? "actualizado" : "creado"} con éxito!`,
      });
      
      // Reset form and close dialog
      setIsDialogOpen(false);
      setFormData({
        icon: "",
        image: "",
        title: "",
        description: "",
        buttonText: "",
        buttonUrl: "",
        order: "0",
        isActive: true,
        features: [""],
      });
      
      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error!",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete product");
      }

      toast({
        title: "¡Éxito!",
        description: "Producto eliminado con éxito",
      });
      
      await fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (product: Product, isActive: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, isActive }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update product status");
      }

      toast({
        title: "¡Éxito!",
        description: `Estado del producto actualizado con éxito`,
      });
      
      await fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update product status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold gradient-text">Productos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setSelectedProduct(null)}
              className="bg-[#0ff]/10 text-[#0ff] hover:bg-[#0ff]/20 border border-[#0ff]/50 hover:border-[#0ff]"
            >
              <Icons.Plus className="w-4 h-4 mr-2" />
              Agregar Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="dialog-gradient sm:max-w-[625px] max-h-[90vh] overflow-y-auto p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                {selectedProduct ? "Editar Producto" : "Agregar Producto"}
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">
                {selectedProduct ? "Realiza cambios en tu producto aquí." : "Agrega un nuevo producto a tu landing page."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Columna izquierda */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icono</Label>
                    <IconSelector
                      value={formData.icon}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, icon: value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">

                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="image" className="text-left">
                      Imagen del Producto
                    </Label>
                    <div className="col-span-3">
                      <Input
                        id="image"
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const response = await fetch("/api/upload", {
                                method: "POST",
                                body: formData,
                              });
                              const data = await response.json();
                              setFormData((prev) => ({ ...prev, image: data.url }));
                            } catch (error) {
                              console.error("Error uploading image:", error);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                    {formData.image && (
                      <div className="relative w-[200px] h-[200px] mx-auto mt-4 border rounded-lg overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Vista previa del producto"
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={formData.title}
                      required
                      className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                    />
                  </div>


                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={formData.description}
                      required
                      className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white h-[120px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="features">Características (una por línea)</Label>
                    <Textarea
                      id="features"
                      name="features"
                      defaultValue={formData.features.join("\n")}
                      required
                      className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Texto del botón (opcional)</Label>
                    <Input
                      id="buttonText"
                      name="buttonText"
                      defaultValue={formData.buttonText}
                      className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buttonUrl">URL del botón (opcional)</Label>
                    <Input
                      id="buttonUrl"
                      name="buttonUrl"
                      defaultValue={formData.buttonUrl}
                      className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="order">Orden</Label>
                      <Input
                        id="order"
                        name="order"
                        type="number"
                        defaultValue={formData.order}
                        required
                        className="mt-1 bg-black/50 border-gray-800 focus:border-cyan-500 text-white"
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <Switch
                        id="isActive"
                        name="isActive"
                        defaultChecked={formData.isActive}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({ ...prev, isActive: checked }));
                        }}
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
                      <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {selectedProduct ? "Actualizando..." : "Creando..."}
                    </>
                  ) : (
                    selectedProduct ? "Actualizar" : "Crear"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-[#0ff]/20">
        <DataTable
          data={products}
          columns={[
            {
              header: "Icono",
              accessorKey: "icon",
              cell: (product) => (
                <div className="flex items-center">
                  {product.icon && (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img 
                        src={`/icons/${product.icon}.svg`}
                        alt={product.icon}
                        className="h-6 w-6"
                      />
                    </div>
                  )}
                </div>
              ),
            },
            {
              header: "Imagen",
              accessorKey: "image",
              cell: (product) => (
                product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                ) : (
                  <span>-</span>
                )
              ),
            },
            {
              header: "Título",
              accessorKey: "title",
            },
            {
              header: "Descripción",
              accessorKey: "description",
              cell: (product) => (
                <div className="max-w-[200px] truncate">
                  {product.description}
                </div>
              ),
            },
            {
              header: "Características",
              accessorKey: "features",
              cell: (product) => (
                <div className="max-w-[200px]">
                  {product.features.length} características
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
              cell: (product) => (
                <Switch
                  checked={product.isActive}
                  onCheckedChange={(checked) => handleStatusChange(product, checked)}
                />
              ),
            },
            {
              header: "Acciones",
              accessorKey: "_actions",
              cell: (product) => (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDialogOpen(true);
                    }}
                    className="border-[#0ff]/20 hover:border-[#0ff] hover:bg-[#0ff]/10"
                  >
                    <Icons.Edit className="w-4 h-4 text-[#0ff]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    className="border-[#0ff]/20 hover:border-[#0ff] hover:bg-[#0ff]/10"
                  >
                    <Icons.Trash2 className="w-4 h-4 text-[#0ff]" />
                  </Button>
                </div>
              ),
            },
          ]}
          searchPlaceholder="Buscar productos..."
          itemsPerPage={5}
        />
      </div>
    </div>
    <Toaster />
    </>
  );
}
