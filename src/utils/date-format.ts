/**
 * Formats an ISO date string into a localized relative time string.
 * @param isoString The date string in ISO format.
 * @param locale The locale to format the date in.
 * @returns A human-readable relative time string (e.g. "10 minutes ago", "today, 9:26 AM").
 */
export function formatRelativeTime(isoString: string, locale: string = 'en-US'): string {
  const date = new Date(isoString);
  const now = new Date();
  
  const diffMs = date.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'long' });
  const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });

  const absMins = Math.abs(diffMins);

  if (absMins < 1) {
    // For less than a minute, return "now"
    return rtf.format(0, 'second');
  }

  if (absMins < 60) {
    // Within the same hour, e.g., "10 minutes ago"
    return rtf.format(diffMins, 'minute');
  }

  // Check if it's today or yesterday
  const isSameDay = 
    date.getDate() === now.getDate() && 
    date.getMonth() === now.getMonth() && 
    date.getFullYear() === now.getFullYear();
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = 
    date.getDate() === yesterday.getDate() && 
    date.getMonth() === yesterday.getMonth() && 
    date.getFullYear() === yesterday.getFullYear();

  if (isSameDay) {
    const dayStr = rtf.format(0, 'day'); // "today"
    const timeStr = timeFormatter.format(date);
    // Combine cleanly across locales: "today, 9:26 AM"
    return `${dayStr}, ${timeStr}`;
  }

  if (isYesterday) {
    const dayStr = rtf.format(-1, 'day'); // "yesterday"
    const timeStr = timeFormatter.format(date);
    return `${dayStr}, ${timeStr}`;
  }

  // Older than yesterday
  const dateFormatter = new Intl.DateTimeFormat(locale, { 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit' 
  });
  return dateFormatter.format(date);
}
