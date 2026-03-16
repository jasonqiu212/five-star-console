import {
  useListInvoiceNumberSequences,
  useUpdateInvoiceNumberSequence,
} from "@/hooks/api/useInvoiceNumberSequence";

enum Entity {
  FiveStarAutoLeather = "five-star-auto-leather",
  LeatherAndStitch = "leather-and-stitch",
}

export function useInvoiceNumberSequenceForm() {
  const { data, isLoading } = useListInvoiceNumberSequences();
  const updateSequence = useUpdateInvoiceNumberSequence();

  const fiveStarAutoLeatherSequence = data?.rows?.find(
    (row) => row.entity === Entity.FiveStarAutoLeather
  );
  const fiveStarAutoLeatherValue = fiveStarAutoLeatherSequence?.nextValue ?? null;

  const leatherAndStitchSequence = data?.rows?.find(
    (row) => row.entity === Entity.LeatherAndStitch
  );
  const leatherAndStitchValue = leatherAndStitchSequence?.nextValue ?? null;

  const onUpdateFiveStarAutoLeather = (newValue: number) => {
    if (fiveStarAutoLeatherSequence == null) return;
    updateSequence.mutate({
      id: fiveStarAutoLeatherSequence.$id,
      payload: { nextValue: newValue },
    });
  };

  const onUpdateLeatherAndStitch = (newValue: number) => {
    if (leatherAndStitchSequence == null) return;
    updateSequence.mutate({
      id: leatherAndStitchSequence.$id,
      payload: { nextValue: newValue },
    });
  };

  return {
    fiveStarAutoLeatherValue,
    leatherAndStitchValue,
    isLoading,
    onUpdateFiveStarAutoLeather,
    onUpdateLeatherAndStitch,
    isUpdating: updateSequence.isPending,
  };
}
