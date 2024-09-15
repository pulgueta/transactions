import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Product } from '@prisma/client';

export class CreateProductDTO {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: Product['name'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 16,
  })
  readonly imageUrl: Product['imageUrl'];

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: Number.MAX_SAFE_INTEGER,
    example: 5,
  })
  readonly stock: Product['stock'];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
  })
  readonly description: Product['description'];

  @IsNumber()
  @IsNotEmpty()
  @Min(1500)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty({ required: true })
  readonly price: Product['price'];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
