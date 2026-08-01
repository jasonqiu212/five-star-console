import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { Order } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "order";

export const orderRepository = {
  ...createRepository<Order>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
