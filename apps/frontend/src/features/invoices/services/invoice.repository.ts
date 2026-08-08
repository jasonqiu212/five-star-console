import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { Invoice } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "invoice";

export const invoiceRepository = {
  ...createRepository<Invoice>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
