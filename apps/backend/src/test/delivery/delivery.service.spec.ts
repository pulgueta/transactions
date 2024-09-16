import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { Delivery } from '@prisma/client';

import { DeliveriesService } from '../../application/services/delivery.service';
import { DatabaseService } from '../../application/services/database.service';
import { CreateDeliveryDTO } from '../../domain/dto/delivery.dto';

describe('DeliveriesService', () => {
  let service: DeliveriesService;
  let dbService: DatabaseService;

  const mockDelivery: Delivery = {
    id: '1',
    orderId: 'order1',
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveriesService,
        {
          provide: DatabaseService,
          useValue: {
            delivery: {
              findMany: jest.fn(),
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeliveriesService>(DeliveriesService);
    dbService = module.get<DatabaseService>(DatabaseService);
  });

  describe('create', () => {
    it('should create a new delivery', async () => {
      const createDeliveryDTO: CreateDeliveryDTO = {
        orderId: 'order1',
      };

      jest.spyOn(dbService.delivery, 'create').mockResolvedValue(mockDelivery);

      const result = await service.create(createDeliveryDTO);

      expect(result).toEqual(mockDelivery);

      expect(dbService.delivery.create).toHaveBeenCalledWith({
        data: createDeliveryDTO,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of deliveries', async () => {
      jest
        .spyOn(dbService.delivery, 'findMany')
        .mockResolvedValue([mockDelivery]);

      const result = await service.findAll();

      expect(result).toEqual([mockDelivery]);

      expect(dbService.delivery.findMany).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no deliveries are found', async () => {
      jest.spyOn(dbService.delivery, 'findMany').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a delivery', async () => {
      jest
        .spyOn(dbService.delivery, 'findFirst')
        .mockResolvedValue(mockDelivery);

      const result = await service.findOne('1');

      expect(result).toEqual(mockDelivery);

      expect(dbService.delivery.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if delivery is not found', async () => {
      jest.spyOn(dbService.delivery, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('setDelivered', () => {
    it('should set a delivery as delivered', async () => {
      const deliveredDelivery: Delivery = {
        ...mockDelivery,
        status: 'DELIVERED',
      };

      jest
        .spyOn(dbService.delivery, 'update')
        .mockResolvedValue(deliveredDelivery);

      const result = await service.setDelivered('1');

      expect(result).toEqual(deliveredDelivery);

      expect(dbService.delivery.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: 'DELIVERED' },
      });
    });
  });
});
