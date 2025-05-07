import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client (hospital/clinic)',
    example: 'Hospital XYZ',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiPropertyOptional({
    description: 'External identifier for the client',
    example: 'EXT123',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'External ID must be a string' })
  externalId?: string;

  @ApiProperty({
    description: 'Preferred EHR system for the client',
    example: 'Epic',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Preferred EHR is required' })
  @IsString({ message: 'Preferred EHR must be a string' })
  @IsAlphanumeric()
  preferredEhr: string;

  @ApiProperty({
    description: 'Default language for the client',
    example: 'en',
    required: false,
    type: String,
    default: 'en',
  })
  @IsString({ message: 'Default language must be a string' })
  defaultLanguage: string = 'en';
}
