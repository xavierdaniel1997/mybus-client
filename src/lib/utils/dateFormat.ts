import dayjs from "dayjs";

export function formatDayLabel(dateStr: string): string {
  const d = dayjs(dateStr).startOf("day");
  const today = dayjs().startOf("day");
  const diff = d.diff(today, "day");

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";

  return d.format("DD MMM YYYY");
}
