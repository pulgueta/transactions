import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { Product } from '@prisma/client';

import { ProductController } from '../../infra/api/product/product.controller';
import { ProductsService } from '../../application/services/product.service';
import { CreateProductDTO } from '../../domain/dto/product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let productsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    const mockProductsService = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productsService = module.get(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const result: Product[] = [
        {
          id: '2',
          name: 'Product 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Product 1 Description',
          imageUrl: 'https://example.com/image1.jpg',
          price: 100,
          stock: 10,
        },
      ];

      productsService.findAll.mockResolvedValue(result);

      expect(await controller.getProducts()).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDTO = {
        name: 'New Product',
        price: 10,
        stock: 100,
        description: 'New Description',
        imageUrl: 'https://example.com/image.jpg',
      };

      const result = {
        id: '1',
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      productsService.create.mockResolvedValue(result);

      expect(await controller.createProduct(createProductDto)).toBe(result);
    });

    it('should throw BadRequestException if no product data is provided', async () => {
      // @ts-expect-error Expects to throw an error as the argument is null
      await expect(controller.createProduct(null)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
