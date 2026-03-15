import { apiCall } from "@/utils/api";
import { DATABASE_ID, tablesDB } from "./client";
import { ProductTypes } from "@/types/appwrite";
import { ID, Models, Query } from "appwrite";
import { CreateProductTypePayload, UpdateProductTypePayload } from "@/types/api";

const TABLE_ID = "product_types";

export async function createProductType(payload: CreateProductTypePayload) {
  return apiCall(() =>
    tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: payload,
    })
  );
}

export async function listProductTypes(): Promise<Models.RowList<ProductTypes>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}

export async function updateProductType(id: string, payload: UpdateProductTypePayload) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}

export async function deleteProductType(id: string) {
  return apiCall(() =>
    tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    })
  );
}
