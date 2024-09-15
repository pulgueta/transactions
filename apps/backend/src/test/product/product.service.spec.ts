import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { Product } from '@prisma/client';

import { ProductsService } from '../../application/services/product.service';
import { DatabaseService } from '../../application/services/database.service';
import { CreateProductDTO } from '../../domain/dto/product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let dbService: DatabaseService;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
    imageUrl: 'https://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    dbService = module.get<DatabaseService>(DatabaseService);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDTO: CreateProductDTO = {
        name: 'New Product',
        description: 'New Description',
        price: 200,
        stock: 20,
        imageUrl: 'https://example.com/new-image.jpg',
      };

      jest
        .spyOn(dbService.product, 'create')
        .mockResolvedValue({ ...mockProduct, ...createProductDTO });

      const result = await service.create(createProductDTO);

      expect(result).toEqual({ ...mockProduct, ...createProductDTO });

      expect(dbService.product.create).toHaveBeenCalledWith({
        data: createProductDTO,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      jest
        .spyOn(dbService.product, 'findMany')
        .mockResolvedValue([mockProduct]);

      const result = await service.findAll();

      expect(result).toEqual([mockProduct]);
    });

    it('should throw NotFoundException if no products are found', async () => {
      jest.spyOn(dbService.product, 'findMany').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a product by name', async () => {
      jest.spyOn(dbService.product, 'findFirst').mockResolvedValue(mockProduct);

      const result = await service.findOne(mockProduct.name);

      expect(result).toEqual(mockProduct);

      expect(dbService.product.findFirst).toHaveBeenCalledWith({
        where: { name: mockProduct.name },
      });
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(dbService.product, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('Non-existent Product')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findById', () => {
    it('should return a product by id', async () => {
      jest
        .spyOn(dbService.product, 'findUnique')
        .mockResolvedValue(mockProduct);

      const result = await service.findById(mockProduct.id);

      expect(result).toEqual(mockProduct);

      expect(dbService.product.findUnique).toHaveBeenCalledWith({
        where: { id: mockProduct.id },
      });
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(dbService.product, 'findUnique').mockResolvedValue(null);

      await expect(service.findById('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('decreaseStock', () => {
    it('should decrease the stock of a product', async () => {
      const updatedProduct = { ...mockProduct, stock: mockProduct.stock - 2 };

      jest.spyOn(dbService.product, 'update').mockResolvedValue(updatedProduct);

      const result = await service.decreaseStock(mockProduct.id, 2);

      expect(result).toEqual(updatedProduct);

      expect(dbService.product.update).toHaveBeenCalledWith({
        where: { id: mockProduct.id },
        data: { stock: { decrement: 2 } },
      });
    });
  });

  describe('increaseStock', () => {
    it('should increase the stock of a product', async () => {
      const updatedProduct = { ...mockProduct, stock: mockProduct.stock + 3 };

      jest.spyOn(dbService.product, 'update').mockResolvedValue(updatedProduct);

      const result = await service.increaseStock(mockProduct.id, 3);

      expect(result).toEqual(updatedProduct);

      expect(dbService.product.update).toHaveBeenCalledWith({
        where: { id: mockProduct.id },
        data: { stock: { increment: 3 } },
      });
    });
  });
});
