import { Controller, Post, Body, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponsePatientDto } from './dto/response-patient.dto';
import { ClientIdParamDto } from '../shared/params/client-id.param.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('Patients')
@Controller('clients/:clientId/patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: 'Create a new patient' })
  @ApiCreatedResponse({
    description: 'The patient has been successfully created.',
    type: ResponsePatientDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({ description: 'Invalid clientId' })
  @ApiBody({ type: CreatePatientDto, description: 'The patient to create.' })
  @Public()
  @Post()
  create(
    @Body() createPatientDto: CreatePatientDto,
    @Param() param: ClientIdParamDto,
  ) {
    return this.patientsService.create(createPatientDto, param);
  }
}
