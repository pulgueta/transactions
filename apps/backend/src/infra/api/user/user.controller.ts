import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from '@/application/services/user.service';
import { CreateUser } from '@store/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body('user') user: CreateUser): Promise<CreateUser> {
    return this.userService.createUser(user);
  }
}
