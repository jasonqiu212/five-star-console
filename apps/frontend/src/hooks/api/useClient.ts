import { createClient, deleteClient, listClients, updateClient } from "@/api/client";
import type { CreateClientPayload, UpdateClientPayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["client"];

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Client created");
    },
  });
}

export function useListClients() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listClients(),
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateClientPayload }) =>
      updateClient(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Client updated");
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Client deleted");
    },
  });
}
