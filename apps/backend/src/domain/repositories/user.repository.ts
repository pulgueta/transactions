import type { CreateUser, SelectUser } from '@store/shared';

export interface UserRepository {
  create(user: CreateUser): Promise<SelectUser>;
  update(user: Partial<SelectUser>, id: SelectUser['id']): Promise<SelectUser>;
  findById(id: SelectUser['id']): Promise<SelectUser | null>;
  findByEmail(email: SelectUser['email']): Promise<SelectUser | null>;
  delete(id: SelectUser['id']): Promise<void>;
}
