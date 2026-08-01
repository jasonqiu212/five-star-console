import { ID, Models } from "appwrite";
import { tablesDB } from "../appwrite/appwrite-client";
import { apiCall } from "../utils";

export function createRepository<T extends Models.Row>(config: {
  databaseId: string;
  tableId: string;
}) {
  return {
    async create(
      data: T extends Models.DefaultRow
        ? Partial<Models.Row> & Record<string, any>
        : Partial<Models.Row> & Omit<T, keyof Models.Row>
    ) {
      return apiCall(() =>
        tablesDB.createRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: ID.unique(),
          data,
        })
      );
    },

    async list(): Promise<Models.RowList<T>> {
      return apiCall(() =>
        tablesDB.listRows({
          databaseId: config.databaseId,
          tableId: config.tableId,
        })
      );
    },

    async getById(id: string): Promise<T> {
      return apiCall(() =>
        tablesDB.getRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: id,
        })
      );
    },

    async update(id: string, data: Partial<T>) {
      return apiCall(() =>
        tablesDB.updateRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: id,
          data,
        })
      );
    },

    async delete(id: string) {
      return apiCall(() =>
        tablesDB.deleteRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: id,
        })
      );
    },
  };
}
