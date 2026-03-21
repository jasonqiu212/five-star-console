import { apiCall } from "@/utils";
import { DATABASE_ID, tablesDB } from "./appwrite-client";
import { CarModel } from "@/types/appwrite";
import { ID, Models, Query } from "appwrite";
import { CreateCarModelPayload, UpdateCarModelPayload } from "@/types/api";

const TABLE_ID = "car_model";

export async function createCarModel(payload: CreateCarModelPayload) {
  return apiCall(() =>
    tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: payload,
    })
  );
}

export async function listCarModels(): Promise<Models.RowList<CarModel>> {
  return apiCall(() =>
    tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(1000)],
    })
  );
}

export async function updateCarModel(id: string, payload: UpdateCarModelPayload) {
  return apiCall(() =>
    tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: payload,
    })
  );
}

export async function deleteCarModel(id: string) {
  return apiCall(() =>
    tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
    })
  );
}
