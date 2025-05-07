import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseClientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  externalId?: string;

  @ApiProperty()
  preferredEhr: string;

  @ApiProperty()
  defaultLanguage: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
