import { createFileRoute } from "@tanstack/react-router";
import { ManufacturerList } from "@/features/manufacturers/components/manufacturer-list";

export const Route = createFileRoute("/_authenticated/manufacturers/")({
  component: ManufacturerList,
});
