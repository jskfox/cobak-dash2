import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { MainMenu } from '@/components/MainMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HamburgerMenu } from '@/components/HamburgerMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard de Clientes',
  description: 'Dashboard para mostrar información de clientes importantes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
            <MainMenu />
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <HamburgerMenu />
                  <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 ml-4">Dashboard de Clientes</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <Breadcrumb />
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}