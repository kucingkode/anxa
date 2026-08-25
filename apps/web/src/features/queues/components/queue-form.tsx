import { useState } from "react";
import { toast } from "sonner";
import type { NewQueue } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/lib/errors";
import { usePatients } from "@/features/patients/hooks/use-patients";
import { useCreateQueue } from "../hooks/use-queues";

interface QueueFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QueueForm({ open, onOpenChange }: QueueFormProps) {
  const [patientId, setPatientId] = useState<string>("");

  const { data: patients } = usePatients();
  const createMutation = useCreateQueue();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;
    const payload: NewQueue = { patientId };
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Antrean ditambahkan");
        setPatientId("");
        onOpenChange(false);
      },
      onError: (error) => toast.error(getErrorMessage(error, "Gagal menambah antrean")),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Antrean</DialogTitle>
          <DialogDescription>Tambahkan pasien ke dalam antrean layanan.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Pasien</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih pasien" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createMutation.isPending || !patientId}>
              {createMutation.isPending ? "Menyimpan…" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
