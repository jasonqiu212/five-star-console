import { listOrders } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = ["order"];

// export function useCreateClient() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: CreateClientPayload) => createClient(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEY });
//       message.success("Client created");
//     },
//   });
// }

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
