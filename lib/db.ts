type User = {
  email: string;
  passwordHash: string;
  walletAddress: string | null;
};

const users = new Map<string, User>();

export function getUser(email: string): User | undefined {
  return users.get(email);
}

export function setUser(user: User): void {
  users.set(user.email, user);
}

export function linkWallet(email: string, address: string): User | undefined {
  const user = users.get(email);
  if (!user) return undefined;
  user.walletAddress = address;
  users.set(email, user);
  return user;
}

export type { User };
