import type { Dayjs } from "dayjs";
import type { InvoiceOrgEntity } from "shared-types";

/** Single line item in the order (used inside Form.List) */
export interface OrderItem {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  productType?: string;
  leatherType?: "FullLeather" | "HalfLeather" | "PVC";
  seatReplacementScope?: "Whole" | "Partial";
  partialSetDetails?: string;
  color?: string;
  thread?: string;
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
