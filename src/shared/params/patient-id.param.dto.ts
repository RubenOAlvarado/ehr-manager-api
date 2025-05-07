import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class PatientIdParamDto {
  @ApiProperty({
    description: 'The patient ID',
    example: '3-a456-426614174000',
    type: String,
    required: true,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Client ID is required' })
  @IsUUID()
  patientId: string;
}
