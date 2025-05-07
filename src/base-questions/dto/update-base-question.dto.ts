import { PartialType } from '@nestjs/swagger';
import { CreateBaseQuestionDto } from './create-base-question.dto';

export class UpdateBaseQuestionDto extends PartialType(CreateBaseQuestionDto) {}
