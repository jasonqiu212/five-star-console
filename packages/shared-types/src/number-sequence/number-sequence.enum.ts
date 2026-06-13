import { createEnumMeta } from "../utils/enum";

export enum InvoiceOrgEntity {
  FiveStarAutoLeather = "five-star-auto-leather",
  LeatherAndStitch = "leather-and-stitch",
}

export const InvoiceOrgEntityMeta = createEnumMeta<InvoiceOrgEntity>({
  [InvoiceOrgEntity.FiveStarAutoLeather]: "Five Star Auto Leather",
  [InvoiceOrgEntity.LeatherAndStitch]: "Leather & Stitch",
});
