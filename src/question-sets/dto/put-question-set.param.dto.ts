import { IntersectionType } from '@nestjs/swagger';
import { QuestionSetIdParamDto } from './question-set-id.param.dto';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';

export class PutQuestionSetParamDto extends IntersectionType(
  QuestionSetIdParamDto,
  ClientIdParamDto,
) {}
