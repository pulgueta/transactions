import { Module } from '@nestjs/common';

import { DeliveriesService } from '@/application/services/delivery.service';

@Module({
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveryModule {}
