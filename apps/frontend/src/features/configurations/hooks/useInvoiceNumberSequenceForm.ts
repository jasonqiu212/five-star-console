import {
  useGetNextInvoiceNumbers,
  useUpdateNextNumberSequence,
} from "./next-number-sequence.hooks";

export function useInvoiceNumberSequenceForm() {
  const { data, isLoading } = useGetNextInvoiceNumbers();
  const updateSequence = useUpdateNextNumberSequence();

  const fiveStarAutoLeatherValue = data?.fiveStarAutoLeather?.nextValue;
  const leatherAndStitchValue = data?.leatherAndStitch?.nextValue;

  const onUpdateFiveStarAutoLeather = (newValue: number) => {
    if (data?.fiveStarAutoLeather == undefined) return;
    updateSequence.mutate({
      id: data.fiveStarAutoLeather.$id,
      nextValue: newValue,
    });
  };

  const onUpdateLeatherAndStitch = (newValue: number) => {
    if (data?.leatherAndStitch == undefined) return;
    updateSequence.mutate({
      id: data.leatherAndStitch.$id,
      nextValue: newValue,
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
