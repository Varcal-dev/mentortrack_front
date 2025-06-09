"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"


export default function NewMilestonePage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
  titulo: "",
  fecha: "",
  descripcion: "",
  documentos: [] as File[],
  fotos: [] as File[],
})

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const data = new FormData();
    data.append("proyecto", params.id);
    data.append("fecha", formData.fecha);
    data.append("descripcion", formData.descripcion);

    formData.documentos.forEach((file) => {
      data.append("documentos", file);
    });

    formData.fotos.forEach((file) => {
      data.append("fotos", file);
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avances`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    if (!res.ok) throw new Error("Error al guardar el avance");

    router.push(`/projects/${params.id}`);
  } catch (error) {
    console.error(error);
    alert("Hubo un error al guardar el avance.");
  } finally {
    setIsLoading(false);
  }
};

  

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/projects/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Nuevo Avance</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Registrar Avance del Proyecto</CardTitle>
            <CardDescription>Documenta el progreso y las evidencias del proyecto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Avance</Label>
              <Input
  id="title"
  placeholder="Ej: Recolección de datos inicial"
  required
  value={formData.titulo}
  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
  id="date"
  type="date"
  required
  value={formData.fecha}
  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
  id="description"
  required
  className="min-h-[150px]"
  value={formData.descripcion}
  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
/>
            </div>

            <div className="space-y-2">
              <Label>Documentos</Label>
              <FileUploader accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" maxFiles={5} maxSize={5} />
              <p className="text-xs text-muted-foreground">
                Formatos aceptados: PDF, Word, Excel, PowerPoint. Máximo 5 archivos, 5MB cada uno.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Fotografías</Label>
              <FileUploader accept=".jpg,.jpeg,.png" maxFiles={10} maxSize={2} />
              <p className="text-xs text-muted-foreground">
                Formatos aceptados: JPG, JPEG, PNG. Máximo 10 imágenes, 2MB cada una.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push(`/projects/${params.id}`)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-1">
              <Save className="h-4 w-4" />
              {isLoading ? "Guardando..." : "Guardar Avance"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
