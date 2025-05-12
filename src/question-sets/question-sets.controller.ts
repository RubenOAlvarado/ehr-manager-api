import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Put,
} from '@nestjs/common';
import { QuestionSetsService } from './question-sets.service';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
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
import { ResponseQuestionSetDto } from './dto/response-question-set.dto';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PutQuestionSetParamDto } from './dto/put-question-set.param.dto';
import { UpdateQuestionSetDto } from './dto/update-question-set.dto';

@ApiBearerAuth()
@ApiTags('Questions sets')
@Controller('clients/:clientId/question-sets')
export class QuestionSetsController {
  constructor(private readonly questionSetsService: QuestionSetsService) {}

  @ApiOperation({ summary: 'Create a new question set' })
  @ApiCreatedResponse({
    description: 'The question set has been successfully created.',
    type: ResponseQuestionSetDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({ description: 'Invalid client ID.' })
  @ApiBody({
    type: CreateQuestionSetDto,
    description: 'The question set data.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createQuestionSetDto: CreateQuestionSetDto,
    @Param() param: ClientIdParamDto,
  ) {
    return this.questionSetsService.create(createQuestionSetDto, param);
  }

  @ApiOperation({ summary: 'Get all question sets for a client' })
  @ApiOkResponse({
    description: 'Retrieved all question sets successfully.',
    type: ResponseQuestionSetDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({ description: 'Invalid client ID.' })
  @ApiNotFoundResponse({ description: 'No question sets found.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param() param: ClientIdParamDto) {
    return this.questionSetsService.findAll(param);
  }

  @ApiOperation({ summary: 'Update a question set' })
  @ApiOkResponse({
    description: 'The question set has been successfully updated.',
    type: ResponseQuestionSetDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @ApiBadRequestResponse({
    description: 'Invalid client ID or question set data.',
  })
  @ApiBody({
    type: UpdateQuestionSetDto,
    description: 'The updated question set data.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':questionSetId')
  update(
    @Param() params: PutQuestionSetParamDto,
    @Body() updateQuestionSetDto: UpdateQuestionSetDto,
  ) {
    return this.questionSetsService.update(params, updateQuestionSetDto);
  }
}
