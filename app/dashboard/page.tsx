"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/project-list";
import { StatsCards } from "@/components/stats-cards";
import { RecentActivity } from "@/components/recent-activity";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  /* Redirige si no hay sesión */
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user]);

  /* Evita “user is null” */
  if (!user) return null;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button asChild>
          <Link href="/projects/new" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Nuevo Proyecto
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="projects">Mis Proyectos</TabsTrigger>
          <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatsCards />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Proyectos Recientes</CardTitle>
                <CardDescription>
                  Lista de los últimos proyectos en los que has participado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectList limit={5} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas actualizaciones y cambios en tus proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Proyectos</CardTitle>
              <CardDescription>
                Lista completa de proyectos en los que participas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
              <CardDescription>
                Registro completo de actividades y cambios en los proyectos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity extended={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
