import { Injectable, NotFoundException } from '@nestjs/common';

import { Delivery } from '@prisma/client';

import { DatabaseService } from './database.service';
import { DeliveryRepository } from '@/domain/repositories/delivery.repository';
import { CreateDeliveryDTO } from '@/domain/dto/delivery.dto';

@Injectable()
export class DeliveriesService implements DeliveryRepository {
  constructor(private db: DatabaseService) {}

  async create(delivery: CreateDeliveryDTO): Promise<Delivery> {
    const newDelivery = await this.db.delivery.create({
      data: delivery,
    });

    return newDelivery;
  }

  async findAll(): Promise<Delivery[]> {
    const deliveries = await this.db.delivery.findMany();

    if (deliveries.length === 0) {
      throw new NotFoundException('No deliveries found');
    }

    return deliveries;
  }

  async findOne(id: Delivery['id']) {
    const delivery = await this.db.delivery.findFirst({
      where: {
        id,
      },
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with id ${id} not found`);
    }

    return delivery;
  }

  async setDelivered(id: Delivery['id']): Promise<Delivery> {
    return await this.db.delivery.update({
      where: {
        id,
      },
      data: {
        status: 'DELIVERED',
      },
    });
  }
}
