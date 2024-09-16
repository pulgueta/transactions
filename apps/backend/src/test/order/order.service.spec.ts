import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { Delivery, Order, User } from '@prisma/client';

import { OrdersService } from '../../application/services/order.service';
import { DatabaseService } from '../../application/services/database.service';
import { UsersService } from '../../application/services/user.service';
import { DeliveriesService } from '../../application/services/delivery.service';
import { ProductsService } from '../../application/services/product.service';
import { Argon2HashingService } from '../../application/services/hashing.service';
import { CreateOrderDTO, UpdateOrderDTO } from '../../domain/dto/order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let dbService: DatabaseService;
  let usersService: UsersService;
  let deliveriesService: DeliveriesService;
  let productsService: ProductsService;
  let hashingService: Argon2HashingService;

  const mockUser: User = {
    id: 'user1',
    name: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrder: Order = {
    id: '1',
    status: 'PENDING',
    nameOnCard: mockUser.name,
    cardInfo: '4242424242424242',
    address: '123 Main St',
    city: 'Springfield',
    cvv: '123',
    expiryDate: '12/34',
    last4Digits: '4242',
    orderTotal: 50000,
    state: 'Santander',
    zip: '12345',
    userId: mockUser.id,
    productId: 'product1',
    amount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDelivery: Delivery = {
    id: '1',
    orderId: mockOrder.id,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: DatabaseService,
          useValue: {
            order: {
              findMany: jest.fn(),
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            updateUserOrder: jest.fn(),
          },
        },
        {
          provide: DeliveriesService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            decreaseStock: jest.fn(),
          },
        },
        {
          provide: Argon2HashingService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    dbService = module.get<DatabaseService>(DatabaseService);
    usersService = module.get<UsersService>(UsersService);
    deliveriesService = module.get<DeliveriesService>(DeliveriesService);
    productsService = module.get<ProductsService>(ProductsService);
    hashingService = module.get<Argon2HashingService>(Argon2HashingService);
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      jest.spyOn(dbService.order, 'findMany').mockResolvedValue([mockOrder]);

      const result = await service.findAll(mockUser.name);

      expect(result).toEqual([mockOrder]);

      expect(dbService.order.findMany).toHaveBeenCalledWith({
        where: { nameOnCard: mockOrder.nameOnCard },
        include: { Delivery: true, product: true },
      });
    });

    it('should throw NotFoundException if no orders are found', async () => {
      jest.spyOn(dbService.order, 'findMany').mockResolvedValue([]);

      await expect(service.findAll('John Doe')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createInitialOrder', () => {
    it('should create an initial order', async () => {
      jest.spyOn(dbService.order, 'create').mockResolvedValue(mockOrder);

      const result = await service.createInitialOrder('John Doe');

      expect(result).toEqual(mockOrder);
      expect(dbService.order.create).toHaveBeenCalledWith({
        data: {
          status: 'PENDING',
          user: {
            create: {
              name: 'John Doe',
            },
          },
        },
      });
    });
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDTO: CreateOrderDTO = {
        nameOnCard: mockUser.name,
        cardInfo: mockOrder.cardInfo,
        product: 'product1',
        amount: 1,
        address: mockOrder.address,
        city: mockOrder.city,
        state: mockOrder.state,
        zip: mockOrder.zip,
        cvv: mockOrder.cvv,
        expiryDate: mockOrder.expiryDate,
        last4Digits: mockOrder.last4Digits,
        orderTotal: mockOrder.orderTotal,
        status: 'PENDING',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(service, 'update').mockResolvedValue(mockOrder);
      jest.spyOn(usersService, 'updateUserOrder').mockResolvedValue(mockUser);
      jest.spyOn(deliveriesService, 'create').mockResolvedValue(mockDelivery);

      const result = await service.create('1', createOrderDTO);

      expect(result).toEqual(mockOrder);
      expect(usersService.findOne).toHaveBeenCalledWith('John Doe');
      expect(service.update).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createOrderDTO,
          userId: 'user1',
          status: 'COMPLETED',
        }),
        '1',
      );
      expect(usersService.updateUserOrder).toHaveBeenCalledWith(
        mockOrder,
        'user1',
      );
      expect(deliveriesService.create).toHaveBeenCalledWith({ orderId: '1' });
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      jest.spyOn(dbService.order, 'findFirst').mockResolvedValue(mockOrder);

      const result = await service.findOne('1');

      expect(result).toEqual(mockOrder);
      expect(dbService.order.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if order is not found', async () => {
      jest.spyOn(dbService.order, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('cancel', () => {
    it('should cancel an order', async () => {
      const cancelledOrder: Order = { ...mockOrder, status: 'CANCELLED' };

      jest.spyOn(dbService.order, 'update').mockResolvedValue(cancelledOrder);

      const result = await service.cancel('1');

      expect(result).toEqual(cancelledOrder);
      expect(dbService.order.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: 'CANCELLED' },
      });
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const updateOrderDTO: UpdateOrderDTO = {
        nameOnCard: 'Jane Doe',
        cardInfo: mockOrder.cardInfo,
        product: 'product2',
        amount: 2,
      };

      const updatedOrder = { ...mockOrder, ...updateOrderDTO };
      jest.spyOn(dbService.order, 'update').mockResolvedValue(updatedOrder);
      jest.spyOn(hashingService, 'hash').mockResolvedValue('hashed_card_info');
      jest.spyOn(productsService, 'decreaseStock').mockResolvedValue({
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 'product2',
        name: 'Product 2',
        description: 'Product 2 Description',
        price: 25000,
        stock: 8,
        imageUrl: 'product2.jpg',
      });

      const result = await service.update(updateOrderDTO, '1');

      expect(result).toEqual(updatedOrder);
      expect(dbService.order.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: expect.objectContaining({
          nameOnCard: 'Jane Doe',
          cardInfo: 'hashed_card_info',
          productId: 'product2',
        }),
      });
      expect(hashingService.hash).toHaveBeenCalledWith(mockOrder.cardInfo);
      expect(productsService.decreaseStock).toHaveBeenCalledWith('product2', 2);
    });
  });
});
