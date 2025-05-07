import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EhrProviderDto {
  @ApiProperty({
    description: 'The code of the provider (hospital/clinic)',
    example: 'HOSPITAL_XYZ',
    required: true,
    type: String,
    uniqueItems: true,
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Provider code is required' })
  @IsString({ message: 'Provider code must be a string' })
  providerCode: string;
}
