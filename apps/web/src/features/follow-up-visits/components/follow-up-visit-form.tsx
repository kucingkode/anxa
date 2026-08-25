import { useState } from "react";
import { toast } from "sonner";
import type { NewFollowUpVisit } from "@simk/contracts";
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
import { useCreateFollowUpVisit } from "../hooks/use-follow-up-visits";

interface FollowUpVisitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
}

export function FollowUpVisitForm({ open, onOpenChange, patientId }: FollowUpVisitFormProps) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const createMutation = useCreateFollowUpVisit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    const payload: NewFollowUpVisit = {
      patientId,
      date: new Date(date).toISOString(),
      reason: reason || undefined,
    };
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Kunjungan lanjutan ditambahkan");
        setDate("");
        setReason("");
        onOpenChange(false);
      },
      onError: (error) => toast.error(getErrorMessage(error, "Gagal menambah kunjungan lanjutan")),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kunjungan Lanjutan</DialogTitle>
          <DialogDescription>Jadwalkan kunjungan lanjutan untuk pasien.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Alasan</Label>
            <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createMutation.isPending || !date}>
              {createMutation.isPending ? "Menyimpan…" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
