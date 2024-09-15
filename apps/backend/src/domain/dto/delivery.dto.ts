import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Delivery } from '@prisma/client';

export class CreateDeliveryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    required: true,
    minLength: 4,
    maxLength: 16,
  })
  readonly orderId: Delivery['orderId'];
}

export class UpdateDeliveryDTO extends PartialType(CreateDeliveryDTO) {}
