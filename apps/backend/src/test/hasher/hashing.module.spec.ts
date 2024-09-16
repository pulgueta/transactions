import { Test, TestingModule } from '@nestjs/testing';

import { HashingModule } from '../../infra/api/hashing.module';
import { Argon2HashingService } from '../../application/services/hashing.service';

describe('HashingModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HashingModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide Argon2HashingService', () => {
    const hashingService =
      module.get<Argon2HashingService>(Argon2HashingService);
    expect(hashingService).toBeDefined();
    expect(hashingService).toBeInstanceOf(Argon2HashingService);
  });
});
