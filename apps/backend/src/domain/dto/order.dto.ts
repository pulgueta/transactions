import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Order, OrderStatus } from '@prisma/client';

export class CreateOrderProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly stock: number;
}

export class CreateOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly orderTotal: Order['orderTotal'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 16,
    example: '1111 2222 3333 4444',
  })
  readonly cardInfo: Order['cardInfo'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Jackson',
  })
  readonly city: Order['city'];

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(4)
  @ApiProperty({ required: true, minLength: 3, maxLength: 4, example: '123' })
  readonly cvv: Order['cvv'];

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  @ApiProperty({ required: true, example: '12/32' })
  readonly expiryDate: Order['expiryDate'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'John Doe',
  })
  readonly nameOnCard: Order['nameOnCard'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: '123 Main St',
  })
  readonly address: Order['address'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Santander',
  })
  readonly state: Order['state'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: '12345',
  })
  readonly zip: Order['zip'];

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 4,
    example: '2800',
  })
  readonly last4Digits: Order['last4Digits'];

  @ApiProperty({
    required: false,
    example: 'COMPLETED',
    enum: OrderStatus,
  })
  readonly status: Order['status'];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDTO)
  @ApiProperty({ required: true, type: [CreateOrderProductDTO] })
  readonly products: CreateOrderProductDTO[];
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
