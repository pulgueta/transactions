import { Delivery } from '@prisma/client';

import { CreateDeliveryDTO } from '../dto/delivery.dto';

export interface DeliveryRepository {
  create(delivery: CreateDeliveryDTO): Promise<Delivery>;
  findAll(): Promise<Delivery[]>;
  findOne(id: Delivery['id']): Promise<Delivery | null>;
  setDelivered(id: Delivery['id']): Promise<Delivery>;
}
