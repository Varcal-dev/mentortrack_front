"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectTable } from "@/components/project-table"
import { Plus, Search, FileDown } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArea, setFilterArea] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterInstitution, setFilterInstitution] = useState("all")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
        <div className="flex gap-2">
          {/*
          <Button variant="outline" className="gap-1">
            <FileDown className="h-4 w-4" /> Exportar PDF
          </Button>*/}
          <Button asChild>
            <Link href="/projects/new" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Nuevo Proyecto
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar y Filtrar Proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <Select value={filterArea} onValueChange={setFilterArea}>
              <SelectTrigger>
                <SelectValue placeholder="Área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las áreas</SelectItem>
                <SelectItem value="ciencias">Ciencias</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="matematicas">Matemáticas</SelectItem>
                <SelectItem value="sociales">Ciencias Sociales</SelectItem>
                <SelectItem value="artes">Artes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="formulacion">Formulación</SelectItem>
                <SelectItem value="evaluacion">Evaluación</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterInstitution} onValueChange={setFilterInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Institución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las instituciones</SelectItem>
                <SelectItem value="colegio1">Colegio San José</SelectItem>
                <SelectItem value="colegio2">Instituto Técnico</SelectItem>
                <SelectItem value="colegio3">Liceo Moderno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <ProjectTable
        searchTerm={searchTerm}
        filterArea={filterArea}
        filterStatus={filterStatus}
        filterInstitution={filterInstitution}
      />
    </div>
  )
}
