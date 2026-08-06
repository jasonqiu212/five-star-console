import type { Dayjs } from "dayjs";
import type {
  InvoiceOrgEntity,
  OrderItemLeatherType,
  OrderItemSeatReplacementScope,
} from "shared-types";

export interface OrderItem {
  productType?: string;
  leatherType?: OrderItemLeatherType;
  seatReplacementScope?: OrderItemSeatReplacementScope;
  partialSetDetails?: string;
  color?: string;
  thread?: string;

  details?: string;

  netPrice: number;

  // Production details
  doorPanelDetails?: string;
  designDetails?: string;
  isBtProduction?: boolean;
  btProductionScope?: string;
  isSgProduction?: boolean;
  sgProductionScope?: string;
  isSgReadyStock?: boolean;
  sgReadyStockScope?: string;
  replaceStock?: boolean;
}

export interface OrderFormValues {
  /** Basic Information */
  orderDate?: Dayjs;
  poNumber?: string;
  client?: string;
  clientDetails?: string;
  carBrand?: string;
  carModel?: string;
  carPlate?: string;
  billingComments?: string;
  handoverDate?: Dayjs;

  /** Invoice */
  /** When false, invoice fields are hidden and not required on submit. */
  createInvoice?: boolean;
  invoiceEntity?: InvoiceOrgEntity;
  invoiceNumber?: string;

  /** Order items */
  items?: OrderItem[];
}
