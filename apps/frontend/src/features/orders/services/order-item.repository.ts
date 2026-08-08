import { DATABASE_ID } from "@/shared/appwrite/appwrite-client";
import { OrderItem } from "shared-types";
import { createRepository } from "@/shared/repositories/create-repository";

const TABLE_ID = "order_item";

export const orderItemRepository = {
  ...createRepository<OrderItem>({ databaseId: DATABASE_ID, tableId: TABLE_ID }),
};
