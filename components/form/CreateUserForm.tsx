// components/UserRegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const traducirRol = (rol: string) => {
  switch (rol) {
    case "student":
      return "estudiante";
    case "teacher":
      return "docente";
    case "coordinator":
      return "coordinador";
    default:
      return rol;
  }
};

interface Props {
  onSuccess?: () => void;
}

export default function UserRegisterForm({ onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    institution: "",
    identification: "",
    grade: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      name,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      institution,
      identification,
      grade,
    } = formData;

    // Construir el payload
    const userData = {
      nombre: name,
      apellido: lastName,
      email,
      password,
      rol: traducirRol(role),
      institucion: institution,
      identificacion: role === "student" ? identification : undefined,
      grado: role === "student" ? grade : undefined,
    };

    // 🔍 Imprimir el JSON antes de enviarlo
    console.log("Datos a enviar:", userData);

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/usuarios/register", {
        nombre: formData.name,
        apellido: formData.lastName,
        email: formData.email,
        password: formData.password,
        rol: traducirRol(formData.role),
        institucion: formData.institution,
      });

      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombres</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellidos</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Select onValueChange={handleRoleChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Estudiante</SelectItem>
            <SelectItem value="teacher">Docente</SelectItem>
            <SelectItem value="coordinator">Coordinador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution">Institución</Label>
        <Input
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
        />
      </div>
      {formData.role === "student" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="identification">Identificación</Label>
            <Input
              id="identification"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grado</Label>
            <Input
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
}
