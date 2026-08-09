import { InvoiceEntity, InvoiceStatus } from "../appwrite/appwrite";
import { createEnumMeta } from "../utils/enum";

export const InvoiceStatusMeta = createEnumMeta<InvoiceStatus>({
  [InvoiceStatus.OPEN]: "Open",
  [InvoiceStatus.PAID]: "Paid",
  [InvoiceStatus.CANCELLED]: "Cancelled",
});

export const InvoiceEntityMeta = createEnumMeta<InvoiceEntity>({
  [InvoiceEntity.FIVE_STAR_AUTO_LEATHER]: "Five Star Auto Leather",
  [InvoiceEntity.LEATHER_AND_STITCH]: "Leather & Stitch",
});
