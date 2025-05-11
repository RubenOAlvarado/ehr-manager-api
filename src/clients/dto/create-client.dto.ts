import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateClientEhrProviderDto } from 'src/client-ehr-provider/dto/create-client-ehr-provider.dto';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client (hospital/clinic)',
    example: 'Hospital XYZ',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiPropertyOptional({
    description: 'External identifier for the client',
    example: 'EXT123',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'External ID must be a string' })
  externalId?: string;

  @ApiProperty({
    description: 'Default language for the client',
    example: 'en',
    required: false,
    type: String,
    default: 'en',
  })
  @IsString({ message: 'Default language must be a string' })
  defaultLanguage: string = 'en';

  @ApiPropertyOptional({
    description: 'List of EHR providers associated with the client',
    type: CreateClientEhrProviderDto,
    required: false,
    isArray: true,
    example: [
      {
        ehrProviderCode: 'Atlas',
        isDefault: true,
      },
      {
        ehrProviderCode: 'General Ehr',
        isDefault: false,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientEhrProviderDto)
  ehrProviders?: CreateClientEhrProviderDto[];
}
