"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserTable } from "@/components/user-table"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all") // Updated default value
  const [filterInstitution, setFilterInstitution] = useState("all") // Updated default value

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <Button asChild>
          <Link href="/users/new" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Nuevo Usuario
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar y Filtrar Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem> {/* Updated value prop */}
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="teacher">Docente</SelectItem>
                <SelectItem value="coordinator">Coordinador</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterInstitution} onValueChange={setFilterInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Institución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las instituciones</SelectItem> {/* Updated value prop */}
                <SelectItem value="colegio1">Colegio San José</SelectItem>
                <SelectItem value="colegio2">Instituto Técnico</SelectItem>
                <SelectItem value="colegio3">Liceo Moderno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <UserTable searchTerm={searchTerm} filterRole={filterRole} filterInstitution={filterInstitution} />
    </div>
  )
}
