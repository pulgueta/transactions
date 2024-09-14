import { User } from '@prisma/client';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: Partial<User>, id: User['id']): Promise<User | null>;
  findOne(id: User['id']): Promise<User | null>;
  delete(id: User['id']): Promise<void | null>;
}
