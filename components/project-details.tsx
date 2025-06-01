import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProjectDetailsProps {
  project: any;
}
export function ProjectDetails({ project }: ProjectDetailsProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

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
              <dd className="text-base">{project.titulo}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Área</dt>
              <dd className="text-base">{project.area}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Institución</dt>
              <dd className="text-base">{project.institucion.nombre}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Docente</dt>
              <dd className="text-base">{project.creador.nombre} {project.creador.apellido}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Fecha de Creación</dt>
              <dd className="text-base">{formatDate(project.createdAt)}</dd>
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
          <p className="text-sm">{project.objetivos ? project.objetivos : "Sin Objetivos establecidos"} </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{project.observaciones}</p>
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
              <p className="text-base">{formatDate(project.fechaInicio)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha de Finalización</p>
              <p className="text-base">{formatDate(project.fechaFin)}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Detalle del Cronograma</p>
            <p className="text-sm whitespace-pre-line">{project.detallesCronograma ? project.detallesCronograma : "Sin Detalles"}</p>
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
            <p className="text-base">{formatCurrency(project.presupuesto)}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Detalle del Presupuesto</p>
            <p className="text-sm whitespace-pre-line">{project.detallesPresupuesto ? project.detallesPresupuesto : "Vacío"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
