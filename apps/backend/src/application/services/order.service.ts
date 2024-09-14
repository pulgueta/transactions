import { Injectable, NotFoundException } from '@nestjs/common';

import { Order } from '@prisma/client';

import { DatabaseService } from './database.service';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { CreateOrderDTO, UpdateOrderDTO } from '@/domain/dto/order.dto';

@Injectable()
export class OrdersService implements OrderRepository {
  constructor(private db: DatabaseService) {}

  async createInitialOrder() {
    const initialOrder = await this.db.order.create({
      data: {
        status: 'PENDING',
      },
    });

    return initialOrder;
  }

  async create(id: Order['id'], order: CreateOrderDTO) {
    const user = await this.db.user.create({
      data: {
        name: order.nameOnCard ?? '',
      },
    });

    const newOrder = await this.db.order.update({
      data: {
        address: order.address,
        cardInfo: order.cardInfo,
        city: order.city,
        cvv: order.cvv,
        expiryDate: order.expiryDate,
        orderTotal: order.orderTotal,
        userId: user.id,
        last4Digits: order.cardInfo?.slice(-4) ?? '',
        nameOnCard: order.nameOnCard,
        state: order.state,
        zip: order.zip,
        status: 'COMPLETED',
      },
      where: {
        id,
      },
    });

    return {
      order: newOrder,
      user,
    };
  }

  async findOne(id: Order['id']) {
    const order = await this.db.order.findFirst({
      where: {
        id,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(order: UpdateOrderDTO, id: Order['id']) {
    const updatedOrder = await this.db.order.update({
      where: {
        id,
      },
      data: order,
    });

    return updatedOrder;
  }

  async delete(id: Order['id']) {
    await this.db.order.delete({
      where: {
        id,
      },
    });
  }
}
