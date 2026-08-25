import { useState } from "react";
import { toast } from "sonner";
import type { NewProcedure, Procedure, UpdateProcedure } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/errors";
import { useCreateProcedure, useUpdateProcedure } from "../hooks/use-procedures";

interface ProcedureFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  visitId: string;
  procedure?: Procedure;
}

function toLocalInput(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function ProcedureForm({ open, onOpenChange, patientId, visitId, procedure }: ProcedureFormProps) {
  const isEdit = Boolean(procedure);
  const [code, setCode] = useState(procedure?.code ?? "");
  const [codeDisplay, setCodeDisplay] = useState(procedure?.codeDisplay ?? "");
  const [status, setStatus] = useState(procedure?.status ?? "");
  const [performedAt, setPerformedAt] = useState(toLocalInput(procedure?.performedAt));
  const [notes, setNotes] = useState(procedure?.notes ?? "");

  const createMutation = useCreateProcedure();
  const updateMutation = useUpdateProcedure();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Tindakan diperbarui" : "Tindakan ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan tindakan"));

    const performedAtIso = performedAt ? new Date(performedAt).toISOString() : undefined;

    if (isEdit && procedure) {
      const payload: UpdateProcedure = {
        codeDisplay: codeDisplay || undefined,
        status: status || undefined,
        performedAt: performedAtIso,
        notes: notes || undefined,
      };
      updateMutation.mutate({ id: procedure.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewProcedure = {
        patientId,
        visitId,
        code,
        codeDisplay: codeDisplay || undefined,
        status: status || undefined,
        performedAt: performedAtIso,
        notes: notes || undefined,
      };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Tindakan" : "Tambah Tindakan"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui tindakan yang dilakukan." : "Catat tindakan baru yang dilakukan."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isEdit}
              required={!isEdit}
            />
            {isEdit && <p className="text-xs text-muted-foreground">Kode tidak dapat diubah setelah dibuat.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="codeDisplay">Nama Tindakan</Label>
            <Input id="codeDisplay" value={codeDisplay} onChange={(e) => setCodeDisplay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="performedAt">Waktu Pelaksanaan</Label>
            <Input
              id="performedAt"
              type="datetime-local"
              value={performedAt}
              onChange={(e) => setPerformedAt(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan…" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
