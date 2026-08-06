import type { Dayjs } from "dayjs";
import type {
  InvoiceOrgEntity,
  OrderItemLeatherType,
  OrderItemSeatReplacementScope,
} from "shared-types";

export interface OrderFormValues {
  /** Basic Information */
  orderDate: Dayjs;
  poNumber: string;
  client: string;
  clientDetails?: string;
  carBrand: string;
  carModel: string;
  carPlate: string;
  handoverDate?: Dayjs;

  /** Invoice */
  createInvoice: boolean;
  invoiceEntity?: InvoiceOrgEntity;
  invoiceNumber?: string;
  billingComments?: string;

  items: OrderItem[];
}

export interface OrderItem {
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
  isBtProduction?: boolean;
  btProductionScope?: string;
  isSgProduction?: boolean;
  sgProductionScope?: string;
  isSgReadyStock?: boolean;
  sgReadyStockScope?: string;
  replaceStock?: boolean;
}
