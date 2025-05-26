"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  FileText,
  FolderKanban,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext"; // ajusta la ruta si es necesario

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, label, icon, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start gap-2"
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const { logout } = useUser();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/projects",
      label: "Proyectos",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      href: "/reports",
      label: "Reportes",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/users",
      label: "Usuarios",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/settings",
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                <FileText className="h-6 w-6" />
                <span>Sistema de Proyectos</span>
              </Link>
              <div className="my-4 h-[1px] w-full bg-border" />
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={isActive(item.href)}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <FileText className="h-6 w-6" />
          <span className="hidden md:inline-block">Sistema de Proyectos</span>
        </Link>
        <div className="flex flex-1 items-center gap-4 md:gap-2 lg:gap-4 justify-end">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.href)}
              />
            ))}
            <div className="my-2 h-[1px] w-full bg-border" />
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </Button>
          </nav>
        </aside>
        <main className="flex-1 bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
