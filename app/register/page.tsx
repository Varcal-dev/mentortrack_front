"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

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

export default function RegisterPage() {
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
    setIsLoading(true);

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

    // Validar campos requeridos
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (!name || !lastName || !email || !role || !institution) {
      alert("Por favor, completa todos los campos requeridos");
      setIsLoading(false);
      return;
    }

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

    try {
      await axios.post("http://localhost:5000/api/usuarios/register", {
        nombre: name,
        apellido: lastName,
        email,
        password,
        rol: traducirRol(role),
        institucion: institution,
        identificacion: formData.identification || undefined,
        grado: formData.grade || undefined,
      });

      alert("Usuario registrado correctamente");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      alert(
        "Error al registrar usuario: " +
          (error.response?.data?.message || "Error desconocido")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>
            Completa el formulario para registrarte en el sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Iniciar Sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
