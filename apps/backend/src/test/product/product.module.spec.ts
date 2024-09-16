import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from '../../application/services/product.service';
import { DatabaseModule } from '../../infra/database/database.module';
import { ProductsModule } from '../../infra/api/product/product.module';
import { ProductController } from '../../infra/api/product/product.controller';

describe('ProductsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ProductController', () => {
    const controller = module.get<ProductController>(ProductController);
    expect(controller).toBeDefined();
  });

  it('should have ProductsService', () => {
    const service = module.get<ProductsService>(ProductsService);
    expect(service).toBeDefined();
  });

  it('should import DatabaseModule', () => {
    expect(module.get(DatabaseModule)).toBeDefined();
  });
});
