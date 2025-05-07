import { Controller, Post, Body, Param } from '@nestjs/common';
import { PatientsResponsesService } from './patients-responses.service';
import { CreatePatientsResponseDto } from './dto/create-patients-response.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponsePatientsResponseDto } from './dto/response-patients.dto';
import { PatientIdParamDto } from 'src/shared/params/patient-id.param.dto';

@ApiTags('Patients Responses')
@Controller('patients/:patientId/patients-responses')
export class PatientsResponsesController {
  constructor(
    private readonly patientsResponsesService: PatientsResponsesService,
  ) {}

  @ApiOperation({
    summary: 'Create a new patients response',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResponsePatientsResponseDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid patientId or baseQuestionId.',
  })
  @ApiBody({
    type: CreatePatientsResponseDto,
    description: 'The data to register patients responses.',
    isArray: true,
  })
  @Post()
  create(
    @Param() param: PatientIdParamDto,
    @Body() createPatientsResponseDto: CreatePatientsResponseDto[],
  ) {
    return this.patientsResponsesService.create(
      param,
      createPatientsResponseDto,
    );
  }
}
