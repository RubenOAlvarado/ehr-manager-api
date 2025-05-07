import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ClientIdParamDto {
  @ApiProperty({
    description: 'The client ID of the patient',
    example: '3-a456-426614174000',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Client ID is required' })
  @IsUUID()
  clientId: string;
}
