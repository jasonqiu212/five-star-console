import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB } from "@/api/appwrite-client";
import { Models, Query } from "appwrite";
import { Order } from "shared-types";

const TABLE_ID = "order";

// create

export async function list(): Promise<Models.RowList<Order>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}

export async function getById(id: string): Promise<Order> {
  return apiCall(() =>
    tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    })
  );
}

// update

// delete
