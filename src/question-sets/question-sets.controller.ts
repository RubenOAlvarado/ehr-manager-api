import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { QuestionSetsService } from './question-sets.service';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseQuestionSetDto } from './dto/response-question-set.dto';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

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
}
