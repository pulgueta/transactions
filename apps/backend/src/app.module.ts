import { Module } from '@nestjs/common';

import { UsersModule } from '@/infra/api/user/user.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { OrdersModule } from '@/infra/api/order/order.module';
import { ProductsModule } from '@/infra/api/product/product.module';

@Module({
  imports: [DatabaseModule, UsersModule, OrdersModule, ProductsModule],
})
export class AppModule {}
