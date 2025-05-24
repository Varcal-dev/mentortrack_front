"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  lastName: string
  identification: string
  grade: string
}

export function TeamMembersForm() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: "1", name: "", lastName: "", identification: "", grade: "" },
  ])

  const addMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      lastName: "",
      identification: "",
      grade: "",
    }
    setMembers([...members, newMember])
  }

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((member) => member.id !== id))
    }
  }

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <div key={member.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Integrante {index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)} disabled={members.length === 1}>
              <Trash className="h-4 w-4" />
              <span className="sr-only">Eliminar integrante</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${member.id}`}>Nombres</Label>
              <Input
                id={`name-${member.id}`}
                value={member.name}
                onChange={(e) => updateMember(member.id, "name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`lastName-${member.id}`}>Apellidos</Label>
              <Input
                id={`lastName-${member.id}`}
                value={member.lastName}
                onChange={(e) => updateMember(member.id, "lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`identification-${member.id}`}>Identificación</Label>
              <Input
                id={`identification-${member.id}`}
                value={member.identification}
                onChange={(e) => updateMember(member.id, "identification", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`grade-${member.id}`}>Grado Escolar</Label>
              <Select value={member.grade} onValueChange={(value) => updateMember(member.id, "grade", value)}>
                <SelectTrigger id={`grade-${member.id}`}>
                  <SelectValue placeholder="Selecciona un grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">Sexto</SelectItem>
                  <SelectItem value="7">Séptimo</SelectItem>
                  <SelectItem value="8">Octavo</SelectItem>
                  <SelectItem value="9">Noveno</SelectItem>
                  <SelectItem value="10">Décimo</SelectItem>
                  <SelectItem value="11">Undécimo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addMember}>
        <Plus className="h-4 w-4 mr-2" />
        Agregar Integrante
      </Button>
    </div>
  )
}
