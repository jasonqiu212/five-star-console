import { useQuery } from "@tanstack/react-query";
import { invoiceService } from "../services/invoice.service";
import { ListInvoicesRequest } from "shared-types";

const QUERY_KEY = "invoice";

export function useListInvoices(payload: ListInvoicesRequest) {
  return useQuery({
    queryKey: [QUERY_KEY, payload],
    queryFn: () => invoiceService.listInvoices(payload),
  });
}
