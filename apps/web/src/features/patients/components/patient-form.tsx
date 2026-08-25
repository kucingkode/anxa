import { useState } from "react";
import { toast } from "sonner";
import type { NewPatient, Patient, UpdatePatient } from "@simk/contracts";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDER_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { useCreatePatient, useUpdatePatient } from "../hooks/use-patients";

interface PatientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: Patient;
}

export function PatientForm({ open, onOpenChange, patient }: PatientFormProps) {
  const isEdit = Boolean(patient);
  const [name, setName] = useState(patient?.name ?? "");
  const [identifier, setIdentifier] = useState(patient?.identifier ?? "");
  const [gender, setGender] = useState<NewPatient["gender"]>(patient?.gender ?? "male");
  const [birthDate, setBirthDate] = useState(patient?.birthDate ?? "");
  const [phone, setPhone] = useState(patient?.phone ?? "");

  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Pasien diperbarui" : "Pasien ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan pasien"));

    if (isEdit && patient) {
      const payload: UpdatePatient = { name, gender, birthDate: birthDate || undefined, phone: phone || undefined };
      updateMutation.mutate({ id: patient.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewPatient = { name, identifier, gender, birthDate: birthDate || undefined, phone: phone || undefined };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Pasien" : "Tambah Pasien"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui data demografi pasien." : "Daftarkan pasien baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identifier">NIK / IHS</Label>
            <Input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isEdit}
              required={!isEdit}
            />
            {isEdit && <p className="text-xs text-muted-foreground">NIK tidak dapat diubah setelah dibuat.</p>}
          </div>
          <div className="space-y-2">
            <Label>Jenis Kelamin</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as NewPatient["gender"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GENDER_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Tanggal Lahir</Label>
            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
