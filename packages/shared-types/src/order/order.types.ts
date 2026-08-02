import { OrderItemLeatherType, OrderItemSeatReplacementScope } from "../appwrite/appwrite";

export interface ServerOrderItem {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  productType?: string;
  leatherType?: OrderItemLeatherType;
  seatReplacementScope?: OrderItemSeatReplacementScope;
  partialSetDetails?: string;
  color?: string;
  thread?: string;
}

export interface ServerOrder {
  $id: string;
  orderDate: string;
  poNumber?: string;
  client?: string;
  clientDetails?: string;
  carBrand?: string;
  carModel?: string;
  carPlate?: string;
  handoverDate?: string;

  createInvoice: boolean;
  invoiceEntity?: string;
  invoiceNumber?: string;
  billingComments?: string;

  items?: ServerOrderItem[];
}
