import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'External identifier for the patient',
    example: 'EXT-12345',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiProperty({
    description: 'Basic information about the patient',
    example: { firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01' },
    type: Object,
    required: true,
    default: {},
  })
  @IsNotEmpty()
  @IsObject()
  basicInfo: Record<string, any>;

  @ApiProperty({
    description: 'Preferred language code for the patient',
    example: 'en',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}
