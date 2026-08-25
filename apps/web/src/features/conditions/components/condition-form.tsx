import { useState } from "react";
import { toast } from "sonner";
import type { Condition, NewCondition, UpdateCondition } from "@simk/contracts";
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
import { useCreateCondition, useUpdateCondition } from "../hooks/use-conditions";

interface ConditionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  visitId: string;
  condition?: Condition;
}

export function ConditionForm({ open, onOpenChange, patientId, visitId, condition }: ConditionFormProps) {
  const isEdit = Boolean(condition);
  const [code, setCode] = useState(condition?.code ?? "");
  const [codeDisplay, setCodeDisplay] = useState(condition?.codeDisplay ?? "");
  const [clinicalStatus, setClinicalStatus] = useState(condition?.clinicalStatus ?? "");
  const [notes, setNotes] = useState(condition?.notes ?? "");

  const createMutation = useCreateCondition();
  const updateMutation = useUpdateCondition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Kondisi diperbarui" : "Kondisi ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan kondisi"));

    if (isEdit && condition) {
      const payload: UpdateCondition = {
        codeDisplay: codeDisplay || undefined,
        clinicalStatus: clinicalStatus || undefined,
        notes: notes || undefined,
      };
      updateMutation.mutate({ id: condition.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewCondition = {
        patientId,
        visitId,
        code,
        codeDisplay: codeDisplay || undefined,
        clinicalStatus: clinicalStatus || undefined,
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
          <DialogTitle>{isEdit ? "Edit Kondisi" : "Tambah Kondisi"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui diagnosis pasien." : "Catat diagnosis baru untuk pasien."}
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
            <Label htmlFor="codeDisplay">Nama Diagnosis</Label>
            <Input id="codeDisplay" value={codeDisplay} onChange={(e) => setCodeDisplay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clinicalStatus">Status Klinis</Label>
            <Input
              id="clinicalStatus"
              value={clinicalStatus}
              onChange={(e) => setClinicalStatus(e.target.value)}
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
