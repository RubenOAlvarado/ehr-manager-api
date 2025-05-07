import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetQuestionsParamsDto {
  @ApiProperty({
    description: 'The client ID',
    format: 'uuid',
    required: true,
    example: '3-a456-426614174',
  })
  @IsNotEmpty({ message: 'Client ID is required' })
  @IsUUID()
  clientId: string;

  @ApiProperty({
    description: 'The language code',
    required: true,
    example: 'en',
  })
  @IsNotEmpty({ message: 'Language code is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  languageCode: string;
}
