import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { ProductType } from "shared-types";
import { ID, Models, Query } from "appwrite";
import { CreateProductTypePayload, UpdateProductTypePayload } from "shared-types";

const TABLE_ID = "product_type";

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

export async function listProductTypes(): Promise<Models.RowList<ProductType>> {
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
