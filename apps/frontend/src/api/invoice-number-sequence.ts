import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { InvoiceNumberSequence } from "@/types/appwrite";
import { Models, Query } from "appwrite";
import { UpdateInvoiceNumberSequencePayload } from "@/types/api";

const TABLE_ID = "invoice_number_sequence";

export async function listInvoiceNumberSequences(): Promise<Models.RowList<InvoiceNumberSequence>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(2), Query.orderAsc("$createdAt")],
    })
  );
}

export async function updateInvoiceNumberSequence(
  id: string,
  payload: UpdateInvoiceNumberSequencePayload
) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}
