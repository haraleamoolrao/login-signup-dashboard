import { Injectable } from "@nestjs/common";
import { mkdir, readFile, writeFile } from "fs/promises";
import * as path from "path";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

@Injectable()
export class AuthService {
  private dataDir = path.resolve(__dirname, "..", "..", "data");
  private usersFile = path.join(this.dataDir, "users.json");

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private async ensureUsersFile() {
    await mkdir(this.dataDir, { recursive: true });
    try {
      await readFile(this.usersFile, "utf-8");
    } catch {
      await writeFile(this.usersFile, "[]", "utf-8");
    }
  }

  private async readUsers(): Promise<UserRecord[]> {
    await this.ensureUsersFile();
    const raw = await readFile(this.usersFile, "utf-8");
    try {
      const parsed = JSON.parse(raw) as UserRecord[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private async writeUsers(users: UserRecord[]) {
    await this.ensureUsersFile();
    await writeFile(this.usersFile, JSON.stringify(users, null, 2), "utf-8");
  }

  async signup(name: string, email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);
    const users = await this.readUsers();
    const exists = users.some((user) => user.email === normalizedEmail);

    if (exists) {
      return { ok: false as const, status: 409, message: "User already exists." };
    }

    users.push({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(),
      createdAt: new Date().toISOString()
    });

    await this.writeUsers(users);
    return { ok: true as const, status: 201, message: "Account created successfully." };
  }

  async login(email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);
    const users = await this.readUsers();
    const user = users.find(
      (item) => item.email === normalizedEmail && item.password === password.trim()
    );

    if (!user) {
      return {
        ok: false as const,
        status: 401,
        message: "Invalid email or password. User not found."
      };
    }

    return { ok: true as const, status: 200, user };
  }

  async findUserByEmail(email: string) {
    const normalizedEmail = this.normalizeEmail(email);
    const users = await this.readUsers();
    return users.find((item) => item.email === normalizedEmail) ?? null;
  }
}
