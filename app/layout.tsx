import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { UserProvider } from "./context/UserContext"; // Asegúrate de que la ruta sea correcta
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';


export const metadata: Metadata = {
  title: "Sistema de Gestión de Proyectos Escolares",
  description: "Plataforma para el registro y control de proyectos escolares de investigación",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
           <UserProvider>{children}</UserProvider>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" aria-label={undefined}          />
        </ThemeProvider>
      </body>
    </html>
  )
}
