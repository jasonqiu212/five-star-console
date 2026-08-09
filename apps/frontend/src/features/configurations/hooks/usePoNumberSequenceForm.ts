import { useGetNextPoNumber, useUpdateNextNumberSequence } from "./next-number-sequence.hooks";

export function usePoNumberSequenceForm() {
  const { data, isLoading } = useGetNextPoNumber();
  const updateSequence = useUpdateNextNumberSequence();
  const value = data?.nextValue;

  const onUpdate = (newValue: number) => {
    if (data == undefined) return;
    updateSequence.mutate({
      id: data.$id,
      nextValue: newValue,
    });
  };

  return {
    value,
    isLoading,
    onUpdate,
    isUpdating: updateSequence.isPending,
  };
}
