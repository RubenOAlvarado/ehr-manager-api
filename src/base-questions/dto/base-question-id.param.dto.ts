import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BaseQuestionIdParamDto {
  @ApiProperty({
    description: 'The ID of the base question.',
    example: '3-a456-426614174000',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Client ID is required' })
  @IsUUID()
  questionId: string;
}
