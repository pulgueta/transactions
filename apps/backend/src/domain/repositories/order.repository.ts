import { Order, User } from '@prisma/client';

import { CreateOrderDTO, UpdateOrderDTO } from '../dto/order.dto';

export interface OrderRepository {
  createInitialOrder(): Promise<Order>;
  create(
    id: Order['id'],
    order: CreateOrderDTO,
  ): Promise<{ user: User; order: Order }>;
  update(order: UpdateOrderDTO, id: Order['id']): Promise<Order | null>;
  findOne(id: Order['id']): Promise<Order | null>;
  delete(id: Order['id']): Promise<void | null>;
}
