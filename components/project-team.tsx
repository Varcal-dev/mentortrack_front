import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectTeamProps {
  projectId: string
}

export function ProjectTeam({ projectId }: ProjectTeamProps) {
  // Simulación de datos del equipo
  const teacher = {
    id: "t1",
    name: "María González",
    role: "Docente",
    email: "maria@ejemplo.com",
    avatar: "/placeholder-user.jpg",
    initials: "MG",
  }

  const students = [
    {
      id: "s1",
      name: "Pedro Gómez",
      grade: "Décimo",
      identification: "1098765432",
      avatar: "/placeholder-user.jpg",
      initials: "PG",
    },
    {
      id: "s2",
      name: "Sofía Torres",
      grade: "Décimo",
      identification: "1087654321",
      avatar: "/placeholder-user.jpg",
      initials: "ST",
    },
    {
      id: "s3",
      name: "Daniel Ramírez",
      grade: "Undécimo",
      identification: "1076543210",
      avatar: "/placeholder-user.jpg",
      initials: "DR",
    },
  ]

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Docente Responsable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
              <AvatarFallback>{teacher.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{teacher.name}</p>
              <p className="text-sm text-muted-foreground">{teacher.role}</p>
              <p className="text-sm text-muted-foreground">{teacher.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-3 rounded-lg border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>{student.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <p className="text-sm text-muted-foreground">Grado: {student.grade}</p>
                    <p className="text-sm text-muted-foreground">ID: {student.identification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
