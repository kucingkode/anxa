import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Role } from "@simk/contracts";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getErrorMessage } from "@/lib/errors";
import { hasPermission } from "@/lib/permissions";
import { useAuth } from "@/lib/auth";
import { useDeleteRole, useRoles } from "../hooks/use-roles";
import { RoleForm } from "./role-form";

const MAX_PERMISSION_BADGES = 3;

function PermissionBadges({ permissions }: { permissions: string[] }) {
  const visible = permissions.slice(0, MAX_PERMISSION_BADGES);
  const hidden = permissions.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((permission) => (
        <Badge key={permission} variant="secondary" className="text-xs">
          {permission}
        </Badge>
      ))}
      {hidden > 0 && (
        <Badge variant="outline" className="text-xs">
          +{hidden} lainnya
        </Badge>
      )}
    </div>
  );
}

export function RoleList() {
  const { user } = useAuth();
  const canWrite = hasPermission(user, "roles:write");
  const canDelete = hasPermission(user, "roles:delete");
  const showActions = canWrite || canDelete;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const { offset, limit, page, hasPrevious, goToNext, goToPrevious } = usePagination(10, debouncedSearch);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Role | undefined>(undefined);

  const { data: roles, isLoading, isError, error } = useRoles({
    query: debouncedSearch || undefined,
    limit,
    offset,
  });
  const deleteMutation = useDeleteRole();
  const hasNext = (roles?.length ?? 0) === limit;

  const handleDelete = (role: Role) => {
    deleteMutation.mutate(role.id, {
      onSuccess: () => toast.success("Peran dihapus"),
      onError: (err) => toast.error(getErrorMessage(err, "Gagal menghapus peran")),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Peran</h1>
        {canWrite && (
          <Button onClick={() => { setEditing(undefined); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Peran
          </Button>
        )}
      </div>

      <SearchInput
        placeholder="Cari nama peran…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {isError && <p className="text-sm text-destructive">{getErrorMessage(error, "Gagal memuat data peran")}</p>}
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Izin</TableHead>
              <TableHead>Sistem</TableHead>
              {showActions && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.length === 0 && (
              <TableRow>
                <TableCell colSpan={showActions ? 5 : 4} className="text-center text-muted-foreground">
                  Tidak ada peran.
                </TableCell>
              </TableRow>
            )}
            {roles?.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell className="text-muted-foreground">{role.description ?? "—"}</TableCell>
                <TableCell>
                  <PermissionBadges permissions={role.permissions} />
                </TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <Badge variant="success">Sistem</Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canWrite && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditing(role); setFormOpen(true); }}
                          aria-label={`Edit ${role.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && !role.isSystem && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`Hapus ${role.name}`}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Peran</AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus <span className="font-medium">{role.name}</span>? Tindakan ini
                                tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(role)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!isLoading && (roles?.length ?? 0) > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}

      <RoleForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(undefined); }}
        role={editing}
      />
    </div>
  );
}
