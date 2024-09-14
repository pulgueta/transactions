import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';
import { ProductController } from './product.controller';
import { ProductsService } from '@/application/services/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
  imports: [DatabaseModule],
})
export class ProductsModule {}
