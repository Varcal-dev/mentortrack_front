"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TeamMembersForm from "@/components/form/TeamMembersForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

interface Estudiante {
  _id: string;
  nombre: string;
  apellido: string;
  identificacion: string;
  grado: string;
}

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: "",
    area: "",
    institucion: "",
    objetivos: "",
    observaciones: "",
    cronograma: "",
    presupuesto: "",
    integrantes: [] as Estudiante[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear proyecto");

      const data = await response.json();
      toast.success("Proyecto creado exitosamente");
      router.push("/projects");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear el proyecto");
    } finally {
      setIsLoading(false);
    }
  };

  const [equipo, setEquipo] = useState([]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Proyecto</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Información Básica</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="schedule">Cronograma</TabsTrigger>
            <TabsTrigger value="budget">Presupuesto</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Información del Proyecto</CardTitle>
                <CardDescription>
                  Ingresa los datos básicos del proyecto de investigación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Proyecto</Label>
                  <Input
                    id="title"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    placeholder="Ingresa el título del proyecto"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Área</Label>
                    <Select required>
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Selecciona un área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ciencias">Ciencias</SelectItem>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="matematicas">Matemáticas</SelectItem>
                        <SelectItem value="sociales">
                          Ciencias Sociales
                        </SelectItem>
                        <SelectItem value="artes">Artes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institución</Label>
                    <Select required>
                      <SelectTrigger id="institution">
                        <SelectValue placeholder="Selecciona una institución" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colegio1">
                          Colegio San José
                        </SelectItem>
                        <SelectItem value="colegio2">
                          Instituto Técnico
                        </SelectItem>
                        <SelectItem value="colegio3">Liceo Moderno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Objetivos</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objetivos}
                    onChange={(e) =>
                      setFormData({ ...formData, objetivos: e.target.value })
                    }
                    placeholder="Describe los objetivos del proyecto"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">
                    Observaciones Adicionales
                  </Label>
                  <Textarea
                    id="observations"
                    value={formData.observaciones}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        observaciones: e.target.value,
                      })
                    }
                    placeholder="Agrega cualquier observación relevante"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Integrantes del Equipo</CardTitle>
                <CardDescription>
                  Agrega los estudiantes que participarán en el proyecto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamMembersForm
                  onSeleccionChange={(equipoSeleccionado: Estudiante[]) =>
                    setFormData((prev) => ({
                      ...prev,
                      integrantes: equipoSeleccionado,
                    }))
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma</CardTitle>
                <CardDescription>
                  Define las actividades y fechas del proyecto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de Inicio</Label>
                  <Input
                    id="start-date"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de Finalización</Label>
                  <Input id="end-date" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule-details">
                    Detalle del Cronograma
                  </Label>
                  <Textarea
                    id="schedule-details"
                    placeholder="Describe las actividades y fechas importantes"
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Presupuesto</CardTitle>
                <CardDescription>
                  Detalla los recursos necesarios para el proyecto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="total-budget">Presupuesto Total</Label>
                  <Input
                    id="total-budget"
                    value={formData.presupuesto}
                    onChange={(e) =>
                      setFormData({ ...formData, presupuesto: e.target.value })
                    }
                    type="number"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget-details">
                    Detalle del Presupuesto
                  </Label>
                  <Textarea
                    id="budget-details"
                    placeholder="Describe los recursos y costos asociados"
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/projects")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-1">
            <Save className="h-4 w-4" />
            {isLoading ? "Guardando..." : "Guardar Proyecto"}
          </Button>
        </div>
      </form>
    </div>
  );
}
