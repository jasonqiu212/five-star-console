import { Client, ProductType } from "../appwrite/appwrite";

export type CreateOrderPayload = {
  name: string;
};

export type GetOrderMetaResponse = {
  clients: Client[];
  productTypes: ProductType[];
};
