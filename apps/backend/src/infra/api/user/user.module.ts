import { Module } from '@nestjs/common';

import { UsersService } from '@/application/services/user.service';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  providers: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
