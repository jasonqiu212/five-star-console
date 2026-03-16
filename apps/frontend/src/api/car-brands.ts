import { apiCall } from "@/utils/api";
import { DATABASE_ID, tablesDB } from "./client";
import { CarBrands } from "@/types/appwrite";
import { ID, Models, Query } from "appwrite";
import { CreateCarBrandPayload, UpdateCarBrandPayload } from "@/types/api";

const TABLE_ID = "car_brands";

export async function createCarBrand(payload: CreateCarBrandPayload) {
  return apiCall(() =>
    tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: payload,
    })
  );
}

export async function listCarBrands(): Promise<Models.RowList<CarBrands>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.select(["*", "carModels.*"]), Query.limit(1000)],
    })
  );
}

export async function updateCarBrand(id: string, payload: UpdateCarBrandPayload) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}

export async function deleteCarBrand(id: string) {
  return apiCall(() =>
    tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    })
  );
}
