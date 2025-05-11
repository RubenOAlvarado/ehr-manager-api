import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
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
import { ResponseClientDto } from './dto/response-client.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiCreatedResponse({
    description: 'The client has been successfully created.',
    type: ResponseClientDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBody({ type: CreateClientDto, description: 'The client to create.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @ApiOkResponse({
    description: 'The clients have been successfully retrieved.',
    type: ResponseClientDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiNotFoundResponse({ description: 'No clients found.' })
  @Public()
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiOkResponse({
    description: 'The client has been successfully updated.',
    type: ResponseClientDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiNotFoundResponse({ description: 'Client not found.' })
  @ApiBadRequestResponse({ description: 'Invalid data.' })
  @ApiBody({ type: UpdateClientDto, description: 'The client to update.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':clientId')
  update(
    @Param() params: ClientIdParamDto,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(params, updateClientDto);
  }
}
