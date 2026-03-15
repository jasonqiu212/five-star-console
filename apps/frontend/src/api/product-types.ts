import { DATABASE_ID, tablesDB } from "./client";

const TABLE_ID = "product_types";

export async function listProductTypes() {
  return tablesDB.listRows({ databaseId: DATABASE_ID, tableId: TABLE_ID });
}
