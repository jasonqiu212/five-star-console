import { InvoiceEntity } from "shared-types";

export function getInvoiceNumberPrefix(entity: InvoiceEntity): string {
  return entity === InvoiceEntity.LEATHER_AND_STITCH ? "LS-" : "FS-";
}
