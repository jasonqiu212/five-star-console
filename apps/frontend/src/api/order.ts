import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB, functions, ORDER_FUNCTIONS_ID } from "./appwrite-client";
import { Order } from "shared-types";
import { ExecutionMethod, Models, Query } from "appwrite";
import { CreateOrderPayload } from "shared-types";
import type { GetOrderMetaResponse } from "shared-types";

const TABLE_ID = "order";

export async function createOrder(payload: CreateOrderPayload): Promise<Models.Execution> {
  return apiCall(async () => {
    return functions.createExecution({
      functionId: ORDER_FUNCTIONS_ID,
      body: JSON.stringify(payload),
      method: ExecutionMethod.POST,
      xpath: "/orders",
    });
  });
}

export async function getOrderMeta(): Promise<GetOrderMetaResponse> {
  return apiCall(async () => {
    const execution = await functions.createExecution({
      functionId: ORDER_FUNCTIONS_ID,
      method: ExecutionMethod.GET,
      xpath: "/get-order-meta",
    });
    return JSON.parse(execution.responseBody) as GetOrderMetaResponse;
  });
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
