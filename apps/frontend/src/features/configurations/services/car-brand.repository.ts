import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { CarBrand } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "car_brand";

export const carBrandRepository = {
  ...createRepository<CarBrand>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
