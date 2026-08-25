import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct, type ListProductsParams } from "../api/products";
import type { NewProduct, UpdateProduct } from "@simk/contracts";

export const productsKey = ["products"] as const;

export function useProducts(params: ListProductsParams = {}) {
  return useQuery({
    queryKey: [...productsKey, params],
    queryFn: () => listProducts(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [...productsKey, id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewProduct) => createProduct(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProduct }) => updateProduct(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKey }),
  });
}
