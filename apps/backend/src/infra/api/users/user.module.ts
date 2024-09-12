import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '@/application/services/user.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { DatabaseUserRepository } from '@/infra/database/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: DatabaseUserRepository,
    },
  ],
  imports: [DatabaseModule],
})
export class UsersModule {}
