import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { InvoiceItem } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "invoice_item";

export const invoiceItemRepository = {
  ...createRepository<InvoiceItem>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
