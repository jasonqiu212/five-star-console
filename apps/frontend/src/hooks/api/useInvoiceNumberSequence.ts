import {
  listInvoiceNumberSequences,
  updateInvoiceNumberSequence,
} from "@/api/invoice-number-sequence";
import type { UpdateInvoiceNumberSequencePayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["invoice-number-sequence"];

export function useListInvoiceNumberSequences() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listInvoiceNumberSequences(),
  });
}

export function useUpdateInvoiceNumberSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateInvoiceNumberSequencePayload }) =>
      updateInvoiceNumberSequence(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("Invoice number sequence updated");
    },
  });
}
