/** Format a Date as YYYY-MM-DD in the viewer's LOCAL timezone.

   Deliberately not `toISOString()`, which formats in UTC: for a user east of
   Greenwich (e.g. IST, UTC+5:30) the UTC date rolls back a day late at night,
   so a "5 days from today" minimum would resolve one day early and let a
   customer book inside the required notice window. */
export function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** The earliest selectable delivery date: `days` from today, in local time. */
export function minDeliveryDate(days: number): string {
  return toLocalISODate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));
}
