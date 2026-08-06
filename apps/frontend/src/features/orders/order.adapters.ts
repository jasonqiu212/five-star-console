import dayjs from "dayjs";
import type { ServerOrder } from "shared-types";
import type { OrderFormValues } from "./types";

export function toServerOrder(values: OrderFormValues): Omit<ServerOrder, "$id"> {
  return {
    orderDate: values.orderDate.format("YYYY-MM-DD"),
    poNumber: values.poNumber,
    client: values.client,
    clientDetails: values.clientDetails,
    carBrand: values.carBrand,
    carModel: values.carModel,
    carPlate: values.carPlate,
    handoverDate: values.handoverDate?.format("YYYY-MM-DD"),

    createInvoice: values.createInvoice ?? false,
    invoiceEntity: values.invoiceEntity,
    invoiceNumber: values.invoiceNumber,
    billingComments: values.billingComments,

    items: values.items.map((item) => ({
      ...item,
      isBtProduction: item.isBtProduction ?? false,
      isSgProduction: item.isSgProduction ?? false,
      isSgReadyStock: item.isSgReadyStock ?? false,
    })),
  };
}

// TODO: Should be from Order -> OrderFormValues?
export function toFormValues(order: ServerOrder): OrderFormValues {
  return {
    orderDate: dayjs(order.orderDate),
    poNumber: order.poNumber,
    client: order.client,
    clientDetails: order.clientDetails,
    carBrand: order.carBrand,
    carModel: order.carModel,
    carPlate: order.carPlate,
    handoverDate: order.handoverDate ? dayjs(order.handoverDate) : undefined,

    createInvoice: order.createInvoice,
    invoiceEntity: order.invoiceEntity,
    invoiceNumber: order.invoiceNumber,
    billingComments: order.billingComments,

    items: order.items,
  };
}
