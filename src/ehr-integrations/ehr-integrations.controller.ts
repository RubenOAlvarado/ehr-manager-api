import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEhrIntegrationDto } from './dto/create-ehr-integration.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEhrIntegrationsDto } from './dto/response-ehr-integrations.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { EhrMappingsService } from './ehr-mappings.service';

@ApiBearerAuth()
@ApiTags('EHR Integrations')
@Controller('ehr-integrations')
export class EhrIntegrationsController {
  constructor(private readonly ehrIntegrationsService: EhrMappingsService) {}

  @ApiOperation({ summary: 'Create a new EHR mapper' })
  @ApiCreatedResponse({
    description: 'EHR integration created successfully',
    type: ResponseEhrIntegrationsDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBadRequestResponse({
    description: 'Invalid base question ID',
  })
  @ApiBody({
    type: CreateEhrIntegrationDto,
    description: 'EHR integration data',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEhrIntegrationDto: CreateEhrIntegrationDto) {
    return this.ehrIntegrationsService.create(createEhrIntegrationDto);
  }
}
