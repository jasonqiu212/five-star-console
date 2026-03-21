import { apiCall } from "@/utils/api";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { Order } from "@/types/appwrite";
import { Models, Query } from "appwrite";

const TABLE_ID = "order";

export async function listOrders(): Promise<Models.RowList<Order>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}
