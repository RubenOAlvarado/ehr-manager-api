import { Test, TestingModule } from '@nestjs/testing';
import { PatientsResponsesService } from './patients-responses.service';

describe('PatientsResponsesService', () => {
  let service: PatientsResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsResponsesService],
    }).compile();

    service = module.get<PatientsResponsesService>(PatientsResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
