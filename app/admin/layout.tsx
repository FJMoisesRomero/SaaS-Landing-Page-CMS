"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  LogOut,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Productos",
    href: "/admin/products",
    icon: Settings,
  },
  {
    title: "Slides",
    href: "/admin/slides",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-[#080318]">
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-[#0c0324] text-gray-300 flex flex-col justify-between p-4 border-r border-[#1a0b2e]">
            <div>
              <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">A</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Administración</span>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400"
                          : "hover:bg-[#1a0b2e] text-gray-400 hover:text-cyan-400"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1a0b2e] hover:text-cyan-400 transition-colors">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64">
            {/* Header */}
            <header className="h-16 bg-[#0c0324]/50 border-b border-[#1a0b2e] backdrop-blur-sm flex items-center justify-between px-6">
              <h1 className="text-xl font-semibold text-white">
                {menuItems.find((item) => item.href === pathname)?.title || "Panel de Administración"}
              </h1>
            </header>

            {/* Main Content Area */}
            <main className="p-6 bg-[#080318] min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
