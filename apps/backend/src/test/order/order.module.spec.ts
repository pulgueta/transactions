import { Test, TestingModule } from '@nestjs/testing';

import { DeliveriesService } from '../../application/services/delivery.service';
import { Argon2HashingService } from '../../application/services/hashing.service';
import { OrdersService } from '../../application/services/order.service';
import { ProductsService } from '../../application/services/product.service';
import { UsersService } from '../../application/services/user.service';
import { FetcherModule } from '../../infra/api/fetcher.module';
import { HashingModule } from '../../infra/api/hashing.module';
import { OrderController } from '../../infra/api/order/order.controller';
import { OrdersModule } from '../../infra/api/order/order.module';
import { DatabaseModule } from '../../infra/database/database.module';

describe('OrdersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have OrderController', () => {
    const controller = module.get<OrderController>(OrderController);
    expect(controller).toBeDefined();
  });

  it('should have OrdersService', () => {
    const service = module.get<OrdersService>(OrdersService);
    expect(service).toBeDefined();
  });

  it('should have UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });

  it('should have DeliveriesService', () => {
    const service = module.get<DeliveriesService>(DeliveriesService);
    expect(service).toBeDefined();
  });

  it('should have ProductsService', () => {
    const service = module.get<ProductsService>(ProductsService);
    expect(service).toBeDefined();
  });

  it('should have Argon2HashingService', () => {
    const service = module.get<Argon2HashingService>(Argon2HashingService);
    expect(service).toBeDefined();
  });

  it('should import DatabaseModule', () => {
    expect(module.get(DatabaseModule)).toBeDefined();
  });

  it('should import FetcherModule', () => {
    expect(module.get(FetcherModule)).toBeDefined();
  });

  it('should import HashingModule', () => {
    expect(module.get(HashingModule)).toBeDefined();
  });
});
