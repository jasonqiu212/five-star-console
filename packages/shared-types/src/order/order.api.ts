import { Models } from "appwrite";
import { CarBrand, Client, Order, ProductType } from "../appwrite/appwrite";
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

export type ListOrdersRequest = {
  pagination: {
    limit: number;
    offset: number;
  };
};

export type ListOrdersResponse = Models.RowList<Order>;
