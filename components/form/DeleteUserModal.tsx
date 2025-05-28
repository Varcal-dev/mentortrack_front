// components/DeleteUserModal.tsx

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteUserModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

export default function DeleteUserModal({ open, onClose, onConfirm, userName }: DeleteUserModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar usuario</DialogTitle>
        </DialogHeader>
        <p>¿Estás seguro que deseas eliminar al usuario <strong>{userName}</strong>? Esta acción no se puede deshacer.</p>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
