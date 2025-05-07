import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseLanguageDto } from './dto/response-language.dto';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiOperation({ summary: 'Get all languages' })
  @ApiOkResponse({
    description: 'The list of all languages',
    type: ResponseLanguageDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiNotFoundResponse({
    description: 'Languages not found',
  })
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }
}
