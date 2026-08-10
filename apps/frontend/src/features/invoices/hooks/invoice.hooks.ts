import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoiceService } from "../services/invoice.service";
import { ListInvoicesRequest, UpdateInvoiceStatusRequest } from "shared-types";
import { message } from "antd";

const QUERY_KEY = "invoice";

export function useListInvoices(payload: ListInvoicesRequest) {
  return useQuery({
    queryKey: [QUERY_KEY, payload],
    queryFn: () => invoiceService.listInvoices(payload),
  });
}

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateInvoiceStatusRequest) => invoiceService.updateInvoiceStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Invoice status updated");
    },
  });
}
