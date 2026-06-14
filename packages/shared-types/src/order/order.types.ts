export interface ServerOrderItem {
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

export interface ServerOrder {
  $id: string;
  orderDate: string;
  createInvoice: boolean;
  invoiceEntity?: string;
  invoiceNumber?: string;
  poNumber?: string;
  clientId?: string;
  salesperson?: string;
  clientDetails?: string;
  carBrandId?: string;
  carModel?: string;
  carPlate?: string;
  billingComments?: string;
  handoverDate?: string;
  items?: ServerOrderItem[];
}
