import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/order.service";
import { CreateOrderRequest, ListOrdersRequest } from "shared-types";
import { message } from "antd";

const QUERY_KEY = "order";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderRequest) => orderService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Order created");
    },
  });
}

export function useGetOrderMeta() {
  return useQuery({
    queryKey: ["order-meta"],
    queryFn: () => orderService.getOrderMeta(),
    staleTime: 0,
    gcTime: 0,
  });
}

export function useListOrders(payload: ListOrdersRequest) {
  return useQuery({
    queryKey: [QUERY_KEY, payload],
    queryFn: () => orderService.listOrders(payload),
  });
}

export function useGetOrderById(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => orderService.getOrderById(orderId),
  });
}
