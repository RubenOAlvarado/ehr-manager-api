import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { EhrProvidersService } from './ehr-providers.service';
import { CreateEhrProviderDto } from './dto/create-ehr-provider.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EhrProviderResponseDto } from './dto/response-ehr-provider.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ProviderCodeParamDto } from './dto/provider-code.param.dto';

@ApiTags('EHR Providers')
@ApiBearerAuth()
@Controller('ehr-providers')
export class EhrProvidersController {
  constructor(private readonly ehrProvidersService: EhrProvidersService) {}

  @ApiOperation({ summary: 'Create a new EHR Provider' })
  @ApiCreatedResponse({
    description: 'The provder has been successfully created.',
    type: EhrProviderResponseDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBody({
    type: CreateEhrProviderDto,
    description: 'The provider to create.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEhrProviderDto: CreateEhrProviderDto) {
    return this.ehrProvidersService.create(createEhrProviderDto);
  }

  @ApiOperation({ summary: 'Get all EHR Providers' })
  @ApiCreatedResponse({
    description: 'The provders has been successfully retrieved.',
    type: EhrProviderResponseDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiNotFoundResponse({ description: 'Providers not found.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ehrProvidersService.findAll();
  }

  @ApiOperation({ summary: 'Update an EHR Provider' })
  @ApiCreatedResponse({
    description: 'The provider has been successfully updated.',
    type: EhrProviderResponseDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiNotFoundResponse({ description: 'Provider not found.' })
  @ApiBody({
    type: CreateEhrProviderDto,
    description: 'The provider data to update.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':code')
  update(
    @Param() param: ProviderCodeParamDto,
    @Body() updateEhrProviderDto: CreateEhrProviderDto,
  ) {
    return this.ehrProvidersService.update(param, updateEhrProviderDto);
  }
}
