import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, ImageIcon, Download, Eye } from "lucide-react"
import Link from "next/link"

interface ProjectMilestonesProps {
  project: any
}

export function ProjectMilestones({ project }: ProjectMilestonesProps) {
  // Simulación de datos de avances
  const milestones = [
    {
      id: "m1",
      title: "Recolección de datos inicial",
      date: "2023-07-15",
      description:
        "Se realizó la primera fase de recolección de datos en el río local. Se tomaron muestras de agua y se documentó la flora y fauna presente en el ecosistema.",
      user: {
        name: "María González",
        avatar: "/placeholder-user.jpg",
        initials: "MG",
      },
      files: [
        { id: "f1", name: "informe_inicial.pdf", type: "document" },
        { id: "f2", name: "metodologia.docx", type: "document" },
      ],
      images: [
        { id: "i1", name: "muestra_agua.jpg" },
        { id: "i2", name: "ecosistema_rio.jpg" },
        { id: "i3", name: "equipo_trabajo.jpg" },
      ],
    },
    {
      id: "m2",
      title: "Análisis de muestras",
      date: "2023-08-20",
      description:
        "Se realizó el análisis de las muestras recolectadas en el laboratorio. Se identificaron varios contaminantes y se midieron sus niveles de concentración.",
      user: {
        name: "Pedro Gómez",
        avatar: "/placeholder-user.jpg",
        initials: "PG",
      },
      files: [
        { id: "f3", name: "resultados_analisis.pdf", type: "document" },
        { id: "f4", name: "datos_laboratorio.xlsx", type: "document" },
      ],
      images: [
        { id: "i4", name: "laboratorio.jpg" },
        { id: "i5", name: "analisis_microscopio.jpg" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {milestones.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No hay avances registrados para este proyecto</div>
      ) : (
        milestones.map((milestone) => (
          <Card key={milestone.id} className="overflow-hidden">
            <div className="bg-muted p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={milestone.user.avatar || "/placeholder.svg"} alt={milestone.user.name} />
                  <AvatarFallback>{milestone.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{milestone.user.name}</span>
                    <span>•</span>
                    <span>{milestone.date}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/projects/${project}/milestones/${milestone.id}`}>
                  <Eye className="h-4 w-4 mr-2" /> Ver Detalle
                </Link>
              </Button>
            </div>
            <CardContent className="p-4">
              <p className="text-sm mb-4">{milestone.description}</p>

              {(milestone.files.length > 0 || milestone.images.length > 0) && (
                <div className="space-y-3">
                  {milestone.files.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Documentos</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {milestone.files.map((file) => (
                          <div key={file.id} className="flex items-center gap-2 p-2 border rounded-md">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm flex-1 truncate">{file.name}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Descargar</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {milestone.images.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Fotografías</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {milestone.images.map((image) => (
                          <div
                            key={image.id}
                            className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1">
                              <p className="text-xs truncate text-center">{image.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
