import { PartialType } from '@nestjs/swagger';
import { CreatePatientsResponseDto } from './create-patients-response.dto';

export class UpdatePatientsResponseDto extends PartialType(
  CreatePatientsResponseDto,
) {}
