import {
  createCarBrand,
  deleteCarBrand,
  listCarBrands,
  updateCarBrand,
} from "@/api/car-brands";
import type { CreateCarBrandPayload, UpdateCarBrandPayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["car-brands"];

export function useCreateCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCarBrandPayload) => createCarBrand(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car brand created");
    },
  });
}

export function useListCarBrands() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listCarBrands(),
  });
}

export function useDeleteCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCarBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car brand deleted");
    },
  });
}

export function useUpdateCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCarBrandPayload }) =>
      updateCarBrand(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car brand updated");
    },
  });
}
