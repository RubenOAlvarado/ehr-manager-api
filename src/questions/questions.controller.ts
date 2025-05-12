import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseQuestionDto } from './dto/response-question.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { GetQuestionsParamsDto } from './dto/getQuestions.params.dto';
import { QuestionSetIdQueryDto } from './dto/questionSetId.query.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

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
