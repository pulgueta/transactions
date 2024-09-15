import { Module } from '@nestjs/common';

import { FetcherService } from '../../application/services/fetcher.service';

@Module({
  providers: [FetcherService],
  exports: [FetcherService],
})
export class FetcherModule {}
