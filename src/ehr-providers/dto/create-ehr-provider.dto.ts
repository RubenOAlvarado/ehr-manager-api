import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateEhrProviderDto {
  @ApiProperty({
    description: 'Providers code',
    example: '1234567890',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  @MinLength(5, { message: 'Code must be at least 10 characters' })
  @MaxLength(15, { message: 'Code must be at most 20 characters' })
  code: string;

  @ApiProperty({
    description: 'Providers name',
    example: 'Athena',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(5, { message: 'Name must be at least 5 characters' })
  @MaxLength(50, { message: 'Name must be at most 50 characters' })
  name: string;

  @ApiProperty({
    description: 'Providers base URL',
    example: 'athena.api.com',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Base URL is required' })
  @IsUrl()
  baseUrl: string;

  @ApiPropertyOptional({
    description: 'Providers authentication configuration',
    example: {
      clientId: '1234567890',
      clientSecret: '1234567890',
      scope: 'openid profile email',
      grantType: 'client_credentials',
    },
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsObject()
  authConfig?: Record<string, any>;
}
