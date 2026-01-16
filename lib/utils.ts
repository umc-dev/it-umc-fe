// utils/date.ts
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function getRelativeTime(dateString: string) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: id,
  });
}
