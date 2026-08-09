import { Models } from "appwrite";
import { CarBrand, Client, Order, ProductType } from "../appwrite/appwrite";
import { ServerOrder } from "./order.types";
import {
  BatamProductionStatus,
  InstallationStatus,
  OrderStatus,
  SgProductionStatus,
} from "./order.enum";

export type CreateOrderRequest = Omit<ServerOrder, "$id">;

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
  sorter?: {
    field: "orderDate" | "carPlate";
    order: "asc" | "desc";
  };
  filters?: {
    orderStatus?: OrderStatus;
    batamProductionStatus?: BatamProductionStatus[];
    sgProductionStatus?: SgProductionStatus[];
    installationStatus?: InstallationStatus[];
  };
};

export type ListOrdersResponse = Models.RowList<Order>;
