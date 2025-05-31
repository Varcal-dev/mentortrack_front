import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface Estudiante {
  _id: string;
  nombre: string;
  apellido: string;
  identificacion: string;
  institucion: string;
  grado: string;
}

type TeamMembersFormProps = {
  onSeleccionChange: (equipoSeleccionado: Estudiante[]) => void;
};

const TeamMembersForm: React.FC<TeamMembersFormProps> = ({
  onSeleccionChange,
}) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [seleccionados, setSeleccionados] = useState<Estudiante[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/usuarios/estudiantes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          console.error(
            "Error fetching estudiantes:",
            response.status,
            response.statusText
          );
          setEstudiantes([]);
          setErrorMessage(
            `Error al obtener estudiantes: ${response.status} ${response.statusText}`
          );
          return;
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEstudiantes(data);
          setErrorMessage(null);
        } else {
          console.error("Data is not an array:", data);
          setEstudiantes([]);
          setErrorMessage("Error: Data inválida recibida del servidor.");
        }
      } catch (error) {
        console.error("Error fetching estudiantes", error);
        setErrorMessage("Error al conectar con el servidor.");
      }
    };
    fetchEstudiantes();
  }, []);

  useEffect(() => {
    onSeleccionChange(seleccionados);
    setInputValue(seleccionados.map((e) => e.nombre).join(", "));
  }, [seleccionados]);

  const toggleSeleccion = (estudiante: Estudiante) => {
    setSeleccionados((prev) =>
      prev.some((e) => e._id === estudiante._id)
        ? prev.filter((e) => e._id !== estudiante._id)
        : [...prev, estudiante]
    );
  };

  return (
    <div>
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Input
            ref={inputRef}
            value={inputValue}
            placeholder="Seleccione miembros del equipo..."
            className="w-[300px]"
            onClick={() => setOpen(true)}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Miembros del equipo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {estudiantes.map((estudiante) => (
            <DropdownMenuCheckboxItem
              key={estudiante._id}
              checked={seleccionados.some((e) => e._id === estudiante._id)}
              onCheckedChange={() => toggleSeleccion(estudiante)}
            >
              {estudiante.nombre} {estudiante.apellido}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TeamMembersForm;
