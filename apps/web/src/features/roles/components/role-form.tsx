import { useState } from "react";
import { toast } from "sonner";
import type { NewRole, Role, UpdateRole } from "@simk/contracts";
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
import { useCreateRole, useUpdateRole } from "../hooks/use-roles";

const RESOURCES = [
  "patients",
  "queues",
  "visits",
  "follow-up-visits",
  "observations",
  "conditions",
  "procedures",
  "products",
  "manufacturers",
  "users",
  "condition-references",
  "procedure-references",
  "roles",
] as const;

const ACTIONS = ["read", "write", "delete"] as const;

interface RoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role;
}

export function RoleForm({ open, onOpenChange, role }: RoleFormProps) {
  const isEdit = Boolean(role);
  const isSystem = role?.isSystem ?? false;
  const [name, setName] = useState(role?.name ?? "");
  const [description, setDescription] = useState(role?.description ?? "");
  const [permissions, setPermissions] = useState<string[]>(role?.permissions ?? []);

  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const togglePermission = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      toast.success(isEdit ? "Peran diperbarui" : "Peran ditambahkan");
      onOpenChange(false);
    };
    const onError = (error: unknown) => toast.error(getErrorMessage(error, "Gagal menyimpan peran"));

    if (isEdit && role) {
      const payload: UpdateRole = isSystem
        ? { description: description || undefined }
        : { name, description: description || undefined, permissions };
      updateMutation.mutate({ id: role.id, payload }, { onSuccess, onError });
    } else {
      const payload: NewRole = { name, description: description || undefined, permissions };
      createMutation.mutate(payload, { onSuccess, onError });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Peran" : "Tambah Peran"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui peran dan izin aksesnya." : "Buat peran baru dengan izin akses."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Nama</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSystem}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-description">Deskripsi</Label>
            <Textarea
              id="role-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opsional"
            />
          </div>
          <div className="space-y-3">
            <Label>Izin</Label>
            <div className="space-y-3">
              {RESOURCES.map((resource) => (
                <div key={resource} className="rounded-md border p-3">
                  <div className="mb-2 text-sm font-medium">{resource}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {ACTIONS.map((action) => {
                      const permission = `${resource}:${action}`;
                      const id = `perm-${resource}-${action}`;
                      return (
                        <label key={action} htmlFor={id} className="flex items-center gap-1.5 text-sm">
                          <input
                            id={id}
                            type="checkbox"
                            checked={permissions.includes(permission)}
                            onChange={() => togglePermission(permission)}
                            disabled={isSystem}
                            className="h-4 w-4"
                          />
                          {action}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {isSystem && (
              <p className="text-sm text-muted-foreground">
                Nama dan izin peran sistem tidak dapat diubah.
              </p>
            )}
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
