import { createCarModel, deleteCarModel, listCarModels, updateCarModel } from "@/api/car-model";
import type { CreateCarModelPayload, UpdateCarModelPayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["car-model"];

export function useCreateCarModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCarModelPayload) => createCarModel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-brand"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car model created");
    },
  });
}

export function useListCarModels() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listCarModels(),
  });
}

export function useDeleteCarModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCarModel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-brand"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car model deleted");
    },
  });
}

export function useUpdateCarModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCarModelPayload }) =>
      updateCarModel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-brand"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Car model updated");
    },
  });
}
