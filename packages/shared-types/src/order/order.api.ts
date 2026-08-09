import { Models } from "appwrite";
import {
  CarBrand,
  Client,
  Order,
  OrderItemLeatherType,
  OrderItemSeatReplacementScope,
  ProductType,
} from "../appwrite/appwrite";
import { InvoiceOrgEntity } from "../number-sequence/number-sequence.enum";
import {
  BatamProductionStatus,
  InstallationStatus,
  OrderStatus,
  SgProductionStatus,
} from "./order.enum";

export type CreateOrderItemRequest = {
  productType: string;
  netPrice: number;

  /** Specific to leather seats */
  leatherType?: OrderItemLeatherType;
  seatReplacementScope?: OrderItemSeatReplacementScope;
  partialSetDetails?: string;
  color?: string;
  thread?: string;

  /** Specific to other products */
  details?: string;

  /** Production details for leather seats */
  doorPanelDetails?: string;
  designDetails?: string;
  isBtProduction: boolean;
  btProductionScope?: string;
  isSgProduction: boolean;
  sgProductionScope?: string;
  isSgReadyStock: boolean;
  sgReadyStockScope?: string;
  replaceStock?: boolean;
};

export type CreateOrderRequest = Pick<
  Order,
  "orderDate" | "client" | "clientDetails" | "carBrand" | "carModel" | "carPlate" | "handoverDate"
> & {
  createInvoice: boolean;
  invoiceEntity?: InvoiceOrgEntity;
  billingComments?: string;
  items: CreateOrderItemRequest[];
};

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
