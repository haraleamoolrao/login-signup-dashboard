import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");

async function ensureUsersFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(usersFile, "utf-8");
  } catch {
    await writeFile(usersFile, "[]", "utf-8");
  }
}

export async function readUsers(): Promise<UserRecord[]> {
  await ensureUsersFile();
  const raw = await readFile(usersFile, "utf-8");

  try {
    const parsed = JSON.parse(raw) as UserRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeUsers(users: UserRecord[]) {
  await ensureUsersFile();
  await writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
