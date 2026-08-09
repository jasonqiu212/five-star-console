import { Client } from "../appwrite/appwrite";

export type CreateClientRequest = Pick<Client, "name">;

export type UpdateClientRequest = Partial<CreateClientRequest> & { id: string };
