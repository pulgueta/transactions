import { Order, User } from '@prisma/client';

import { CreateOrderDTO, UpdateOrderDTO } from '../dto/order.dto';

export interface OrderRepository {
  createInitialOrder(name: User['name']): Promise<Order>;
  create(
    id: Order['id'],
    order: CreateOrderDTO,
  ): Promise<Omit<Order, 'userId'>>;
  update(order: UpdateOrderDTO, id: Order['id']): Promise<Order | null>;
  findOne(id: Order['id']): Promise<Order | null>;
}
