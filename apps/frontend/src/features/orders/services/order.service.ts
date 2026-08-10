import {
  BatamProductionStatus,
  CreateOrderRequest,
  GetOrderMetaResponse,
  InstallationStatus,
  InvoiceStatus,
  ListOrdersRequest,
  ListOrdersResponse,
  Order,
  SgProductionStatus,
  UpdateOrderStatusRequest,
} from "shared-types";
import { ID, Query } from "appwrite";
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
  async createOrder(params: CreateOrderRequest): Promise<string> {
    if (params.items.length === 0) {
      throw new Error("At least 1 order item is required");
    }

    const { $id: transactionId } = await tablesDB.createTransaction({ ttl: 60 });

    try {
      const poNumber = await nextNumberSequenceService.consumeNextPoNumber(transactionId);

      const hasBatamProduction = params.items.some((item) => item.isBtProduction);
      const hasSgProduction = params.items.some((item) => item.isSgProduction);

      const orderId = ID.unique();
      await orderRepository.createWithRelationships(
        {
          orderDate: params.orderDate,
          poNumber: String(poNumber),
          client: params.client,
          clientDetails: params.clientDetails,
          carBrand: params.carBrand,
          carModel: params.carModel,
          carPlate: params.carPlate,
          handoverDate: params.handoverDate,
          batamProductionStatus: hasBatamProduction ? BatamProductionStatus.WAITING : null,
          sgProductionStatus: hasSgProduction ? SgProductionStatus.WAITING : null,
          installationStatus: InstallationStatus.WAITING,
        },
        { rowId: orderId, transactionId }
      );

      await Promise.all(
        params.items.map((item) =>
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

      if (params.createInvoice && params.invoiceEntity) {
        const invoiceNumber = await nextNumberSequenceService.consumeNextInvoiceNumber(
          params.invoiceEntity,
          transactionId
        );

        const subtotalExclTax = params.items.reduce((sum, item) => sum + item.netPrice, 0);
        const totalTax = subtotalExclTax * TAX_RATE;
        const totalInclTax = subtotalExclTax + totalTax;

        const invoiceId = ID.unique();
        await invoiceRepository.createWithRelationships(
          {
            invoiceEntity: params.invoiceEntity,
            invoiceNumber: formatInvoiceNumber(params.invoiceEntity, invoiceNumber),
            taxRate: TAX_RATE,
            subtotalExclTax,
            totalTax,
            totalInclTax,
            billingComments: params.billingComments,
            openDate: params.orderDate,
            status: InvoiceStatus.OPEN,
            client: params.client,
            clientDetails: params.clientDetails,
            carBrand: params.carBrand,
            carModel: params.carModel,
            carPlate: params.carPlate,
            order: orderId,
          },
          { rowId: invoiceId, transactionId }
        );

        await Promise.all(
          params.items.map((item) =>
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

  async listOrders(params: ListOrdersRequest): Promise<ListOrdersResponse> {
    const { pagination, sorter, filters } = params;
    const queries = [
      Query.limit(pagination.limit),
      Query.offset(pagination.offset),
      Query.select(["*", "orderItems.*"]),
    ];

    if (sorter) {
      queries.push(
        sorter.order === "asc" ? Query.orderAsc(sorter.field) : Query.orderDesc(sorter.field)
      );
    }

    if (filters?.batamProductionStatus?.length) {
      queries.push(Query.equal("batamProductionStatus", filters.batamProductionStatus));
    }
    if (filters?.sgProductionStatus?.length) {
      queries.push(Query.equal("sgProductionStatus", filters.sgProductionStatus));
    }
    if (filters?.installationStatus?.length) {
      queries.push(Query.equal("installationStatus", filters.installationStatus));
    }

    return orderRepository.list(queries);
  },

  async getOrderById(orderId: string): Promise<Order> {
    return orderRepository.getById(orderId);
  },

  async updateOrderStatus(params: UpdateOrderStatusRequest) {
    const { id, ...data } = params;
    return orderRepository.update(id, data);
  },
};
