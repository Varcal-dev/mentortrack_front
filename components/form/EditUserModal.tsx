import { useState, useEffect } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Tipo de usuario (puedes ajustar según tu modelo)
interface User {
  _id: string
  nombre: string
  apellido: string
  email: string
  rol: string
  institucion: string;
  status: "active" | "inactive";
  createdAt: string;
  [key: string]: any // permite otros campos como "grado", "identificacion", etc.
}

// Props del componente
interface EditUserModalProps {
  open: boolean
  onClose: () => void
  user: User
  onUserUpdated: (updatedUser: User) => void
}

export default function EditUserModal({
  open,
  onClose,
  user,
  onUserUpdated,
}: EditUserModalProps) {
  const [formData, setFormData] = useState<User>({ ...user })

  useEffect(() => {
    if (user) {
      setFormData({ ...user })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      onUserUpdated(response.data)
      onClose()
    } catch (error) {
      console.error("Error actualizando usuario:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input name="nombre" value={formData.nombre || ""} onChange={handleChange} />
          </div>
          <div>
            <Label>Apellido</Label>
            <Input name="apellido" value={formData.apellido || ""} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" value={formData.email || ""} onChange={handleChange} />
          </div>
          <div>
            <Label>Rol</Label>
            <Input name="rol" value={formData.rol || ""} onChange={handleChange} />
          </div>
          <div>
            <Label>Institución</Label>
            <Input name="institucion" value={formData.institucion || ""} onChange={handleChange} />
          </div>
          <DialogFooter>
            <Button type="submit">Guardar cambios</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
