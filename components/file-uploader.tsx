"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, X, AlertCircle } from "lucide-react"

interface FileUploaderProps {
  accept: string
  maxFiles: number
  maxSize: number // in MB
}

interface UploadedFile {
  id: string
  name: string
  size: number
  progress: number
  error?: string
}

export function FileUploader({ accept, maxFiles, maxSize }: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Validar número máximo de archivos
    if (files.length + selectedFiles.length > maxFiles) {
      setError(`No puedes subir más de ${maxFiles} archivos`)
      return
    }

    setError(null)

    // Procesar cada archivo
    Array.from(selectedFiles).forEach((file) => {
      // Validar tamaño del archivo
      if (file.size > maxSize * 1024 * 1024) {
        setFiles((prev) => [
          ...prev,
          {
            id: Date.now().toString() + file.name,
            name: file.name,
            size: file.size,
            progress: 100,
            error: `El archivo excede el tamaño máximo de ${maxSize}MB`,
          },
        ])
        return
      }

      // Agregar archivo a la lista con progreso simulado
      const newFile: UploadedFile = {
        id: Date.now().toString() + file.name,
        name: file.name,
        size: file.size,
        progress: 0,
      }

      setFiles((prev) => [...prev, newFile])

      // Simular progreso de carga
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20)
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
        }

        setFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, progress } : f)))
      }, 300)
    })

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium mb-1">Arrastra archivos aquí o haz clic para seleccionar</p>
        <p className="text-xs text-muted-foreground">
          Máximo {maxFiles} archivos, {maxSize}MB cada uno
        </p>
        <input type="file" ref={fileInputRef} className="hidden" accept={accept} multiple onChange={handleFileChange} />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm font-medium truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(file.id)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>

              <div className="space-y-1">
                <Progress value={file.progress} className="h-2" />
                {file.error ? (
                  <p className="text-xs text-destructive">{file.error}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {file.progress < 100 ? `Subiendo... ${file.progress}%` : "Completado"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
