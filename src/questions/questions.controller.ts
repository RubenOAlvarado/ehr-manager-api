import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseQuestionDto } from './dto/response-question.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { GetQuestionsParamsDto } from './dto/getQuestions.params.dto';
import { QuestionSetIdQueryDto } from './dto/questionSetId.query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Create a new question' })
  @ApiCreatedResponse({
    description: 'The question has been successfully created',
    type: ResponseQuestionDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: CreateQuestionDto, description: 'Question details' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @ApiOperation({
    summary: 'Get questions by clientId and languageCode',
  })
  @ApiOkResponse({
    description: 'Returns questions for the given clientId and languageCode',
    type: ResponseQuestionDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Public()
  @Get(':clientId/:languageCode')
  getQuestionsByClientIdAndLanguageCode(
    @Param() params: GetQuestionsParamsDto,
    @Query() query: QuestionSetIdQueryDto,
  ) {
    return this.questionsService.getQuestionsByClientIdAndLanguageCode(
      params,
      query,
    );
  }
}
