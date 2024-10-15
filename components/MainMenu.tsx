"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart2, Settings, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MainMenu() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/estadisticas', icon: BarChart2, label: 'Estadísticas' },
    { href: '/reservaciones', icon: Calendar, label: 'Reservaciones' },
    { href: '/configuracion', icon: Settings, label: 'Configuración' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 p-2 flex flex-col items-center space-y-4 h-screen shadow-lg">
      <div className="bg-red-600 text-white p-2 rounded-full mb-4">
        <Users className="h-6 w-6" />
      </div>
      <TooltipProvider>
        {menuItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  pathname === item.href
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
}