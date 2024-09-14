import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { DatabaseService } from './database.service';
import { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class UsersService implements UserRepository {
  constructor(private db: DatabaseService) {}

  async create(user: User): Promise<User> {
    const newUser = await this.db.user.create({
      data: {
        name: user.name,
      },
    });

    return newUser;
  }

  async findOne(id: User['id']) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(user: Partial<User>, id: User['id']) {
    const updatedUser = await this.db.user.update({
      where: {
        id,
      },
      data: user,
    });

    return updatedUser;
  }

  async delete(id: User['id']) {
    await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
