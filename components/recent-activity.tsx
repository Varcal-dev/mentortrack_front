import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface RecentActivityProps {
  extended?: boolean
}

export function RecentActivity({ extended = false }: RecentActivityProps) {
  // Simulación de datos de actividad reciente
  const activities = [
    {
      id: "1",
      user: {
        name: "María González",
        avatar: "/placeholder-user.jpg",
        initials: "MG",
      },
      action: "agregó un nuevo avance",
      project: "Impacto de la Contaminación en Ecosistemas Locales",
      projectId: "1",
      timestamp: "Hace 2 horas",
    },
    {
      id: "2",
      user: {
        name: "Juan Pérez",
        avatar: "/placeholder-user.jpg",
        initials: "JP",
      },
      action: "cambió el estado a 'En Evaluación'",
      project: "Aplicación Móvil para Aprendizaje de Matemáticas",
      projectId: "2",
      timestamp: "Hace 5 horas",
    },
    {
      id: "3",
      user: {
        name: "Ana Rodríguez",
        avatar: "/placeholder-user.jpg",
        initials: "AR",
      },
      action: "subió un nuevo documento",
      project: "Historia Oral de la Comunidad Local",
      projectId: "3",
      timestamp: "Ayer",
    },
    {
      id: "4",
      user: {
        name: "Carlos Martínez",
        avatar: "/placeholder-user.jpg",
        initials: "CM",
      },
      action: "agregó un nuevo miembro al equipo",
      project: "Robótica Educativa para Niños",
      projectId: "4",
      timestamp: "Hace 2 días",
    },
    {
      id: "5",
      user: {
        name: "Laura Sánchez",
        avatar: "/placeholder-user.jpg",
        initials: "LS",
      },
      action: "creó un nuevo proyecto",
      project: "Huerto Escolar Sostenible",
      projectId: "5",
      timestamp: "Hace 3 días",
    },
  ]

  const displayActivities = extended ? activities : activities.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action} en{" "}
              <span className="font-medium">{activity.project}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecentActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
