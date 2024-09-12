import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import type { CreateUser, SelectUser } from '@store/shared/dist';

import { UserRepository } from '@/domain/repositories/user.repository';
import { usersTable } from './schemas';
import { databaseModule } from './database.module';
import type { Database } from './database';

export class DatabaseUserRepository implements UserRepository {
  constructor(@Inject(databaseModule) private db: Database) {}

  async create(user: CreateUser): Promise<SelectUser> {
    const userExists = await this.findByEmail(user.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const [newUser] = await this.db.insert(usersTable).values(user).returning();

    return newUser;
  }

  async findByEmail(
    userEmail: SelectUser['email'],
  ): Promise<SelectUser | null> {
    const user = await this.db.query.usersTable.findFirst({
      where: ({ email }, { eq }) => eq(email, userEmail),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(userId: SelectUser['id']): Promise<SelectUser | null> {
    const user = await this.db.query.usersTable.findFirst({
      where: ({ id }, { eq }) => eq(id, userId),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(
    user: Partial<SelectUser>,
    id: SelectUser['id'],
  ): Promise<SelectUser> {
    if (!user) {
      throw new Error('User not found');
    }

    const [updatedUser] = await this.db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable, id))
      .returning();

    return updatedUser;
  }

  async delete(id: SelectUser['id']): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.db.delete(usersTable).where(eq(usersTable, id));
  }
}
