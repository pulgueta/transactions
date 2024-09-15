import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../infra/database/database.module';
import { UsersModule } from '../../infra/api/user/user.module';
import { DatabaseService } from '../../application/services/database.service';

describe('UserModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have DatabaseService', () => {
    const service = module.get<DatabaseService>(DatabaseService);

    expect(service).toBeDefined();
  });

  it('should import DatabaseModule', () => {
    expect(module.get(DatabaseModule)).toBeDefined();
  });
});
