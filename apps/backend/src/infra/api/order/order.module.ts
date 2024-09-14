import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { OrdersService } from '@/application/services/order.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrdersService],
  imports: [DatabaseModule],
})
export class OrdersModule {}
