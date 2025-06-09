import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, ClipboardList, FileText, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">MentorTrack</h1>
          <p className="mt-2">
            Plataforma inteligente para el seguimiento y gestión de proyectos escolares de investigación
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Bienvenido a MentorTrack</h2>
          <p className="mb-4">
            MentorTrack es una plataforma innovadora que permite a estudiantes, docentes y coordinadores registrar y dar
            seguimiento integral a proyectos escolares de investigación, facilitando la documentación de avances, hitos
            y evidencias asociadas de manera eficiente y organizada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild size="lg" className="gap-2">
              <Link href="/login">
                Iniciar Sesión <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Gestión de Usuarios</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Administración completa de cuentas para estudiantes, docentes y coordinadores con roles específicos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Proyectos</CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Creación y gestión integral de proyectos escolares con seguimiento detallado de cada etapa.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Seguimiento</CardTitle>
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Registro detallado de hitos, avances y evidencias con documentación multimedia completa.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Reportes</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Generación automática de reportes en PDF y herramientas de búsqueda avanzada de proyectos.
              </CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MentorTrack - Sistema de Gestión de Proyectos Escolares
        </div>
      </footer>
    </div>
  )
}
