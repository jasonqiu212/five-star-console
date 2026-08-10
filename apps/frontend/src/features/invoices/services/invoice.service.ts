import { Query } from "appwrite";
import { ListInvoicesRequest, ListInvoicesResponse, UpdateInvoiceStatusRequest } from "shared-types";
import { invoiceRepository } from "./invoice.repository";

export const invoiceService = {
  async listInvoices(params: ListInvoicesRequest): Promise<ListInvoicesResponse> {
    const { pagination, sorter, filters } = params;
    const queries = [
      Query.limit(pagination.limit),
      Query.offset(pagination.offset),
      Query.select(["*", "invoiceItems.*"]),
      Query.equal("entity", filters.entity),
    ];

    if (sorter) {
      queries.push(
        sorter.order === "asc" ? Query.orderAsc(sorter.field) : Query.orderDesc(sorter.field)
      );
    }

    if (filters.status?.length) {
      queries.push(Query.equal("status", filters.status));
    }

    return invoiceRepository.list(queries);
  },

  async updateInvoiceStatus(params: UpdateInvoiceStatusRequest) {
    const { id, ...data } = params;
    return invoiceRepository.update(id, data);
  },
};
