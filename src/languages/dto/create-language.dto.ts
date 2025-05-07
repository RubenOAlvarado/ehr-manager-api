import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({
    description: 'Language code',
    example: 'en',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  @MinLength(2, { message: 'Code must be at least 2 characters long' })
  @MaxLength(2, { message: 'Code must be at most 2 characters long' })
  code: string;

  @ApiProperty({
    description: 'Language name',
    example: 'English',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  name: string;
}
