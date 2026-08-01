import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { Client } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "client";

export const clientRepository = {
  ...createRepository<Client>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
