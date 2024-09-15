import { Module } from '@nestjs/common';

import { Argon2HashingService } from '@/application/services/hashing.service';

@Module({
  providers: [Argon2HashingService],
  exports: [Argon2HashingService],
})
export class HashingModule {}
