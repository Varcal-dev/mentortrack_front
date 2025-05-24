"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Pencil, Trash, Lock } from "lucide-react"
import Link from "next/link"

interface UserTableProps {
  searchTerm: string
  filterRole: string
  filterInstitution: string
}

export function UserTable({ searchTerm, filterRole, filterInstitution }: UserTableProps) {
  // Simulación de datos de usuarios
  const users = [
    {
      id: "1",
      name: "María González",
      email: "maria@ejemplo.com",
      role: "teacher",
      institution: "colegio1",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      role: "teacher",
      institution: "colegio2",
      status: "active",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Ana Rodríguez",
      email: "ana@ejemplo.com",
      role: "teacher",
      institution: "colegio3",
      status: "active",
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "Carlos Martínez",
      email: "carlos@ejemplo.com",
      role: "coordinator",
      institution: "colegio1",
      status: "active",
      createdAt: "2023-01-05",
    },
    {
      id: "5",
      name: "Laura Sánchez",
      email: "laura@ejemplo.com",
      role: "student",
      institution: "colegio2",
      status: "inactive",
      createdAt: "2023-04-25",
    },
    {
      id: "6",
      name: "Pedro Gómez",
      email: "pedro@ejemplo.com",
      role: "student",
      institution: "colegio1",
      status: "active",
      createdAt: "2023-05-12",
    },
    {
      id: "7",
      name: "Sofía Torres",
      email: "sofia@ejemplo.com",
      role: "student",
      institution: "colegio3",
      status: "active",
      createdAt: "2023-06-08",
    },
  ]

  // Filtrar usuarios según los criterios
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "" || user.role === filterRole
    const matchesInstitution = filterInstitution === "" || user.institution === filterInstitution

    return matchesSearch && matchesRole && matchesInstitution
  })

  // Función para obtener el nombre legible del rol
  const getRoleName = (role: string) => {
    switch (role) {
      case "student":
        return "Estudiante"
      case "teacher":
        return "Docente"
      case "coordinator":
        return "Coordinador"
      default:
        return role
    }
  }

  // Función para obtener el nombre legible de la institución
  const getInstitutionName = (institution: string) => {
    switch (institution) {
      case "colegio1":
        return "Colegio San José"
      case "colegio2":
        return "Instituto Técnico"
      case "colegio3":
        return "Liceo Moderno"
      default:
        return institution
    }
  }

  return (
    <Card>
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
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No se encontraron usuarios con los criterios seleccionados
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleName(user.role)}</TableCell>
                  <TableCell>{getInstitutionName(user.institution)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
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
    </Card>
  )
}
