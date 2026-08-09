import type { CreateCarBrandRequest, UpdateCarBrandRequest } from "shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { carBrandService } from "../services/car-brand.service";

const QUERY_KEY = "car-brand";

export function useCreateCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCarBrandRequest) => carBrandService.createCarBrand(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Car brand created");
    },
  });
}

export function useListCarBrands() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => carBrandService.listCarBrands(),
  });
}

export function useUpdateCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCarBrandRequest) => carBrandService.updateCarBrand(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Car brand updated");
    },
  });
}

export function useDeleteCarBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carBrandService.deleteCarBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Car brand deleted");
    },
  });
}
