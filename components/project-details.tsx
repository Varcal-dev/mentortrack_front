import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProjectDetailsProps {
  projectId: string
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  // Simulación de datos del proyecto
  const project = {
    id: projectId,
    title: "Impacto de la Contaminación en Ecosistemas Locales",
    area: "Ciencias",
    institution: "Colegio San José",
    status: "activo",
    createdAt: "2023-05-15",
    teacher: "Prof. María González",
    objectives:
      "Analizar el impacto de la contaminación en los ecosistemas locales, identificar las principales fuentes de contaminación en la zona y proponer soluciones sostenibles para mitigar sus efectos negativos.",
    startDate: "2023-06-01",
    endDate: "2023-11-30",
    schedule:
      "Fase 1 (Junio-Julio): Investigación bibliográfica y diseño metodológico.\nFase 2 (Agosto-Septiembre): Trabajo de campo y recolección de datos.\nFase 3 (Octubre): Análisis de resultados.\nFase 4 (Noviembre): Elaboración de conclusiones y propuestas.",
    budget: "1,500,000",
    budgetDetails:
      "Equipos de medición: $500,000\nMateriales de laboratorio: $300,000\nTransporte para trabajo de campo: $400,000\nMateriales de oficina: $100,000\nImprevistos: $200,000",
    observations:
      "El proyecto cuenta con el apoyo del departamento de ciencias ambientales de la universidad local. Se realizarán visitas a tres ecosistemas diferentes: río, bosque y zona urbana.",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Información General</CardTitle>
          <CardDescription>Detalles básicos del proyecto de investigación</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Título</dt>
              <dd className="text-base">{project.title}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Área</dt>
              <dd className="text-base">{project.area}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Institución</dt>
              <dd className="text-base">{project.institution}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Docente</dt>
              <dd className="text-base">{project.teacher}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Fecha de Creación</dt>
              <dd className="text-base">{project.createdAt}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Estado</dt>
              <dd className="text-base">
                {project.status === "activo"
                  ? "Activo"
                  : project.status === "finalizado"
                    ? "Finalizado"
                    : project.status === "inactivo"
                      ? "Inactivo"
                      : project.status === "evaluacion"
                        ? "En Evaluación"
                        : "En Formulación"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objetivos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{project.objectives}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{project.observations}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha de Inicio</p>
              <p className="text-base">{project.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha de Finalización</p>
              <p className="text-base">{project.endDate}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Detalle del Cronograma</p>
            <p className="text-sm whitespace-pre-line">{project.schedule}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Presupuesto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Presupuesto Total</p>
            <p className="text-base">${project.budget}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Detalle del Presupuesto</p>
            <p className="text-sm whitespace-pre-line">{project.budgetDetails}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
