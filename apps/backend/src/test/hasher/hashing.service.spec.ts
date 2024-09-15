import { Test, TestingModule } from '@nestjs/testing';

import { hash, verify } from '@node-rs/argon2';

import { Argon2HashingService } from '../../application/services/hashing.service';

jest.mock('@node-rs/argon2');

describe('Argon2HashingService', () => {
  let service: Argon2HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Argon2HashingService],
    }).compile();

    service = module.get<Argon2HashingService>(Argon2HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should call argon2 hash with correct options', async () => {
      const plainText = '123456789';
      const hashed = 'hashed';

      (hash as jest.Mock).mockResolvedValue(hashed);

      const result = await service.hash(plainText);

      expect(result).toBe(hashed);
      expect(hash).toHaveBeenCalledWith(
        plainText,
        expect.objectContaining({
          memoryCost: 20000,
          outputLen: 64,
          parallelism: 2,
          secret: expect.any(Buffer),
        }),
      );
    });
  });

  describe('verify', () => {
    it('should call argon2 verify with correct parameters', async () => {
      const hashed = 'hashed';
      const plainText = '123456789';

      (verify as jest.Mock).mockResolvedValue(true);

      const result = await service.verify(hashed, plainText);

      expect(result).toBe(true);
      expect(verify).toHaveBeenCalledWith(
        hashed,
        plainText,
        expect.objectContaining({
          memoryCost: 20000,
          outputLen: 64,
          parallelism: 2,
          secret: expect.any(Buffer),
        }),
      );
    });
  });
});
