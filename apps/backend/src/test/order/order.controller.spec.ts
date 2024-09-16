import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { OrderController } from '../../infra/api/order/order.controller';
import { CreateOrderDTO } from '../../domain/dto/order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { FetcherService } from '../../application/services/fetcher.service';
import { OrdersService } from '../../application/services/order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let ordersService: OrdersService;
  let fetcherService: FetcherService;

  const mockOrders = [
    {
      id: '1',
      status: 'COMPLETED',
      nameOnCard: 'John Doe',
      cardInfo: '4242424242424242',
      userId: 'user1',
      productId: 'product1',
      amount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      address: '123 Main St',
      city: 'San Francisco',
      cvv: '123',
      expiryDate: '12/25',
      last4Digits: '4242',
      orderTotal: 50000,
      state: 'Santander',
      zip: '94105',
    },
  ];

  const mockOrder: Awaited<ReturnType<typeof ordersService.findOne>> = {
    id: '1',
    status: 'COMPLETED',
    nameOnCard: 'John Doe',
    cardInfo: '4242424242424242',
    userId: 'user1',
    productId: 'product1',
    amount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    address: '123 Main St',
    city: 'San Francisco',
    cvv: '123',
    expiryDate: '12/25',
    last4Digits: '4242',
    orderTotal: 50000,
    state: 'Santander',
    zip: '94105',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            findAll: jest.fn(),
            createInitialOrder: jest.fn(),
            create: jest.fn(),
            cancel: jest.fn(),
          },
        },
        {
          provide: FetcherService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    ordersService = module.get<OrdersService>(OrdersService);
    fetcherService = module.get<FetcherService>(FetcherService);
  });

  describe('getAllOrders', () => {
    it('should return an array of orders', async () => {
      jest
        .spyOn(ordersService, 'findAll')
        .mockResolvedValue(
          mockOrders as Awaited<ReturnType<typeof ordersService.findAll>>,
        );

      const result = await controller.getAllOrders('John Doe');

      expect(result).toEqual([mockOrder]);

      expect(ordersService.findAll).toHaveBeenCalledWith('John Doe');
    });
  });

  describe('createOrder', () => {
    const mockCreateOrderDTO: CreateOrderDTO = {
      status: 'COMPLETED',
      nameOnCard: 'John Doe',
      cardInfo: '4242424242424242',
      amount: 1,
      product: 'product1',
      address: '123 Main St',
      city: 'San Francisco',
      cvv: '123',
      expiryDate: '12/25',
      last4Digits: '4242',
      orderTotal: 50000,
      state: 'Santander',
      zip: '94105',
    };

    const mockAcceptanceTokenResponse = {
      data: {
        presigned_acceptance: {
          acceptance_token: 'mock_acceptance_token',
        },
      },
    };

    const mockCardTokenResponse = {
      data: {
        id: 'mock_card_token',
      },
    };

    const mockTransactionResponse = {
      data: {
        id: 'mock_transaction_id',
        status: 'APPROVED',
      },
    };

    it('should create an order successfully', async () => {
      jest
        .spyOn(ordersService, 'createInitialOrder')
        .mockResolvedValue({ id: 'initial_order_id' } as OrderEntity);

      jest
        .spyOn(fetcherService, 'get')
        .mockResolvedValueOnce(mockAcceptanceTokenResponse)
        .mockResolvedValueOnce(mockTransactionResponse);

      jest
        .spyOn(fetcherService, 'post')
        .mockResolvedValueOnce(mockCardTokenResponse)
        .mockResolvedValueOnce(mockTransactionResponse);

      jest.spyOn(ordersService, 'create').mockResolvedValue(mockOrder);

      const result = await controller.createOrder(mockCreateOrderDTO);

      expect(result).toEqual(mockOrder);
      expect(ordersService.createInitialOrder).toHaveBeenCalledWith('John Doe');
      expect(fetcherService.get).toHaveBeenCalledTimes(2);
      expect(fetcherService.post).toHaveBeenCalledTimes(2);
      expect(ordersService.create).toHaveBeenCalledWith(
        'initial_order_id',
        mockCreateOrderDTO,
      );
    });

    it('should throw BadRequestException if order is null', async () => {
      // @ts-expect-error Don't pass any body to the method
      await expect(controller.createOrder(null)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if transaction is not approved', async () => {
      jest
        .spyOn(ordersService, 'createInitialOrder')
        .mockResolvedValue({ id: 'initial_order_id' } as OrderEntity);
      jest
        .spyOn(fetcherService, 'get')
        .mockResolvedValueOnce(mockAcceptanceTokenResponse)
        .mockResolvedValueOnce({
          data: { ...mockTransactionResponse.data, status: 'DECLINED' },
        });
      jest
        .spyOn(fetcherService, 'post')
        .mockResolvedValueOnce(mockCardTokenResponse)
        .mockResolvedValueOnce(mockTransactionResponse);
      jest.spyOn(ordersService, 'cancel').mockResolvedValue({} as OrderEntity);

      await expect(controller.createOrder(mockCreateOrderDTO)).rejects.toThrow(
        BadRequestException,
      );
      expect(ordersService.cancel).toHaveBeenCalledWith('initial_order_id');
    });
  });
});
