import { useState } from "react";
import { toast } from "sonner";
import type { Manufacturer, NewManufacturer, UpdateManufacturer } from "@simk/contracts";
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
import { useCreateManufacturer, useUpdateManufacturer } from "../hooks/use-manufacturers";

interface ManufacturerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manufacturer?: Manufacturer;
}

export function ManufacturerForm({ open, onOpenChange, manufacturer }: ManufacturerFormProps) {
  const isEdit = Boolean(manufacturer);
  const [name, setName] = useState(manufacturer?.name ?? "");
  const [identifier, setIdentifier] = useState(manufacturer?.identifier ?? "");
  const [contact, setContact] = useState(manufacturer?.contact ?? "");

  const createMutation = useCreateManufacturer();
  const updateMutation = useUpdateManufacturer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Manufaktur diperbarui" : "Manufaktur ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan manufaktur"));

    if (isEdit && manufacturer) {
      const payload: UpdateManufacturer = { name, identifier, contact: contact || undefined };
      updateMutation.mutate({ id: manufacturer.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewManufacturer = { name, identifier, contact: contact || undefined };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Manufaktur" : "Tambah Manufaktur"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui data manufaktur." : "Daftarkan manufaktur baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identifier">Identifier</Label>
            <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Kontak</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Telepon / email / alamat (opsional)"
            />
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
