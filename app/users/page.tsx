"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import UserRegisterForm from "@/components/form/CreateUserForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import UserTable from "@/components/user-table";
import axios from "axios";
import DeleteUserModal from "@/components/form/DeleteUserModal";
import EditUserModal from "@/components/form/EditUserModal";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  institucion: string;
  status: "active" | "inactive";
  createdAt: string;
  [key: string]: any;
}

interface UserTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all"); // Updated default value
  const [filterInstitution, setFilterInstitution] = useState("all"); // Updated default value
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<User[]>("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      }
    };

    fetchUsers();
  }, []);

  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/users/${userToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    } catch (err) {
      console.error("Error eliminando usuario:", err);
    } finally {
      closeDeleteModal();
    }
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  // Función para abrir el modal de edición
  const openEditModal = (user: User) => {
    setUserToEdit(user);
    setEditModalOpen(true);
  };

  // Función para actualizar el usuario en la lista
  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = (user.nombre ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.rol === filterRole;
    const matchesInstitution =
      filterInstitution === "all" || user.institucion === filterInstitution;

    return matchesSearch && matchesRole && matchesInstitution;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Nuevo Usuario
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
                <SelectItem value="all">Todos los roles</SelectItem>{" "}
                {/* Updated value prop */}
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="docente">Docente</SelectItem>
                <SelectItem value="coordinador">Coordinador</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterInstitution}
              onValueChange={setFilterInstitution}
            >
              <SelectTrigger>
                <SelectValue placeholder="Institución" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las instituciones</SelectItem>{" "}
                {/* Updated value prop */}
                <SelectItem value="colegio1">Colegio San José</SelectItem>
                <SelectItem value="colegio2">Instituto Técnico</SelectItem>
                <SelectItem value="colegio3">Liceo Moderno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <UserTable
        users={users}
        onDeleteClick={openDeleteModal} // ya lo tenías
        onEditClick={openEditModal} // <-- este es nuevo
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrar nuevo usuario</DialogTitle>
            <DialogDescription>
              Llena los datos para crear un nuevo usuario en el sistema.
            </DialogDescription>
          </DialogHeader>
          <UserRegisterForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <DeleteUserModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.nombre ?? ""}
      />

      {userToEdit && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={userToEdit}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
}
function setUsers(data: any) {
  throw new Error("Function not implemented.");
}
