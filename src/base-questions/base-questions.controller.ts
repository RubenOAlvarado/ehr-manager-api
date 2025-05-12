import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { BaseQuestionsService } from './base-questions.service';
import { CreateBaseQuestionDto } from './dto/create-base-question.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseBaseQuestionsDto } from './dto/response-base-questions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateBaseQuestionDto } from './dto/update-base-question.dto';
import { BaseQuestionIdParamDto } from './dto/base-question-id.param.dto';

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

  @ApiOperation({ summary: 'Get all base questions' })
  @ApiOkResponse({
    description: 'Base questions retrieved successfully',
    type: ResponseBaseQuestionsDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.baseQuestionsService.findAll();
  }

  @ApiOperation({ summary: 'Update a base question' })
  @ApiOkResponse({
    description: 'Base question updated successfully',
    type: ResponseBaseQuestionsDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({
    type: UpdateBaseQuestionDto,
    description: 'Updated base question data',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':questionId')
  update(
    @Param() param: BaseQuestionIdParamDto,
    @Body() updateBaseQuestionDto: CreateBaseQuestionDto,
  ) {
    return this.baseQuestionsService.update(param, updateBaseQuestionDto);
  }
}
