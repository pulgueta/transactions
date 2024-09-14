import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { DatabaseService } from './database.service';
import { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class UsersService implements UserRepository {
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

  async update(user: Partial<User>, email: User['email']) {
    const userExists = await this.findOne(email);

    if (!userExists) {
      return null;
    }

    const updatedUser = await this.db.user.update({
      where: {
        email,
      },
      data: user,
    });

    return updatedUser;
  }

  async delete(email: User['email']) {
    const user = await this.findOne(email);

    if (!user) {
      return null;
    }

    await this.db.user.delete({
      where: {
        email,
      },
    });
  }
}
