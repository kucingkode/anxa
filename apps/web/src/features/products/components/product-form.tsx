import { useState } from "react";
import { toast } from "sonner";
import type { NewProduct, Product, UpdateProduct } from "@simk/contracts";
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
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/errors";
import { useManufacturers } from "@/features/manufacturers/hooks/use-manufacturers";
import { useCreateProduct, useUpdateProduct } from "../hooks/use-products";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
}

export function ProductForm({ open, onOpenChange, product }: ProductFormProps) {
  const isEdit = Boolean(product);
  const [name, setName] = useState(product?.name ?? "");
  const [code, setCode] = useState(product?.code ?? "");
  const [unit, setUnit] = useState(product?.unit ?? "");
  const [manufacturerId, setManufacturerId] = useState(product?.manufacturerId ?? "");
  const [description, setDescription] = useState(product?.description ?? "");

  const { data: manufacturers } = useManufacturers();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Produk diperbarui" : "Produk ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan produk"));

    if (isEdit && product) {
      const payload: UpdateProduct = {
        name,
        code,
        unit,
        manufacturerId,
        description: description || undefined,
      };
      updateMutation.mutate({ id: product.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewProduct = {
        name,
        code,
        unit,
        manufacturerId,
        description: description || undefined,
      };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui data produk." : "Daftarkan produk baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Kode</Label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Satuan</Label>
            <Input
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="mis. tablet, strip, box"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Manufaktur</Label>
            <Select value={manufacturerId} onValueChange={setManufacturerId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih manufaktur" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers?.map((manufacturer) => (
                  <SelectItem key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi produk (opsional)"
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
