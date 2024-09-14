import { Injectable } from '@nestjs/common';

import { Order, User } from '@prisma/client';

import { DatabaseService } from './database.service';
import { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class UsersService implements UserRepository {
  constructor(private db: DatabaseService) {}

  async findOne(name: User['name']) {
    const user = await this.db.user.findFirst({
      where: {
        name,
      },
    });

    return user;
  }

  async updateUserOrder(order: Order, id: User['id']) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...updatedOrder } = order;

    const updatedUserOrder = await this.db.user.update({
      where: {
        id,
      },
      data: {
        Order: {
          update: {
            data: updatedOrder,
            where: {
              id: order.id,
            },
          },
        },
      },
    });

    return updatedUserOrder;
  }
}
