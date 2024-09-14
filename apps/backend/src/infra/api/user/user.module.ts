import { Module } from '@nestjs/common';

import { UsersService } from '@/application/services/user.service';
import { UserController } from '@/infra/api/user/user.controller';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
