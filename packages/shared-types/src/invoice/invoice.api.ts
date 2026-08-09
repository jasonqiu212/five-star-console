import { Models } from "appwrite";
import { Invoice, InvoiceEntity, InvoiceStatus } from "../appwrite/appwrite";

export type ListInvoicesRequest = {
  pagination: {
    limit: number;
    offset: number;
  };
  sorter?: {
    field: "openDate" | "carPlate";
    order: "asc" | "desc";
  };
  filters: {
    invoiceEntity: InvoiceEntity;
    status?: InvoiceStatus[];
  };
};

export type ListInvoicesResponse = Models.RowList<Invoice>;
