import { Order, User } from '@prisma/client';

export interface UserRepository {
  findOne(name: User['name']): Promise<User | null>;
  updateUserOrder(order: Order, id: User['id']): Promise<User>;
}
