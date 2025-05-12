import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionSetDto {
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
