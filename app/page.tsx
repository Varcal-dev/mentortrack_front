import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, ClipboardList, FileText, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Sistema de Gestión de Proyectos Escolares</h1>
          <p className="mt-2">Plataforma para el registro y control de proyectos de investigación</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Bienvenido al Sistema de Gestión de Proyectos</h2>
          <p className="mb-4">
            Esta plataforma permite a estudiantes, docentes y coordinadores registrar y dar seguimiento a proyectos
            escolares de investigación, facilitando la documentación de avances, hitos y evidencias asociadas.
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
                Creación y gestión de cuentas para estudiantes, docentes y coordinadores.
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
                Creación y gestión de proyectos escolares con toda la información necesaria.
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
                Registro de hitos, avances y evidencias para cada proyecto escolar.
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
                Generación de reportes en PDF y búsqueda avanzada de proyectos.
              </CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sistema de Gestión de Proyectos Escolares
        </div>
      </footer>
    </div>
  )
}
