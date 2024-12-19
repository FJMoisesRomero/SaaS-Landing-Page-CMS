import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import { BarChart3, Image, MessageSquare, HelpCircle } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [slideCount, productCount, testimonialCount, faqCount] = await Promise.all([
    prisma.slide.count(),
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.question.count(),
  ]);

  const stats = [
    {
      title: "Total de Diapositivas",
      value: slideCount,
      icon: Image,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total de Productos",
      value: productCount,
      icon: BarChart3,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total de Testimonios",
      value: testimonialCount,
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total de Preguntas Frecuentes",
      value: faqCount,
      icon: HelpCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-indigo-950 border-indigo-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Acciones Rápidas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Agregar Nueva Diapositiva",
              href: "/admin/slides/new",
              color: "bg-blue-600 hover:bg-blue-700",
            },
            {
              title: "Agregar Nuevo Producto",
              href: "/admin/products/new",
              color: "bg-green-600 hover:bg-green-700",
            },
            {
              title: "Agregar Nuevo Testimonio",
              href: "/admin/testimonials/new",
              color: "bg-purple-600 hover:bg-purple-700",
            },
            {
              title: "Agregar Nuevo Pregunta Frecuente",
              href: "/admin/faq/new",
              color: "bg-yellow-600 hover:bg-yellow-700",
            },
          ].map((action) => (
            <a
              key={action.title}
              href={action.href}
              className={`${action.color} px-4 py-2 rounded-lg text-white font-medium text-sm text-center transition-colors`}
            >
              {action.title}
            </a>
          ))}
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
        <Card className="bg-indigo-950 border-indigo-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-indigo-900/50"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      Nueva diapositiva agregada: "Bienvenido a nuestra plataforma"
                    </p>
                    <p className="text-xs text-gray-500">Hace 2 horas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
