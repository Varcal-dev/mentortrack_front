"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectStatusHistoryProps {
  projectId: string
  currentStatus: string
  onStatusChange: (status: string) => void
}

export function ProjectStatusHistory({ projectId, currentStatus, onStatusChange }: ProjectStatusHistoryProps) {
  const [newStatus, setNewStatus] = useState("")
  const [observation, setObservation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulación de datos de historial de estado
  const statusHistory = [
    {
      id: "s1",
      status: "activo",
      date: "2023-07-01",
      observation: "El proyecto ha sido aprobado y comienza su ejecución.",
      user: {
        name: "Carlos Martínez",
        role: "Coordinador",
        avatar: "/placeholder-user.jpg",
        initials: "CM",
      },
    },
    {
      id: "s2",
      status: "evaluacion",
      date: "2023-06-15",
      observation: "El proyecto está siendo evaluado por el comité académico.",
      user: {
        name: "Carlos Martínez",
        role: "Coordinador",
        avatar: "/placeholder-user.jpg",
        initials: "CM",
      },
    },
    {
      id: "s3",
      status: "formulacion",
      date: "2023-05-15",
      observation: "Proyecto registrado en el sistema.",
      user: {
        name: "María González",
        role: "Docente",
        avatar: "/placeholder-user.jpg",
        initials: "MG",
      },
    },
  ]

  const handleSubmit = () => {
    if (!newStatus || !observation) return

    setIsSubmitting(true)

    // Simulación de cambio de estado
    setTimeout(() => {
      onStatusChange(newStatus)
      setNewStatus("")
      setObservation("")
      setIsSubmitting(false)
    }, 1000)
  }

  // Función para obtener el nombre legible del estado
  const getStatusName = (status: string) => {
    switch (status) {
      case "formulacion":
        return "En Formulación"
      case "evaluacion":
        return "En Evaluación"
      case "activo":
        return "Activo"
      case "inactivo":
        return "Inactivo"
      case "finalizado":
        return "Finalizado"
      default:
        return status
    }
  }

  // Función para obtener la variante de la badge según el estado
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "activo":
        return "default"
      case "finalizado":
        return "success"
      case "inactivo":
        return "destructive"
      case "evaluacion":
        return "warning"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Cambiar Estado del Proyecto</h4>
              <Badge variant={getStatusVariant(currentStatus)}>{getStatusName(currentStatus)}</Badge>
            </div>

            <div className="grid gap-4">
              <div>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un nuevo estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formulacion">En Formulación</SelectItem>
                    <SelectItem value="evaluacion">En Evaluación</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Textarea
                  placeholder="Ingresa una observación sobre el cambio de estado"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleSubmit} disabled={!newStatus || !observation || isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar Cambio"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Historial de Cambios de Estado</h4>

        {statusHistory.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No hay cambios de estado registrados</div>
        ) : (
          <div className="space-y-4">
            {statusHistory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                      <AvatarFallback>{item.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium">{item.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.user.role} • {item.date}
                          </p>
                        </div>
                        <Badge variant={getStatusVariant(item.status)}>{getStatusName(item.status)}</Badge>
                      </div>
                      <p className="text-sm">{item.observation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
