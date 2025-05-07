import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ClientEhrProviderService } from './client-ehr-provider.service';
import { CreateClientEhrProviderDto } from './dto/create-client-ehr-provider.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { ResponseClientEhrProviderDto } from './dto/response-client-eht-provider.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('Client Ehr Providers')
@ApiBearerAuth()
@Controller('/clients/:clientId/ehr-providers')
export class ClientEhrProviderController {
  constructor(
    private readonly clientEhrProviderService: ClientEhrProviderService,
  ) {}

  @ApiOperation({
    summary: 'Create a new client ehr provider',
  })
  @ApiBody({
    type: CreateClientEhrProviderDto,
    description: 'The client ehr providers list',
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'The client ehr providers list',
    type: ResponseClientEhrProviderDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({ description: 'Invalid client or provider ID' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param() param: ClientIdParamDto,
    @Body() createClientEhrProviderDto: CreateClientEhrProviderDto[],
  ) {
    return this.clientEhrProviderService.create(
      param,
      createClientEhrProviderDto,
    );
  }

  @ApiOperation({
    summary: 'Get all client ehr providers',
  })
  @ApiOkResponse({
    description: 'The client ehr providers list',
    type: ResponseClientEhrProviderDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiNotFoundResponse({ description: 'Client providers not found' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param() param: ClientIdParamDto) {
    return this.clientEhrProviderService.findAll(param);
  }
}
