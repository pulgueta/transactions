import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(user: User): Promise<User> {
    const userExists = await this.db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = await this.db.user.create({
      data: user,
    });

    return newUser;
  }

  async findOne(email: User['email']) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(email: User['email'], data: Partial<User>) {
    const user = await this.findOne(email);

    if (!user) {
      return null;
    }

    const updatedUser = await this.db.user.update({
      where: {
        email,
      },
      data,
    });

    return updatedUser;
  }

  async remove(email: User['email']) {
    const user = await this.findOne(email);

    if (!user) {
      return null;
    }

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await this.db.user.delete({
      where: {
        email,
      },
    });

    return user;
  }
}
