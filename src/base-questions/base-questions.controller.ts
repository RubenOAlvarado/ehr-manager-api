import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BaseQuestionsService } from './base-questions.service';
import { CreateBaseQuestionDto } from './dto/create-base-question.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseBaseQuestionsDto } from './dto/response-base-questions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiBearerAuth()
@ApiTags('Base Questions')
@Controller('base-questions')
export class BaseQuestionsController {
  constructor(private readonly baseQuestionsService: BaseQuestionsService) {}

  @ApiOperation({ summary: 'Create a new base question' })
  @ApiCreatedResponse({
    description: 'Base question created successfully',
    type: ResponseBaseQuestionsDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateBaseQuestionDto, description: 'Base question data' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBaseQuestionDto: CreateBaseQuestionDto) {
    return this.baseQuestionsService.create(createBaseQuestionDto);
  }
}
