import { Test, TestingModule } from '@nestjs/testing';
import { PatientsResponsesController } from './patients-responses.controller';
import { PatientsResponsesService } from './patients-responses.service';

describe('PatientsResponsesController', () => {
  let controller: PatientsResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsResponsesController],
      providers: [PatientsResponsesService],
    }).compile();

    controller = module.get<PatientsResponsesController>(
      PatientsResponsesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
