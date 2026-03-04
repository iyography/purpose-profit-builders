export type UserRole = 'admin' | 'member';

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  slug: string;
}

const USERS: Record<string, { password: string; name: string; role: UserRole; slug: string }> = {
  'davidiya3@gmail.com': { password: 'PPBuilders2026!', name: 'David', role: 'admin', slug: 'admin' },
  'theodore@ppbuilders.com': { password: 'Theodore2026!', name: 'Theodore', role: 'member', slug: 'theodore' },
};

export function authenticate(email: string, password: string): AuthUser | null {
  const normalizedEmail = email.toLowerCase();
  const user = USERS[normalizedEmail];
  if (!user || user.password !== password) return null;
  return { email: normalizedEmail, name: user.name, role: user.role, slug: user.slug };
}

export function getUserByEmail(email: string): AuthUser | null {
  const normalizedEmail = email.toLowerCase();
  const user = USERS[normalizedEmail];
  if (!user) return null;
  return { email: normalizedEmail, name: user.name, role: user.role, slug: user.slug };
}

export function isAdmin(email: string): boolean {
  const user = USERS[email.toLowerCase()];
  return user?.role === 'admin';
}

export function getStorageKey(slug: string): string {
  return `ppb_${slug}_email`;
}
