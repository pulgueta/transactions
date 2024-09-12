import { Injectable } from '@nestjs/common';

// import type { CreateUser, SelectUser } from '@store/shared';

import type { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // async createUser(user: CreateUser): Promise<SelectUser> {
  //   return this.userRepository.create(user);
  // }

  // async getUserByEmail(email: SelectUser['email']): Promise<SelectUser | null> {
  //   return this.userRepository.findByEmail(email);
  // }

  // async getUserById(id: SelectUser['id']): Promise<SelectUser | null> {
  //   return this.userRepository.findById(id);
  // }

  // async updateUser(
  //   user: Partial<SelectUser>,
  //   id: SelectUser['id'],
  // ): Promise<SelectUser> {
  //   return this.userRepository.update(user, id);
  // }

  // async deleteUser(id: SelectUser['id']): Promise<void> {
  //   // DELETE/WHERE clause is not handled by this repository, causing a false positive to the ESLint
  //   // eslint-disable-next-line drizzle/enforce-delete-with-where
  //   return this.userRepository.delete(id);
  // }
}
