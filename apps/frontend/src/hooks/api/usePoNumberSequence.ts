import { listPoNumberSequences, updatePoNumberSequence } from "@/api/po-number-sequence";
import type { UpdatePoNumberSequencePayload } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const QUERY_KEY = ["po-number-sequence"];

export function useListPoNumberSequences() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => listPoNumberSequences(),
  });
}

export function useUpdatePoNumberSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePoNumberSequencePayload }) =>
      updatePoNumberSequence(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      message.success("PO number sequence updated");
    },
  });
}
