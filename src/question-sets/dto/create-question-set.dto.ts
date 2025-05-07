import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQuestionSetDto {
  @ApiProperty({
    description: 'The UUID of the client',
    example: '3-a456-426614174000',
    required: true,
    type: String,
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'The name of the question set',
    example: 'Question Set 1',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the question set',
    example: 'This is a question set for testing',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
