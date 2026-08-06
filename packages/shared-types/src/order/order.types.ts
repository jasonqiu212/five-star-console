import { OrderItemLeatherType, OrderItemSeatReplacementScope } from "../appwrite/appwrite";
import { InvoiceOrgEntity } from "../number-sequence/number-sequence.enum";

export interface ServerOrder {
  /** Basic Information */
  $id: string;
  orderDate: string;
  poNumber: string;
  client: string;
  clientDetails?: string;
  carBrand: string;
  carModel: string;
  carPlate: string;
  handoverDate?: string;

  /** Invoice */
  createInvoice: boolean;
  invoiceEntity?: InvoiceOrgEntity;
  invoiceNumber?: string;
  billingComments?: string;

  items: ServerOrderItem[];
}

export interface ServerOrderItem {
  productType?: string;
  netPrice: number;

  /**  Specific to leather seats */
  leatherType?: OrderItemLeatherType;
  seatReplacementScope?: OrderItemSeatReplacementScope;
  partialSetDetails?: string;
  color?: string;
  thread?: string;

  /**  Specific to other products */
  details?: string;

  /**  Production details for leather seats */
  doorPanelDetails?: string;
  designDetails?: string;
  isBtProduction: boolean;
  btProductionScope?: string;
  isSgProduction: boolean;
  sgProductionScope?: string;
  isSgReadyStock: boolean;
  sgReadyStockScope?: string;
  replaceStock?: boolean;
}
