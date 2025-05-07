import { Test, TestingModule } from '@nestjs/testing';
import { BaseQuestionsController } from './base-questions.controller';
import { BaseQuestionsService } from './base-questions.service';

describe('BaseQuestionsController', () => {
  let controller: BaseQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseQuestionsController],
      providers: [BaseQuestionsService],
    }).compile();

    controller = module.get<BaseQuestionsController>(BaseQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
