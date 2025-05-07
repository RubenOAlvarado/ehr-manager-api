import { ApiProperty } from '@nestjs/swagger';

export class ResponseClientEhrProviderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  ehrProviderCode: string;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  credentials: Record<string, any>;

  @ApiProperty()
  settings: Record<string, any>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
