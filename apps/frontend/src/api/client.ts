import { apiCall } from "@/utils/api";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { Client } from "@/types/appwrite";
import { ID, Models, Query } from "appwrite";
import { CreateClientPayload, UpdateClientPayload } from "@/types/api";

const TABLE_ID = "client";

export async function createClient(payload: CreateClientPayload) {
  return apiCall(() =>
    tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: payload,
    })
  );
}

export async function listClients(): Promise<Models.RowList<Client>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}

export async function updateClient(id: string, payload: UpdateClientPayload) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}

export async function deleteClient(id: string) {
  return apiCall(() =>
    tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    })
  );
}
