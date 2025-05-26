"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

/* ---------- Tipos ---------- */
export interface IUser {
  _id: string;
  nombre: string;
  apellido?: string;
  email: string;
  rol: "estudiante" | "docente" | "coordinador";
}

interface IUserContext {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

/* ---------- Contexto ---------- */
const UserContext = createContext<IUserContext | undefined>(undefined);

/* ---------- Provider ---------- */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* Lee storage una sola vez */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  /* login/logout memorizados */
  const login = useCallback((user: IUser, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/login");
  }, [router]);

  /* Mientras carga, evita parpadeo */
  if (loading) return null;

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

/* ---------- Hook seguro ---------- */
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUser debe usarse dentro de un <UserProvider />");
  return ctx;
};
