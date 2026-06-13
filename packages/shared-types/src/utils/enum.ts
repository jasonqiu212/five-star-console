export function createEnumMeta<T extends string | number>(map: Record<T, string>) {
  const options = Object.keys(map).map((k) => {
    const value = (Number.isFinite(Number(k)) ? Number(k) : k) as T;
    const label = map[value] as string;
    return { value, label };
  });

  return {
    getLabel: (value: T) => map[value],
    options,
  };
}
