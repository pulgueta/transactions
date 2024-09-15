import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { OrderEntity } from '@/domain/entities/order.entity';
import { ProductsService } from '@/application/services/product.service';
import { CreateProductDTO } from '@/domain/dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @ApiOkResponse({ type: OrderEntity })
  async getProducts() {
    const products = await this.productsService.findAll();

    return products;
  }

  @Post('/')
  @ApiBadRequestResponse({ description: 'Invalid data sent' })
  async createProduct(@Body() product: CreateProductDTO) {
    if (!product) {
      throw new BadRequestException('Invalid data sent');
    }

    const createdProduct = await this.productsService.create(product);

    return createdProduct;
  }
}
