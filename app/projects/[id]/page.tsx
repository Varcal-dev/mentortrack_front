"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProjectDetails } from "@/components/project-details"
import { ProjectTeam } from "@/components/project-team"
import { ProjectMilestones } from "@/components/project-milestones"
import { ProjectFiles } from "@/components/project-files"
import { ProjectStatusHistory } from "@/components/project-status-history"
import { ArrowLeft, FileDown, Pencil, Plus } from "lucide-react"
import Link from "next/link"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [currentStatus, setCurrentStatus] = useState("activo")

  // Simulación de datos del proyecto
  const project = {
    id: params.id,
    title: "Impacto de la Contaminación en Ecosistemas Locales",
    area: "Ciencias",
    institution: "Colegio San José",
    status: currentStatus,
    createdAt: "2023-05-15",
    teacher: "Prof. María González",
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
            <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{project.area}</span>
              <span>•</span>
              <span>{project.institution}</span>
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
                          : "outline"
                }
              >
                {currentStatus === "activo"
                  ? "Activo"
                  : currentStatus === "finalizado"
                    ? "Finalizado"
                    : currentStatus === "inactivo"
                      ? "Inactivo"
                      : currentStatus === "evaluacion"
                        ? "En Evaluación"
                        : "En Formulación"}
              </Badge>
            </div>
          </div>
        </div>

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
          <ProjectDetails projectId={params.id} />
        </TabsContent>

        <TabsContent value="team">
          <ProjectTeam projectId={params.id} />
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Avances del Proyecto</CardTitle>
                <CardDescription>Registro de hitos y progreso del proyecto</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/projects/${params.id}/milestones/new`}>
                  <Plus className="h-4 w-4 mr-2" /> Nuevo Avance
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ProjectMilestones projectId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Archivos y Evidencias</CardTitle>
              <CardDescription>Documentos y fotografías asociadas al proyecto</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectFiles projectId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Estado</CardTitle>
              <CardDescription>Cambios de estado del proyecto y observaciones</CardDescription>
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
  )
}
