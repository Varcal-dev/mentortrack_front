import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectTeamProps {
  project: any
}

export function ProjectTeam({ project }: ProjectTeamProps) {

 return (
    <div className="grid gap-4">
      {/* Docente Responsable */}
      <Card>
        <CardHeader>
          <CardTitle>Docente Responsable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt={project.creador.nombre} />
              <AvatarFallback>
                {project.creador.nombre.charAt(0).toUpperCase()}
                {project.creador.apellido?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {project.creador.nombre} {project.creador.apellido}
              </p>
              <p className="text-sm text-muted-foreground">Docente</p>
              <p className="text-sm text-muted-foreground">{project.creador.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estudiantes */}
      <Card>
        <CardHeader>
          <CardTitle>Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {project.integrantes && project.integrantes.length > 0 ? (
              project.integrantes.map((estudiante: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={estudiante.nombre} />
                    <AvatarFallback>
                      {estudiante.nombre.charAt(0).toUpperCase()}
                      {estudiante.apellido?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {estudiante.nombre} {estudiante.apellido}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <p className="text-sm text-muted-foreground">
                        Grado: {estudiante.grado}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {estudiante.identificacion}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No hay estudiantes asignados</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
