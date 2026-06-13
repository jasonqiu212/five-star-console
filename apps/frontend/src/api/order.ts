import { apiCall, functionCall } from "@/utils";
import { DATABASE_ID, tablesDB, functions, ORDER_FUNCTIONS_ID } from "./appwrite-client";
import { CreateOrderPayload, GetOrderMetaResponse, Order } from "shared-types";
import { ExecutionMethod, Models, Query } from "appwrite";

const TABLE_ID = "order";

export function createOrder(payload: CreateOrderPayload): Promise<void> {
  return functionCall<void>(() =>
    functions.createExecution({
      functionId: ORDER_FUNCTIONS_ID,
      body: JSON.stringify(payload),
      method: ExecutionMethod.POST,
      xpath: "/create-order",
    })
  );
}

export function getOrderMeta(): Promise<GetOrderMetaResponse> {
  return functionCall<GetOrderMetaResponse>(() =>
    functions.createExecution({
      functionId: ORDER_FUNCTIONS_ID,
      method: ExecutionMethod.GET,
      xpath: "/get-order-meta",
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
