import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseClientEhrProviderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  ehrProviderCode: string;

  @ApiProperty()
  isDefault: boolean;

  @ApiPropertyOptional()
  credentials?: Record<string, any>;

  @ApiPropertyOptional()
  settings?: Record<string, any>;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
