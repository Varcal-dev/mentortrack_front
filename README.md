# MentorTrack

**Plataforma inteligente para el seguimiento y gestión de proyectos escolares de investigación**

MentorTrack es una aplicación web moderna desarrollada con Next.js que permite a estudiantes, docentes y coordinadores registrar, gestionar y dar seguimiento integral a proyectos escolares de investigación de manera eficiente y organizada.

## 🚀 Características Principales

### Gestión de Usuarios
- **Registro y autenticación** de estudiantes, docentes y coordinadores
- **Control de acceso basado en roles** con permisos específicos
- **Gestión completa de usuarios** por parte de coordinadores

### Gestión de Proyectos
- **Creación de proyectos** con información detallada:
  - Título, área de conocimiento, objetivos
  - Cronograma y presupuesto
  - Institución educativa
  - Integrantes del equipo con datos completos
  - Observaciones adicionales

### Seguimiento y Documentación
- **Registro de avances y hitos** con fechas y descripciones
- **Carga de evidencias** (documentos y fotografías)
- **Historial completo** de actividades del proyecto
- **Cambios de estado** con observaciones (Formulación, Evaluación, Activo, Inactivo, Finalizado)

### Visualización y Reportes
- **Dashboard interactivo** con estadísticas y métricas
- **Lista completa de proyectos** con filtros avanzados
- **Búsqueda por múltiples criterios** (área, estado, institución, docente)
- **Generación de reportes en PDF**
- **Vista detallada** de cada proyecto con toda su información

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Iconos**: Lucide React
- **Temas**: next-themes (modo claro/oscuro)

## 📋 Requisitos del Sistema

### Funcionales
- **RF-01**: Creación de cuentas para estudiantes, docentes y coordinadores
- **RF-02**: Inicio y cierre de sesión seguro
- **RF-03**: Gestión de usuarios (crear, editar, eliminar) por coordinadores
- **RF-04**: Creación de proyectos escolares por docentes
- **RF-05**: Registro completo de información del proyecto
- **RF-06**: Registro de hitos y avances
- **RF-07**: Documentación con evidencias (archivos y fotografías)
- **RF-08**: Cambio de estado del proyecto por coordinadores
- **RF-09**: Consulta de estado actual e histórico
- **RF-10**: Generación de reportes en PDF
- **RF-11**: Búsqueda de proyectos por criterios diversos
- **RF-12**: Listado por institución o docente

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/mentortrack.git
cd mentortrack
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

5. **Abrir en el navegador**
Visita \`http://localhost:3000\` para ver la aplicación.

## 📁 Estructura del Proyecto

\`\`\`
mentortrack/
├── app/                    # Rutas y páginas (App Router)
│   ├── dashboard/         # Dashboard principal
│   ├── projects/          # Gestión de proyectos
│   ├── users/             # Gestión de usuarios
│   ├── login/             # Autenticación
│   └── register/          # Registro de usuarios
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base de shadcn/ui
│   ├── dashboard-layout.tsx
│   ├── project-*.tsx     # Componentes específicos de proyectos
│   └── theme-provider.tsx
├── lib/                  # Utilidades y configuraciones
└── public/              # Archivos estáticos
\`\`\`

## 👥 Roles de Usuario

### Estudiante
- Ver proyectos en los que participa
- Registrar avances y subir evidencias
- Consultar estado de proyectos

### Docente
- Crear y gestionar proyectos
- Agregar estudiantes a proyectos
- Registrar avances y evidencias
- Ver reportes de sus proyectos

### Coordinador
- Gestión completa de usuarios
- Cambiar estados de proyectos
- Acceso a todos los proyectos
- Generar reportes institucionales

## 🎨 Características de UI/UX

- **Diseño responsivo** que funciona en dispositivos móviles y desktop
- **Modo claro/oscuro** con cambio automático según preferencias del sistema
- **Interfaz intuitiva** con navegación clara y accesible
- **Componentes modernos** con animaciones suaves
- **Accesibilidad** siguiendo las mejores prácticas web

## 🔧 Scripts Disponibles

\`\`\`bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar versión de producción
npm run lint         # Ejecutar linter
npm run type-check   # Verificar tipos de TypeScript
\`\`\`

## 📈 Próximas Características

- [ ] Integración con base de datos
- [ ] Autenticación real con NextAuth.js
- [ ] Notificaciones en tiempo real
- [ ] API REST completa
- [ ] Exportación avanzada de reportes
- [ ] Sistema de comentarios en proyectos
- [ ] Calendario de actividades
- [ ] Integración con sistemas educativos

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu característica (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: soporte@mentortrack.com
- 📖 Documentación: [docs.mentortrack.com](https://docs.mentortrack.com)
- 🐛 Reportar bugs: [GitHub Issues](https://github.com/tu-usuario/mentortrack/issues)

---

**MentorTrack** - Transformando la gestión de proyectos escolares de investigación 🎓✨
