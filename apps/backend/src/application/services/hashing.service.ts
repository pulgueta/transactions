import { Injectable } from '@nestjs/common';

import {
  verify as argonVerify,
  hash as argonHash,
  Options,
} from '@node-rs/argon2';

import { HashingService } from '@/domain/dto/hashing.dto';

@Injectable()
export class Argon2HashingService implements HashingService {
  private readonly options: Options = {
    memoryCost: 20000,
    outputLen: 64,
    parallelism: 2,
    secret: Buffer.from(process.env.HASHING_SECRET ?? ''),
  };

  async hash(plain: string) {
    const hashed = await argonHash(plain, this.options);

    return hashed;
  }

  async verify(hashed: string, plain: string) {
    const isValid = await argonVerify(hashed, plain, this.options);

    return isValid;
  }
}
