import { CreateClientPayload } from "shared-types";
import { clientRepository } from "./client.repository";

export const clientService = {
  async createClient(payload: CreateClientPayload) {
    return clientRepository.create(payload);
  },

  async listClients() {
    return clientRepository.list();
  },

  async updateClient(id: string, payload: Partial<CreateClientPayload>) {
    return clientRepository.update(id, payload);
  },

  async deleteClient(id: string) {
    return clientRepository.delete(id);
  },
};
