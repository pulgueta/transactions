import { Controller } from '@nestjs/common';

import { UsersService } from '@/application/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  // @Post('/')
  // async createUser(@Body('user') user: User): Promise<User> {
  //   return this.userService.create(user);
  // }
}
