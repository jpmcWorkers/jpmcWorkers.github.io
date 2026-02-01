/**
 * Normalizes a Date so that date-only values (midnight UTC) display as the
 * intended calendar day in America/New_York. Builds run in UTC, so "2025-11-01"
 * becomes midnight UTC and would show as Oct 31 in EDT. Shifting to noon UTC
 * keeps the displayed day correct in Eastern.
 */
function normalizeForEasternDisplay(date: Date): Date {
  const u = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();
  const ms = date.getUTCMilliseconds();
  if (u === 0 && m === 0 && s === 0 && ms === 0) {
    const d = new Date(date);
    d.setUTCHours(12, 0, 0, 0);
    return d;
  }
  return date;
}

/**
 * Formats a date for display in America/New_York so the calendar day matches
 * the intended EDT date (e.g. content "2025-11-01" shows as November 1, not Oct 31).
 */
export function formatDate(date: Date): string {
  const normalized = normalizeForEasternDisplay(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(normalized);
}