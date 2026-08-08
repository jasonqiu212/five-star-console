import {
  BatamProductionStatus,
  CreateOrderPayload,
  GetOrderMetaResponse,
  InstallationStatus,
  InvoiceStatus,
  Order,
  SgProductionStatus,
} from "shared-types";
import { ID, Models } from "appwrite";
import { orderRepository } from "./order.repository";
import { orderItemRepository } from "./order-item.repository";
import { invoiceRepository } from "@/features/invoices/services/invoice.repository";
import { invoiceItemRepository } from "@/features/invoices/services/invoice-item.repository";
import { clientRepository } from "@/features/configurations/services/client.repository";
import { carBrandRepository } from "@/features/configurations/services/car-brand.repository";
import { productTypeRepository } from "@/features/configurations/services/product-type.repository";
import { nextNumberSequenceService } from "@/features/configurations/services/next-number-sequence.service";
import { tablesDB } from "@/shared/appwrite/appwrite-client";
import { TAX_RATE } from "./constants";
import { formatInvoiceNumber } from "./utils";

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<string> {
    if (payload.items.length === 0) {
      throw new Error("At least 1 order item is required");
    }

    const { $id: transactionId } = await tablesDB.createTransaction({ ttl: 60 });

    try {
      const poNumber = await nextNumberSequenceService.consumeNextPoNumber(transactionId);

      const hasBatamProduction = payload.items.some((item) => item.isBtProduction);
      const hasSgProduction = payload.items.some((item) => item.isSgProduction);

      const orderId = ID.unique();
      await orderRepository.createWithRelationships(
        {
          orderDate: payload.orderDate,
          poNumber: String(poNumber),
          client: payload.client,
          clientDetails: payload.clientDetails,
          carBrand: payload.carBrand,
          carModel: payload.carModel,
          carPlate: payload.carPlate,
          handoverDate: payload.handoverDate,
          batam_production_status: hasBatamProduction ? BatamProductionStatus.WAITING : null,
          sg_production_status: hasSgProduction ? SgProductionStatus.WAITING : null,
          installation_status: InstallationStatus.WAITING,
        },
        { rowId: orderId, transactionId }
      );

      await Promise.all(
        payload.items.map((item) =>
          orderItemRepository.createWithRelationships(
            {
              productType: item.productType,
              leatherType: item.leatherType,
              seatReplacementScope: item.seatReplacementScope,
              partialSetDetails: item.partialSetDetails,
              color: item.color,
              thread: item.thread,
              doorPanelDetails: item.doorPanelDetails,
              designDetails: item.designDetails,
              details: item.details,
              isBtProduction: item.isBtProduction,
              btProductionScope: item.btProductionScope,
              isSgProduction: item.isSgProduction,
              sgProductionScope: item.sgProductionScope,
              isSgReadyStock: item.isSgReadyStock,
              sgReadyStockScope: item.sgReadyStockScope,
              replaceStock: item.replaceStock,
              order: orderId,
            },
            { transactionId }
          )
        )
      );

      if (payload.createInvoice && payload.invoiceEntity) {
        const invoiceNumber = await nextNumberSequenceService.consumeNextInvoiceNumber(
          payload.invoiceEntity,
          transactionId
        );

        const subtotalExclTax = payload.items.reduce((sum, item) => sum + item.netPrice, 0);
        const totalTax = subtotalExclTax * TAX_RATE;
        const totalInclTax = subtotalExclTax + totalTax;

        const invoiceId = ID.unique();
        await invoiceRepository.createWithRelationships(
          {
            invoiceNumber: formatInvoiceNumber(payload.invoiceEntity, invoiceNumber),
            taxRate: TAX_RATE,
            subtotalExclTax,
            totalTax,
            totalInclTax,
            billingComments: payload.billingComments,
            openDate: payload.orderDate,
            status: InvoiceStatus.OPEN,
            client: payload.client,
            clientDetails: payload.clientDetails,
            carBrand: payload.carBrand,
            carModel: payload.carModel,
            carPlate: payload.carPlate,
            order: orderId,
          },
          { rowId: invoiceId, transactionId }
        );

        await Promise.all(
          payload.items.map((item) =>
            invoiceItemRepository.createWithRelationships(
              {
                title: [item.productType, item.details].filter(Boolean).join(" - "),
                unitPriceExclTax: item.netPrice,
                invoice: invoiceId,
              },
              { transactionId }
            )
          )
        );
      }

      await tablesDB.updateTransaction({ transactionId, commit: true });
      return orderId;
    } catch (error) {
      await tablesDB.updateTransaction({ transactionId, rollback: true });
      throw error;
    }
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
