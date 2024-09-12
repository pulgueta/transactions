import { Module } from '@nestjs/common';

import { OrdersService } from '@/application/services/orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
