import { CreateClientRequest, UpdateClientRequest } from "shared-types";
import { clientRepository } from "./client.repository";

export const clientService = {
  async createClient(params: CreateClientRequest) {
    return clientRepository.create(params);
  },

  async listClients() {
    return clientRepository.list();
  },

  async updateClient(params: UpdateClientRequest) {
    const { id, name } = params;
    return clientRepository.update(id, { name });
  },

  async deleteClient(id: string) {
    return clientRepository.delete(id);
  },
};
