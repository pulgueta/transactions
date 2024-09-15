import { Injectable, NotFoundException } from '@nestjs/common';

import { Order, User } from '@prisma/client';

import { OrderRepository } from '@/domain/repositories/order.repository';
import { CreateOrderDTO, UpdateOrderDTO } from '@/domain/dto/order.dto';
import { DatabaseService } from './database.service';
import { UsersService } from './user.service';
import { DeliveriesService } from './delivery.service';
import { ProductsService } from './product.service';
import { Argon2HashingService } from './hashing.service';

@Injectable()
export class OrdersService implements OrderRepository {
  constructor(
    private db: DatabaseService,
    private users: UsersService,
    private deliveries: DeliveriesService,
    private products: ProductsService,
    private hasher: Argon2HashingService,
  ) {}

  async findAll(name: User['name']) {
    const orders = await this.db.order.findMany({
      where: {
        nameOnCard: name,
      },
      include: { Delivery: true, product: true },
    });

    if (orders.length === 0) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  async createInitialOrder(name: User['name']) {
    const initialOrder = await this.db.order.create({
      data: {
        status: 'PENDING',
        user: {
          create: {
            name,
          },
        },
      },
    });

    return initialOrder;
  }

  async create(id: Order['id'], order: CreateOrderDTO) {
    const userExists = await this.users.findOne(order.nameOnCard ?? '');

    const newOrder = await this.update(
      {
        ...order,
        userId: userExists?.id,
        status: 'COMPLETED',
      },
      id,
    );

    await Promise.all([
      this.users.updateUserOrder(newOrder, userExists?.id ?? ''),
      this.deliveries.create({
        orderId: newOrder.id,
      }),
    ]);

    return newOrder;
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

  async cancel(id: Order['id']) {
    const order = await this.db.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });

    return order;
  }

  async update(order: UpdateOrderDTO & { userId?: string }, id: Order['id']) {
    const { product, ...orderData } = order;

    const updatedOrder = await this.db.order.update({
      where: { id },
      data: {
        ...orderData,
        cardInfo: await this.hasher.hash(orderData.cardInfo ?? ''),
        productId: product,
      },
    });

    await this.products.decreaseStock(product ?? '', orderData.amount ?? 0);

    return updatedOrder;
  }
}
