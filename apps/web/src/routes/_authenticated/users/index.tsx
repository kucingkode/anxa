import { createFileRoute } from "@tanstack/react-router";
import { UserList } from "@/features/users/components/user-list";

export const Route = createFileRoute("/_authenticated/users/")({
  component: UserList,
});
