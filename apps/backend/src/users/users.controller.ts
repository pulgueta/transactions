import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { User } from '@prisma/client';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get(':email')
  findOne(@Param('email') email: User['email']) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: User['email'], @Body() data: Partial<User>) {
    return this.usersService.update(email, data);
  }

  @Delete(':email')
  remove(@Param('email') email: User['email']) {
    return this.usersService.remove(email);
  }
}
