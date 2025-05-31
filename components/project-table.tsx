"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileDown, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

interface ProjectTableProps {
  searchTerm: string;
  filterArea: string;
  filterStatus: string;
  filterInstitution: string;
}

interface Proyecto {
  _id: string;
  titulo: string;
  area: string;
  institucion: {
    _id: string;
    nombre: string;
  };
  estado: string;
  creador: {
    _id: string;
    nombre: string;
    apellido: string;
  };
  createdAt: string;
}

export function ProjectTable({
  searchTerm,
  filterArea,
  filterStatus,
  filterInstitution,
}: ProjectTableProps) {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/proyectos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener proyectos");
        const data = await res.json();

        // Adjust the data here
        const adjustedData = data.map((project: any) => ({
          ...project, // Extract creator's name
        }));

        setProyectos(adjustedData);
      } catch (err) {
        console.error(err);
        setError("Error al cargar proyectos");
      }
    };

    fetchProyectos();
  }, []);

  const handleCambiarEstado = async (id: string, estado: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/proyectos/${id}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ estado }),
        }
      );

      if (res.ok) {
        setProyectos((prev) =>
          prev.map((p) => (p._id === id ? { ...p, estado } : p))
        );
      } else {
        console.error("Error cambiando estado");
      }
    } catch (error) {
      console.error("Error cambiando estado", error);
    }
  };

  const getBadgeVariant = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "activo":
        return "default";
      case "finalizado":
        return "secondary";
      case "inactivo":
        return "destructive";
      case "evaluacion":
        return "default";
      default:
        return "outline";
    }
  };

  // Filtrar proyectos según los criterios
  const filteredProjects = proyectos.filter((proyecto) => {
    const matchesSearch = proyecto.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); // ||      proyecto.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = filterArea === "" || proyecto.area === filterArea;
    const matchesStatus =
      filterStatus === "" || proyecto.estado === filterStatus;
    const matchesInstitution =
      filterInstitution === "" ||
      (proyecto.institucion &&
        proyecto.institucion.nombre === filterInstitution);

    return matchesSearch && matchesArea && matchesStatus && matchesInstitution;
  });

  // Función para obtener el nombre legible del área
  const getAreaName = (area: string) => {
    switch (area) {
      case "ciencias":
        return "Ciencias";
      case "tecnologia":
        return "Tecnología";
      case "matematicas":
        return "Matemáticas";
      case "sociales":
        return "Ciencias Sociales";
      case "artes":
        return "Artes";
      default:
        return area;
    }
  };

  // Función para obtener el nombre legible de la institución
  const getInstitutionName = (institution: string) => {
    switch (institution) {
      case "colegio1":
        return "Colegio San José";
      case "colegio2":
        return "Instituto Técnico";
      case "colegio3":
        return "Liceo Moderno";
      default:
        return institution;
    }
  };

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
            {proyectos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-muted-foreground"
                >
                  {error || "No hay proyectos disponibles"}
                </TableCell>
              </TableRow>
            ) : (
              proyectos.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">
                    {project.titulo}
                  </TableCell>
                  <TableCell>{project.area}</TableCell>
                  <TableCell>
                    {project.institucion ? project.institucion.nombre : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(project.estado)}>
                      {project.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    Prof:{" "}
                    {project.creador.nombre ? project.creador.nombre : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
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
                          <Link
                            href={`/projects/${project._id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/projects/${project._id}/edit`}
                            className="flex items-center cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Cambiar estado
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {[
                              "formulación",
                              "evaluacion",
                              "activo",
                              "finalizado",
                              "inactivo",
                            ].map((estado) => (
                              <DropdownMenuItem
                                key={estado}
                                onClick={() =>
                                  handleCambiarEstado(project._id, estado)
                                }
                              >
                                {estado.charAt(0).toUpperCase() +
                                  estado.slice(1)}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

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
  );
}
