"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileDown, Eye, Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface ProjectTableProps {
  searchTerm: string
  filterArea: string
  filterStatus: string
  filterInstitution: string
}

export function ProjectTable({ searchTerm, filterArea, filterStatus, filterInstitution }: ProjectTableProps) {
  // Simulación de datos de proyectos
  const projects = [
    {
      id: "1",
      title: "Impacto de la Contaminación en Ecosistemas Locales",
      area: "ciencias",
      status: "activo",
      institution: "colegio1",
      createdAt: "2023-05-15",
      teacher: "Prof. María González",
    },
    {
      id: "2",
      title: "Aplicación Móvil para Aprendizaje de Matemáticas",
      area: "tecnologia",
      status: "evaluacion",
      institution: "colegio2",
      createdAt: "2023-06-20",
      teacher: "Prof. Juan Pérez",
    },
    {
      id: "3",
      title: "Historia Oral de la Comunidad Local",
      area: "sociales",
      status: "finalizado",
      institution: "colegio3",
      createdAt: "2023-04-10",
      teacher: "Prof. Ana Rodríguez",
    },
    {
      id: "4",
      title: "Robótica Educativa para Niños",
      area: "tecnologia",
      status: "activo",
      institution: "colegio1",
      createdAt: "2023-07-05",
      teacher: "Prof. Carlos Martínez",
    },
    {
      id: "5",
      title: "Huerto Escolar Sostenible",
      area: "ciencias",
      status: "inactivo",
      institution: "colegio2",
      createdAt: "2023-03-25",
      teacher: "Prof. Laura Sánchez",
    },
  ]

  // Filtrar proyectos según los criterios
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = filterArea === "" || project.area === filterArea
    const matchesStatus = filterStatus === "" || project.status === filterStatus
    const matchesInstitution = filterInstitution === "" || project.institution === filterInstitution

    return matchesSearch && matchesArea && matchesStatus && matchesInstitution
  })

  // Función para obtener el nombre legible del área
  const getAreaName = (area: string) => {
    switch (area) {
      case "ciencias":
        return "Ciencias"
      case "tecnologia":
        return "Tecnología"
      case "matematicas":
        return "Matemáticas"
      case "sociales":
        return "Ciencias Sociales"
      case "artes":
        return "Artes"
      default:
        return area
    }
  }

  // Función para obtener el nombre legible de la institución
  const getInstitutionName = (institution: string) => {
    switch (institution) {
      case "colegio1":
        return "Colegio San José"
      case "colegio2":
        return "Instituto Técnico"
      case "colegio3":
        return "Liceo Moderno"
      default:
        return institution
    }
  }

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Institución</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Docente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No se encontraron proyectos con los criterios seleccionados
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{getAreaName(project.area)}</TableCell>
                  <TableCell>{getInstitutionName(project.institution)}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{project.teacher}</TableCell>
                  <TableCell>{project.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project.id}`} className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project.id}/edit`} className="flex items-center cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center cursor-pointer">
                          <FileDown className="mr-2 h-4 w-4" />
                          <span>Exportar PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-destructive cursor-pointer">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
