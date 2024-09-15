import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '@prisma/client';

import { DatabaseService } from './database.service';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { CreateProductDTO } from '@/domain/dto/product.dto';

@Injectable()
export class ProductsService implements ProductRepository {
  constructor(private db: DatabaseService) {}

  async create(product: CreateProductDTO): Promise<Product> {
    const newProduct = await this.db.product.create({
      data: product,
    });

    return newProduct;
  }

  async findAll() {
    const products = await this.db.product.findMany();

    if (products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async findOne(name: Product['name']) {
    const product = await this.db.product.findFirst({
      where: {
        name,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findById(id: Product['id']) {
    const product = await this.db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async decreaseStock(productId: Product['id'], quantity: number) {
    const p = await this.db.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    return p;
  }

  async increaseStock(productId: Product['id'], quantity: number) {
    const p = await this.db.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });

    return p;
  }
}
