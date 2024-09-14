import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: User['name'];
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
