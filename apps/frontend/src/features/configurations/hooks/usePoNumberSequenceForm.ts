import {
  useListPoNumberSequences,
  useUpdatePoNumberSequence,
} from "@/hooks/api/usePoNumberSequence";

export function usePoNumberSequenceForm() {
  const { data, isLoading } = useListPoNumberSequences();
  const updateSequence = useUpdatePoNumberSequence();
  const firstSequence = data?.rows?.[0];
  const value = firstSequence?.nextValue ?? null;

  const onUpdate = (newValue: number) => {
    if (firstSequence == null) return;
    updateSequence.mutate({
      id: firstSequence.$id,
      payload: { nextValue: newValue },
    });
  };

  return {
    value,
    isLoading,
    onUpdate,
    isUpdating: updateSequence.isPending,
  };
}
