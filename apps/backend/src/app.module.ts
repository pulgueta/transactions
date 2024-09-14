import { Module } from '@nestjs/common';

import { UsersModule } from '@/infra/api/user/user.module';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
