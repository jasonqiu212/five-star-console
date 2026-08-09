import type { CreateOrderRequest } from "shared-types";
import type { OrderFormValues } from "./types";

export function toCreateOrderRequest(values: OrderFormValues): CreateOrderRequest {
  return {
    orderDate: values.orderDate.format("YYYY-MM-DD"),
    client: values.client,
    clientDetails: values.clientDetails ?? null,
    carBrand: values.carBrand,
    carModel: values.carModel,
    carPlate: values.carPlate,
    handoverDate: values.handoverDate?.format("YYYY-MM-DD") ?? null,

    createInvoice: values.createInvoice ?? false,
    invoiceEntity: values.invoiceEntity,
    billingComments: values.billingComments,

    items: values.items.map((item) => ({
      ...item,
      isBtProduction: item.isBtProduction ?? false,
      isSgProduction: item.isSgProduction ?? false,
      isSgReadyStock: item.isSgReadyStock ?? false,
    })),
  };
}
