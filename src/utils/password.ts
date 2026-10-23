export const passwordRules: {id: string;label: string;test: (p: string) => boolean;}[] = [
{ id: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
{ id: 'case', label: 'Upper and lowercase letters', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
{ id: 'number', label: 'A number or symbol', test: (p) => /[\d\W_]/.test(p) }];


export function passwordScore(password: string): number {
  return passwordRules.filter((r) => r.test(password)).length;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** "lotte.jansen@…" → "Lotte Jansen" */
export function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? '';
  return (
    local.
    split(/[._-]+/).
    filter(Boolean).
    map((p) => p[0].toUpperCase() + p.slice(1)).
    join(' ') || 'Friend');

}