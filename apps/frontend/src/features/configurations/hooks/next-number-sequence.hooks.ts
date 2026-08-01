import type { UpdatePoNumberSequencePayload } from "shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { nextNumberSequenceService } from "../services/next-number-sequence.service";

const QUERY_KEY = "next-number-sequence";

export function useGetNextInvoiceNumbers() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => nextNumberSequenceService.getNextInvoiceNumbers(),
  });
}

export function useGetNextPoNumber() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => nextNumberSequenceService.getNextPoNumber(),
  });
}

export function useUpdateNextNumberSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePoNumberSequencePayload }) =>
      nextNumberSequenceService.updateNextNumberSequence(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      message.success("PO number sequence updated");
    },
  });
}
