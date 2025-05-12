import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class ProviderCodeParamDto {
  @ApiProperty({
    description: 'Providers code',
    example: 'ALPHA',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  @MinLength(5, { message: 'Code must be at least 10 characters' })
  @MaxLength(15, { message: 'Code must be at most 20 characters' })
  code: string;
}
