"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Download, Search } from "lucide-react"

interface ProjectFilesProps {
  projectId: string
}

export function ProjectFiles({ projectId }: ProjectFilesProps) {
  const [searchDocs, setSearchDocs] = useState("")
  const [searchImages, setSearchImages] = useState("")

  // Simulación de datos de archivos
  const documents = [
    {
      id: "d1",
      name: "informe_inicial.pdf",
      type: "pdf",
      size: "2.4 MB",
      date: "2023-07-15",
      milestone: "Recolección de datos inicial",
    },
    {
      id: "d2",
      name: "metodologia.docx",
      type: "docx",
      size: "1.8 MB",
      date: "2023-07-15",
      milestone: "Recolección de datos inicial",
    },
    {
      id: "d3",
      name: "resultados_analisis.pdf",
      type: "pdf",
      size: "3.2 MB",
      date: "2023-08-20",
      milestone: "Análisis de muestras",
    },
    {
      id: "d4",
      name: "datos_laboratorio.xlsx",
      type: "xlsx",
      size: "1.5 MB",
      date: "2023-08-20",
      milestone: "Análisis de muestras",
    },
    { id: "d5", name: "bibliografia.pdf", type: "pdf", size: "0.8 MB", date: "2023-06-10", milestone: "Planificación" },
  ]

  const images = [
    {
      id: "i1",
      name: "muestra_agua.jpg",
      size: "1.2 MB",
      date: "2023-07-15",
      milestone: "Recolección de datos inicial",
    },
    {
      id: "i2",
      name: "ecosistema_rio.jpg",
      size: "1.8 MB",
      date: "2023-07-15",
      milestone: "Recolección de datos inicial",
    },
    {
      id: "i3",
      name: "equipo_trabajo.jpg",
      size: "2.1 MB",
      date: "2023-07-15",
      milestone: "Recolección de datos inicial",
    },
    { id: "i4", name: "laboratorio.jpg", size: "1.5 MB", date: "2023-08-20", milestone: "Análisis de muestras" },
    {
      id: "i5",
      name: "analisis_microscopio.jpg",
      size: "1.3 MB",
      date: "2023-08-20",
      milestone: "Análisis de muestras",
    },
  ]

  // Filtrar documentos según la búsqueda
  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchDocs.toLowerCase()) ||
      doc.milestone.toLowerCase().includes(searchDocs.toLowerCase()),
  )

  // Filtrar imágenes según la búsqueda
  const filteredImages = images.filter(
    (img) =>
      img.name.toLowerCase().includes(searchImages.toLowerCase()) ||
      img.milestone.toLowerCase().includes(searchImages.toLowerCase()),
  )

  return (
    <Tabs defaultValue="documents" className="space-y-4">
      <TabsList>
        <TabsTrigger value="documents">Documentos</TabsTrigger>
        <TabsTrigger value="images">Fotografías</TabsTrigger>
      </TabsList>

      <TabsContent value="documents">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchDocs}
              onChange={(e) => setSearchDocs(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-3 text-sm font-medium border-b bg-muted">
              <div className="col-span-5">Nombre</div>
              <div className="col-span-3">Avance</div>
              <div className="col-span-2">Fecha</div>
              <div className="col-span-1">Tamaño</div>
              <div className="col-span-1"></div>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No se encontraron documentos</div>
            ) : (
              <div className="divide-y">
                {filteredDocs.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 p-3 text-sm items-center">
                    <div className="col-span-5 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <div className="col-span-3 truncate">{doc.milestone}</div>
                    <div className="col-span-2">{doc.date}</div>
                    <div className="col-span-1">{doc.size}</div>
                    <div className="col-span-1 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="images">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar fotografías..."
              value={searchImages}
              onChange={(e) => setSearchImages(e.target.value)}
              className="flex-1"
            />
          </div>

          {filteredImages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground border rounded-md">No se encontraron fotografías</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div key={img.id} className="border rounded-md overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <p className="text-sm font-medium truncate">{img.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{img.milestone}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{img.date}</span>
                      <span>{img.size}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-1">
                      <Download className="h-3 w-3 mr-1" /> Descargar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
