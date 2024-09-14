import { Product } from '@prisma/client';

import { CreateProductDTO } from '../dto/product.dto';

export interface ProductRepository {
  create(product: CreateProductDTO): Promise<Product>;
  findOne(name: CreateProductDTO['name']): Promise<Product | null>;
  findById(id: Product['id']): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  decreaseStock(productId: Product['id'], quantity: number): Promise<Product>;
  increaseStock(productId: Product['id'], quantity: number): Promise<Product>;
}
