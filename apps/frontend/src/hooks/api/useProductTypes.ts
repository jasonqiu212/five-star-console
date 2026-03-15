import {
  createProductType,
  deleteProductType,
  listProductTypes,
  updateProductType,
} from "@/api/product-types";
import type { CreateProductTypePayload, UpdateProductTypePayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["product-types"];

export function useCreateProductType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductTypePayload) => createProductType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Product type created");
    },
  });
}

export function useListProductTypes() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listProductTypes(),
  });
}

export function useDeleteProductType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Product type deleted");
    },
  });
}

export function useUpdateProductType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProductTypePayload }) =>
      updateProductType(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Product type updated");
    },
  });
}
