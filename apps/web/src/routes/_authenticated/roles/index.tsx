import { createFileRoute } from "@tanstack/react-router";
import { RoleList } from "@/features/roles/components/role-list";

export const Route = createFileRoute("/_authenticated/roles/")({
  component: RoleList,
});
