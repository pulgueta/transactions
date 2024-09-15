import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../infra/database/database.module';
import { OrdersService } from '../../../application/services/order.service';
import { UsersService } from '../../../application/services/user.service';
import { DeliveriesService } from '../../../application/services/delivery.service';
import { ProductsService } from '../../../application/services/product.service';
import { Argon2HashingService } from '../../../application/services/hashing.service';
import { OrderController } from './order.controller';
import { FetcherModule } from '../fetcher.module';
import { HashingModule } from '../hashing.module';

@Module({
  controllers: [OrderController],
  providers: [
    OrdersService,
    UsersService,
    DeliveriesService,
    ProductsService,
    Argon2HashingService,
  ],
  imports: [DatabaseModule, FetcherModule, HashingModule],
})
export class OrdersModule {}
