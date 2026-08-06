import { CarBrand, Client, ProductType } from "../appwrite/appwrite";
import { ServerOrder } from "./order.types";

export type CreateOrderPayload = Omit<ServerOrder, "$id">;

export type GetOrderMetaResponse = {
  clients: Client[];
  productTypes: ProductType[];
  nextPoNumber?: number;
  nextInvoiceNumbers: {
    fiveStarAutoLeather?: number;
    leatherAndStitch?: number;
  };
  carBrands: CarBrand[];
};
