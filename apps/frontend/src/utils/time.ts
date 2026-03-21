import dayjs from "dayjs";

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "-";
  return dayjs(date).format("DD/MM/YYYY");
}
