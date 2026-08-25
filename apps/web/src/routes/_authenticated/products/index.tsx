import { createFileRoute } from "@tanstack/react-router";
import { ProductList } from "@/features/products/components/product-list";

export const Route = createFileRoute("/_authenticated/products/")({
  component: ProductList,
});
