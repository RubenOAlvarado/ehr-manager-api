import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsValidEhrProviderConstraint } from 'src/shared/validators/is-valid-ehr-provider.validator';

export class CreateEhrIntegrationDto {
  @ApiProperty({
    description: 'Base question ID',
    example: '64822214-2198-4331-919d-7b0c62e0a481',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Base question ID is required' })
  @IsUUID()
  baseQuestionId: string;

  @ApiProperty({
    description: 'EHR provider code',
    example: 'openEHR',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'EHR provider code is required' })
  @IsString()
  @Validate(IsValidEhrProviderConstraint)
  ehrProviderCode: string;

  @ApiProperty({
    description: 'EHR field path',
    example: 'clinical_data/observations',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'EHR field path is required' })
  @IsString()
  ehrFieldPath: string;

  @ApiProperty({
    description: 'EHR field type',
    example: 'string',
    type: String,
    required: true,
    enum: ['string', 'number', 'boolean', 'array', 'object'],
  })
  @IsNotEmpty({ message: 'EHR field type is required' })
  @IsIn(['string', 'number', 'boolean', 'array', 'object'], {
    message: 'Invalid EHR field type',
  })
  ehrFieldType: 'string' | 'number' | 'boolean' | 'array' | 'object';

  @ApiPropertyOptional({
    description: 'Transformation rule',
    example: '{"key1": "value1", "key2": "value2"}',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  transformationRule?: string;

  @ApiProperty({
    description: 'EHR endpoint',
    example: 'URL_ADDRESS.example.com',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'EHR endpoint is required' })
  @IsUrl()
  ehrEndpoint: string;
}
