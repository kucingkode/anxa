import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import type { NewProduct, Product, UpdateProduct } from "@simk/contracts";

export interface ListProductsParams {
  query?: string;
  manufacturerId?: string;
  limit?: number;
  offset?: number;
}

export async function listProducts(params: ListProductsParams = {}): Promise<Product[]> {
  const { data, error } = await api.GET("/v1/products", {
    params: {
      query: {
        query: params.query || undefined,
        manufacturerId: params.manufacturerId || undefined,
        limit: params.limit || undefined,
        offset: params.offset || undefined,
      },
    },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await api.GET("/v1/products/{productId}", {
    params: { path: { productId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Product;
}

export async function createProduct(payload: NewProduct): Promise<Product> {
  const { data, error } = await api.POST("/v1/products", { body: payload });
  if (error) throw new Error(getErrorMessage(error));
  return data as Product;
}

export async function updateProduct(id: string, payload: UpdateProduct): Promise<Product> {
  const { data, error } = await api.PATCH("/v1/products/{productId}", {
    params: { path: { productId: id } },
    body: payload,
  });
  if (error) throw new Error(getErrorMessage(error));
  return data as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await api.DELETE("/v1/products/{productId}", {
    params: { path: { productId: id } },
  });
  if (error) throw new Error(getErrorMessage(error));
}
