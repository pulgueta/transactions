import { User } from '@prisma/client';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: Partial<User>, email: User['email']): Promise<User | null>;
  findOne(email: User['email']): Promise<User | null>;
  delete(email: User['email']): Promise<void | null>;
}
