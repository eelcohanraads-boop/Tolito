/** Human-friendly expiry text, e.g. "Expires tomorrow" or "Expires in 3 days" */
export function describeExpiry(days: number | null | undefined): string {
  if (days === null || days === undefined) return '';
  if (days <= 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  return `Expires in ${days} days`;
}