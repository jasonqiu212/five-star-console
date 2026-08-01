import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { ProductType } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "product_type";

export const productTypeRepository = {
  ...createRepository<ProductType>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
