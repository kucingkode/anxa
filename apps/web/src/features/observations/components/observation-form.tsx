import { useState } from "react";
import { toast } from "sonner";
import type { NewObservation, Observation, UpdateObservation } from "@simk/contracts";
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
import { OBSERVATION_STATUS_LABELS } from "@/lib/labels";
import { getErrorMessage } from "@/lib/errors";
import { useCreateObservation, useUpdateObservation } from "../hooks/use-observations";

interface ObservationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  visitId: string;
  observation?: Observation;
}

export function ObservationForm({ open, onOpenChange, patientId, visitId, observation }: ObservationFormProps) {
  const isEdit = Boolean(observation);
  const [code, setCode] = useState(observation?.code ?? "");
  const [codeDisplay, setCodeDisplay] = useState(observation?.codeDisplay ?? "");
  const [value, setValue] = useState(observation?.value !== undefined ? String(observation.value) : "");
  const [unit, setUnit] = useState(observation?.unit ?? "");
  const [interpretation, setInterpretation] = useState(observation?.interpretation ?? "");
  const [status, setStatus] = useState<NewObservation["status"]>(observation?.status ?? "preliminary");

  const createMutation = useCreateObservation();
  const updateMutation = useUpdateObservation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Observasi diperbarui" : "Observasi ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan observasi"));

    if (isEdit && observation) {
      const payload: UpdateObservation = {
        value: Number(value),
        unit: unit || undefined,
        codeDisplay: codeDisplay || undefined,
        interpretation: interpretation || undefined,
      };
      updateMutation.mutate({ id: observation.id, version: observation.version, payload }, { onSuccess, onError });
    } else {
      const payload: NewObservation = {
        patientId,
        visitId,
        code,
        codeDisplay: codeDisplay || undefined,
        value: Number(value),
        unit: unit || undefined,
        status,
        interpretation: interpretation || undefined,
      };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Observasi" : "Tambah Observasi"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui nilai pengukuran klinis." : "Catat hasil pengukuran klinis pasien."}
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
              placeholder="LOINC / SNOMED"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codeDisplay">Nama Tampilan</Label>
            <Input id="codeDisplay" value={codeDisplay} onChange={(e) => setCodeDisplay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Nilai</Label>
            <Input
              id="value"
              type="number"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Satuan</Label>
            <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="mmHg, mg/dL" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interpretation">Interpretasi</Label>
            <Input
              id="interpretation"
              value={interpretation}
              onChange={(e) => setInterpretation(e.target.value)}
              placeholder="normal, abnormal"
            />
          </div>
          {!isEdit && (
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as NewObservation["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(OBSERVATION_STATUS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
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
