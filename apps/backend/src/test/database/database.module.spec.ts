import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../infra/database/database.module';
import { DatabaseService } from '../../application/services/database.service';

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide DatabaseService', () => {
    const databaseService = module.get<DatabaseService>(DatabaseService);
    expect(databaseService).toBeDefined();
    expect(databaseService).toBeInstanceOf(DatabaseService);
  });
});
