import { apiCall } from "@/utils/api";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { PoNumberSequence } from "@/types/appwrite";
import { Models, Query } from "appwrite";
import { UpdatePoNumberSequencePayload } from "@/types/api";

const TABLE_ID = "po_number_sequence";

export async function listPoNumberSequences(): Promise<Models.RowList<PoNumberSequence>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.orderAsc("$createdAt"), Query.limit(1)],
    })
  );
}

export async function updatePoNumberSequence(id: string, payload: UpdatePoNumberSequencePayload) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}
