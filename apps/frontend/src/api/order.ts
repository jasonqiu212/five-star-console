import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB, functions, ORDER_FUNCTIONS_ID } from "./appwrite-client";
import { Order } from "@/types/appwrite";
import { ExecutionMethod, Models, Query } from "appwrite";
import { CreateOrderPayload } from "@/types/api";

const TABLE_ID = "order";

export async function createOrder(payload: CreateOrderPayload): Promise<Models.Execution> {
  return apiCall(() =>
    functions.createExecution({
      functionId: ORDER_FUNCTIONS_ID,
      body: JSON.stringify(payload),
      xpath: "/orders",
      method: ExecutionMethod.POST,
    })
  );
}

export async function listOrders(): Promise<Models.RowList<Order>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}
