import { createOrder, listOrders } from "@/api/order";
import { CreateOrderPayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["order"];

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Order created");
    },
  });
}

export function useListOrders() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listOrders(),
  });
}

// export function useUpdateClient() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, payload }: { id: string; payload: UpdateClientPayload }) =>
//       updateClient(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEY });
//       message.success("Client updated");
//     },
//   });
// }

// export function useDeleteClient() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => deleteClient(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEY });
//       message.success("Client deleted");
//     },
//   });
// }
