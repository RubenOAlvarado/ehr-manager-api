import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePatientsResponseDto {
  @ApiProperty({
    description: 'The ID of the base question',
    example: '3-a456-426614174000',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Base question ID is required' })
  @IsUUID()
  baseQuestionId: string;

  @ApiProperty({
    description: 'The response to the base question',
    example: 'Yes',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Response is required' })
  @IsString()
  response: string;

  @ApiPropertyOptional({
    description: 'The metadata for the response',
    example: { key: 'value' },
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsObject()
  responseMeta?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'The ID of the session',
    example: '3-a456-426614174000',
    type: String,
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
