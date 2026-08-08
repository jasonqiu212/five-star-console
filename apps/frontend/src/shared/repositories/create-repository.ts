import { ID, Models } from "appwrite";
import { tablesDB } from "../appwrite/appwrite-client";
import { apiCall } from "../utils";

export function createRepository<T extends Models.Row>(config: {
  databaseId: string;
  tableId: string;
}) {
  return {
    async create(
      // Mirrors tablesDB.createRow's own conditional type so TS can match the deferred
      // conditionals structurally — simplifying this breaks the call below, even though T
      // never actually extends Models.DefaultRow in practice.
      data: T extends Models.DefaultRow
        ? Partial<Models.Row> & Record<string, any>
        : Partial<Models.Row> & Omit<T, keyof Models.Row>,
      options?: { rowId?: string; transactionId?: string }
    ) {
      return apiCall(() =>
        tablesDB.createRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: options?.rowId ?? ID.unique(),
          data,
          transactionId: options?.transactionId,
        })
      );
    },

    async createWithRelationships(
      data: Partial<Models.Row> & Record<string, any>,
      options?: { rowId?: string; transactionId?: string }
    ) {
      return apiCall(() =>
        tablesDB.createRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: options?.rowId ?? ID.unique(),
          data,
          transactionId: options?.transactionId,
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

    async update(id: string, data: Partial<T>, options?: { transactionId?: string }) {
      return apiCall(() =>
        tablesDB.updateRow({
          databaseId: config.databaseId,
          tableId: config.tableId,
          rowId: id,
          data,
          transactionId: options?.transactionId,
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
