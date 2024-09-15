import { ApiProperty } from '@nestjs/swagger';

import { $Enums, Order } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: '123 Main St',
  })
  address: string;

  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 16,
    example: '1111 2222 3333 4444',
  })
  cardInfo: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Jackson',
  })
  city: string;

  @ApiProperty({ required: true, minLength: 3, maxLength: 4, example: '123' })
  cvv: string;

  @ApiProperty({ required: true, example: '12/32' })
  expiryDate: string;

  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  last4Digits: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'John Doe',
  })
  nameOnCard: string;

  @ApiProperty({ required: true })
  orderTotal: number;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Santander',
  })
  state: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    enum: $Enums.OrderStatus,
  })
  status: $Enums.OrderStatus;

  @ApiProperty({ required: false })
  userId: string;

  @ApiProperty({ required: true, example: '12345' })
  zip: string;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @ApiProperty({ required: false })
  productId: string | null;

  @ApiProperty({ required: false })
  amount: number | null;
}
