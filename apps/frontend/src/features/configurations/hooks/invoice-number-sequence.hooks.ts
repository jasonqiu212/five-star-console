import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { UpdateNextNumberSequencePayload } from "shared-types";
import { nextNumberSequenceService } from "../services/next-number-sequence.service";

const QUERY_KEY = "invoice-number-sequence";

export function useListInvoiceNumberSequences() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => nextNumberSequenceService.getInvoiceNumberSequences(),
  });
}

export function useUpdateInvoiceNumberSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateNextNumberSequencePayload }) =>
      nextNumberSequenceService.updateInvoiceNumberSequence(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("Invoice number sequence updated");
    },
  });
}
