import { useState } from "react";
import { toast } from "sonner";
import type { ConditionReference, NewConditionReference, UpdateConditionReference } from "@simk/contracts";
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
import { getErrorMessage } from "@/lib/errors";
import { useCreateConditionReference, useUpdateConditionReference } from "../hooks/use-condition-references";

interface ConditionReferenceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reference?: ConditionReference;
}

export function ConditionReferenceForm({ open, onOpenChange, reference }: ConditionReferenceFormProps) {
  const isEdit = Boolean(reference);
  const [code, setCode] = useState(reference?.code ?? "");
  const [display, setDisplay] = useState(reference?.display ?? "");

  const createMutation = useCreateConditionReference();
  const updateMutation = useUpdateConditionReference();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Referensi kondisi diperbarui" : "Referensi kondisi ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan referensi kondisi"));

    if (isEdit && reference) {
      const payload: UpdateConditionReference = { code, display };
      updateMutation.mutate({ id: reference.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewConditionReference = { code, display };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Referensi Kondisi" : "Tambah Referensi Kondisi"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui referensi diagnosis." : "Daftarkan referensi diagnosis baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode</Label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display">Nama</Label>
            <Input id="display" value={display} onChange={(e) => setDisplay(e.target.value)} required />
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
