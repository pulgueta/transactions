import { ApiProperty } from '@nestjs/swagger';

import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Great product',
  })
  description: string;

  @ApiProperty({ required: false, example: new Date(), type: Date })
  createdAt: Date;

  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: true, example: 'https://example.com/image.jpg' })
  imageUrl: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Product',
  })
  name: string;

  @ApiProperty({ required: true, example: 10, type: Number })
  price: number;

  @ApiProperty({ required: true, example: 10, type: Number })
  stock: number;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
