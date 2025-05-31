import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";

interface Estudiante {
  _id: string;
  nombre: string;
  apellido: string;
  identificacion: string;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          console.error("Error fetching estudiantes:", response.status, response.statusText);
          setEstudiantes([]);
          setErrorMessage(`Error al obtener estudiantes: ${response.status} ${response.statusText}`);
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
  }, [seleccionados]);

  const toggleSeleccion = (estudiante: Estudiante) => {
    setSeleccionados((prev) =>
      prev.some((e) => e._id === estudiante._id)
        ? prev.filter((e) => e._id !== estudiante._id)
        : [...prev, estudiante]
    );
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      {estudiantes.map((estudiante) => (
        <div key={estudiante._id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={seleccionados.some((e) => e._id === estudiante._id)}
            onChange={() => toggleSeleccion(estudiante)}
          />
          <span>
            {estudiante.nombre} {estudiante.apellido} - {estudiante.grado}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TeamMembersForm;
