"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface ProjectListProps {
  limit?: number
}

export function ProjectList({ limit }: ProjectListProps) {
  // Simulación de datos de proyectos
  const projects = [
    {
      id: "1",
      title: "Impacto de la Contaminación en Ecosistemas Locales",
      area: "Ciencias",
      status: "activo",
      institution: "Colegio San José",
      updatedAt: "2023-05-15",
      teacher: "Prof. María González",
    },
    {
      id: "2",
      title: "Aplicación Móvil para Aprendizaje de Matemáticas",
      area: "Tecnología",
      status: "evaluacion",
      institution: "Instituto Técnico",
      updatedAt: "2023-06-20",
      teacher: "Prof. Juan Pérez",
    },
    {
      id: "3",
      title: "Historia Oral de la Comunidad Local",
      area: "Ciencias Sociales",
      status: "finalizado",
      institution: "Liceo Moderno",
      updatedAt: "2023-04-10",
      teacher: "Prof. Ana Rodríguez",
    },
    {
      id: "4",
      title: "Robótica Educativa para Niños",
      area: "Tecnología",
      status: "activo",
      institution: "Colegio San José",
      updatedAt: "2023-07-05",
      teacher: "Prof. Carlos Martínez",
    },
    {
      id: "5",
      title: "Huerto Escolar Sostenible",
      area: "Ciencias",
      status: "inactivo",
      institution: "Instituto Técnico",
      updatedAt: "2023-03-25",
      teacher: "Prof. Laura Sánchez",
    },
  ]

  const displayProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div className="grid gap-4">
      {displayProjects.map((project) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium line-clamp-1">{project.title}</h3>
                  <Badge
                    variant={
                      project.status === "activo"
                        ? "default"
                        : project.status === "finalizado"
                          ? "success"
                          : project.status === "inactivo"
                            ? "destructive"
                            : project.status === "evaluacion"
                              ? "warning"
                              : "outline"
                    }
                  >
                    {project.status === "activo"
                      ? "Activo"
                      : project.status === "finalizado"
                        ? "Finalizado"
                        : project.status === "inactivo"
                          ? "Inactivo"
                          : project.status === "evaluacion"
                            ? "En Evaluación"
                            : "En Formulación"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {project.area} • {project.institution}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Actualizado: {project.updatedAt}</span>
              </div>
              <div>{project.teacher}</div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export function ProjectListSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
