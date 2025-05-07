import { Test, TestingModule } from '@nestjs/testing';
import { BaseQuestionsService } from './base-questions.service';

describe('BaseQuestionsService', () => {
  let service: BaseQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseQuestionsService],
    }).compile();

    service = module.get<BaseQuestionsService>(BaseQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
