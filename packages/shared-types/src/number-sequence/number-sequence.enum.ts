import { createEnumMeta } from "../utils/enum";

export enum InvoiceOrgEntity {
  FIVE_STAR_AUTO_LEATHER = "five-star-auto-leather",
  LEATHER_AND_STITCH = "leather-and-stitch",
}

export const InvoiceOrgEntityMeta = createEnumMeta<InvoiceOrgEntity>({
  [InvoiceOrgEntity.FIVE_STAR_AUTO_LEATHER]: "Five Star Auto Leather",
  [InvoiceOrgEntity.LEATHER_AND_STITCH]: "Leather & Stitch",
});
