import type { Client, ProductType } from "../appwrite/appwrite";
import type { ApiResponse } from "../api";

export type GetOrderMetaResponse = ApiResponse<{
  clients: Client[];
  productTypes: ProductType[];
}>;

export type CreateOrderPayload = {
  name: string;
};
