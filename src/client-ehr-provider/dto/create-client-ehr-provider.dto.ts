/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientEhrProviderDto {
  @ApiProperty({
    description: 'The code of the EHR Provider',
    example: 'EHR_PROVIDER_1',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'EHR Provider code is required' })
  @IsString({ message: 'EHR Provider code must be a string' })
  ehrProviderCode: string;

  @ApiProperty({
    description: 'Indicates if the provider is the default for the client',
    example: 'true',
    type: Boolean,
    required: true,
    default: 'false',
    enum: ['true', 'false'],
  })
  @IsDefined()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  isDefault: boolean;

  @ApiPropertyOptional({
    description: 'The credentials for the provider',
    example: {
      username: 'user',
      password: 'pass',
    },
    type: Object,
    required: true,
  })
  @IsOptional()
  @IsObject()
  credentials: Record<string, any>;

  @ApiProperty({
    description: 'The settings for the provider',
    example: {
      key: 'value',
    },
    type: Object,
    required: true,
  })
  @IsOptional()
  @IsObject()
  settings: Record<string, any>;
}
