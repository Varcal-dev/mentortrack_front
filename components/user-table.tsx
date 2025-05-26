import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreHorizontal, Eye, Pencil, Trash, Lock } from "lucide-react"

interface User {
  id: string
  nombre: string
  email: string
  rol: string
  institucion: string
  status: "active" | "inactive"
  createdAt: string
}

interface Props {
  users: User[]
}

export default function UserTable({ users }: Props) {
  const getRoleName = (role: string) => {
    switch (role) {
      case "student": return "Estudiante"
      case "teacher": return "Docente"
      case "coordinator": return "Coordinador"
      default: return role
    }
  }

  const getInstitutionName = (institution: string) => {
    return institution // Puedes adaptar si tienes una lista de instituciones
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Institución</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No se encontraron usuarios con los criterios seleccionados
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.nombre}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleName(user.rol)}</TableCell>
                <TableCell>{getInstitutionName(user.institucion)}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "destructive"}>
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/users/${user.id}`} className="flex items-center cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver detalles</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/users/${user.id}/edit`} className="flex items-center cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center cursor-pointer">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Restablecer contraseña</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center text-destructive cursor-pointer">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
