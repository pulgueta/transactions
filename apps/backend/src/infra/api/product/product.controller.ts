import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { ProductsService } from '../../../application/services/product.service';
import { CreateProductDTO } from '../../../domain/dto/product.dto';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'No products found' })
  async getProducts() {
    const products = await this.productsService.findAll();

    return products;
  }

  @Post('/')
  @ApiBody({ type: ProductEntity })
  @ApiBadRequestResponse({ description: 'Invalid data sent' })
  async createProduct(@Body() product: CreateProductDTO) {
    if (!product) {
      throw new BadRequestException('Invalid data sent');
    }

    const createdProduct = await this.productsService.create(product);

    return createdProduct;
  }
}
