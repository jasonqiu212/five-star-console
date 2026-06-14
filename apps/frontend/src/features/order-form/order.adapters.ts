import dayjs from "dayjs";
import type { InvoiceOrgEntity, ServerOrder } from "shared-types";
import type { OrderFormValues } from "./types";

export function toServerOrder(values: OrderFormValues): Omit<ServerOrder, "$id"> {
  return {
    orderDate: values.orderDate?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"),
    createInvoice: values.createInvoice ?? false,
    invoiceEntity: values.invoiceEntity,
    invoiceNumber: values.invoiceNumber,
    poNumber: values.poNumber,
    client: values.client,
    clientDetails: values.clientDetails,
    carBrand: values.carBrand,
    carModel: values.carModel,
    carPlate: values.carPlate,
    billingComments: values.billingComments,
    handoverDate: values.handoverDate?.format("YYYY-MM-DD"),
    items: values.items,
  };
}

export function toFormValues(order: ServerOrder): OrderFormValues {
  return {
    orderDate: dayjs(order.orderDate),
    createInvoice: order.createInvoice,
    invoiceEntity: order.invoiceEntity as InvoiceOrgEntity | undefined,
    invoiceNumber: order.invoiceNumber,
    poNumber: order.poNumber,
    client: order.client,
    clientDetails: order.clientDetails,
    carBrand: order.carBrand,
    carModel: order.carModel,
    carPlate: order.carPlate,
    billingComments: order.billingComments,
    handoverDate: order.handoverDate ? dayjs(order.handoverDate) : undefined,
    items: order.items,
  };
}
