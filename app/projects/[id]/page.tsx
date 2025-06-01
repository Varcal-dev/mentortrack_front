"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProjectDetails } from "@/components/project-details";
import { ProjectTeam } from "@/components/project-team";
import { ProjectMilestones } from "@/components/project-milestones";
import { ProjectFiles } from "@/components/project-files";
import { ProjectStatusHistory } from "@/components/project-status-history";
import { ArrowLeft, FileDown, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectPage({ params }: { params: { id: string } }) {
  //const [currentStatus, setCurrentStatus] = useState("activo")
  const [project, setProject] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/proyectos/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener proyecto");

        const data = await res.json();
        setProject(data);
        console.log("Datos: ", data);
        setCurrentStatus(data.estado.toLowerCase()); // Asegúrate de que el estado sea minúscula
      } catch (error) {
        console.error(error);
        router.push("/projects"); // Redirigir si no existe el proyecto
      }
    };

    fetchProject();
  }, [params.id, router]);

  if (!project) {
    return <div className="p-8">Cargando proyecto...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {project.titulo}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{project.area}</span>
              <span>•</span>
              <span>{project.institucion.nombre}</span>
              <span>•</span>
              <Badge
                variant={
                  currentStatus === "activo"
                    ? "default"
                    : currentStatus === "finalizado"
                    ? "success"
                    : currentStatus === "inactivo"
                    ? "destructive"
                    : currentStatus === "evaluacion"
                    ? "warning"
                    : currentStatus === "en_formulacion"
                    ? "outline"
                    : "secondary"
                }
              >
                {{
                  activo: "Activo",
                  finalizado: "Finalizado",
                  inactivo: "Inactivo",
                  evaluacion: "En Evaluación",
                  en_formulacion: "En Formulación",
                }[currentStatus] || "Desconocido"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-1">
            <FileDown className="h-4 w-4" /> Exportar PDF
          </Button>
          <Button variant="outline" className="gap-1" asChild>
            <Link href={`/projects/${params.id}/edit`}>
              <Pencil className="h-4 w-4" /> Editar
            </Link>
          </Button>
          <Button className="gap-1" asChild>
            <Link href={`/projects/${params.id}/milestones/new`}>
              <Plus className="h-4 w-4" /> Nuevo Avance
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="team">Equipo</TabsTrigger>
          <TabsTrigger value="milestones">Avances</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
          <TabsTrigger value="status">Historial de Estado</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          {project && <ProjectDetails project={project} />}
        </TabsContent>

        <TabsContent value="team">
          {project && <ProjectTeam project={project} />}
        </TabsContent>

        <TabsContent value="milestones">
          {project && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Avances del Proyecto</CardTitle>
                  <CardDescription>
                    Registro de hitos y progreso del proyecto
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href={`/projects/${project._id}/milestones/new`}>
                    <Plus className="h-4 w-4 mr-2" /> Nuevo Avance
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <ProjectMilestones project={project} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="files">
          {project && (
            <Card>
              <CardHeader>
                <CardTitle>Archivos y Evidencias</CardTitle>
                <CardDescription>
                  Documentos y fotografías asociadas al proyecto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectFiles project={project} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Estado</CardTitle>
              <CardDescription>
                Cambios de estado del proyecto y observaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectStatusHistory
                projectId={params.id}
                currentStatus={currentStatus}
                onStatusChange={setCurrentStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
