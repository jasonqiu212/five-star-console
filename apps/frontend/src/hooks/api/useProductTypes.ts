import { listProductTypes } from "@/api/product-types";
import { useQuery } from "@tanstack/react-query";

export function useListProductTypes() {
  return useQuery({
    queryKey: ["product-types"],
    queryFn: () => listProductTypes(),
  });
}
