import { CreateOrderPayload, GetOrderMetaResponse, Order } from "shared-types";
import { Models } from "appwrite";
import { orderRepository } from "./order.repository";
import { clientRepository } from "@/features/configurations/services/client.repository";
import { carBrandRepository } from "@/features/configurations/services/car-brand.repository";
import { productTypeRepository } from "@/features/configurations/services/product-type.repository";
import { nextNumberSequenceService } from "@/features/configurations/services/next-number-sequence.service";

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<void> {
    console.log("Creating order with payload:", payload);
    // TODO: add logic to create order + order items
    // TODO: add logic to create invoice if createInvoice is true
    return Promise.resolve();
  },

  async getOrderMeta(): Promise<GetOrderMetaResponse> {
    const clients = (await clientRepository.list()).rows;
    const productTypes = (await productTypeRepository.list()).rows;
    const nextPoNumber = (await nextNumberSequenceService.getNextPoNumber())?.nextValue;
    const nextInvoiceNumbers = await nextNumberSequenceService.getNextInvoiceNumbers();
    const carBrands = (await carBrandRepository.list()).rows;

    return {
      clients: clients,
      productTypes: productTypes,
      nextPoNumber,
      nextInvoiceNumbers: {
        fiveStarAutoLeather: nextInvoiceNumbers?.fiveStarAutoLeather?.nextValue,
        leatherAndStitch: nextInvoiceNumbers?.leatherAndStitch?.nextValue,
      },
      carBrands: carBrands,
    };
  },

  async listOrders(): Promise<Models.RowList<Order>> {
    return orderRepository.list();
  },

  async getOrderById(orderId: string): Promise<Order> {
    return orderRepository.getById(orderId);
  },
};
