import { useQuery } from "@tanstack/react-query";
import { getOrderById, listOrders } from "../services/order.service";

const QUERY_KEY = "order";

export function useListOrders() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => listOrders(),
  });
}

export function useGetOrderById(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => getOrderById(orderId),
  });
}
