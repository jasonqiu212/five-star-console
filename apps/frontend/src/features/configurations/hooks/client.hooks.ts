import type { CreateClientRequest, UpdateClientRequest } from "shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { clientService } from "../services/client.service";

const QUERY_KEY = "client";

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateClientRequest) => clientService.createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Client created");
    },
  });
}

export function useListClients() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => clientService.listClients(),
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateClientRequest) => clientService.updateClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Client updated");
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => clientService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Client deleted");
    },
  });
}
