import { Body, Controller, Post } from '@nestjs/common';

import type { UserService } from '@/application/services/user.service';
import type { CreateUser } from '@store/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body('user') user: CreateUser): Promise<CreateUser> {
    return this.userService.createUser(user);
  }
}
