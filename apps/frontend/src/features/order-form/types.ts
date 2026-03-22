import type { Dayjs } from "dayjs";

/** Single line item in the order (used inside Form.List) */
export interface OrderItem {
  description?: string;
  quantity?: number;
  unitPrice?: number;
}

export interface OrderFormValues {
  orderDate?: Dayjs;
  /** When false, invoice fields are hidden and not required on submit. */
  createInvoice?: boolean;
  invoiceNumber?: string;
  poNumber?: string;
  client?: string;
  salesperson?: string;
  clientDetails?: string;
  carBrand?: string;
  carModel?: string;
  carPlate?: string;
  billingComments?: string;
  handoverDate?: Dayjs;
  items?: OrderItem[];
}
