import { Test, TestingModule } from '@nestjs/testing';
import { EhrIntegrationsService } from './ehr-integrations.service';

describe('EhrIntegrationsService', () => {
  let service: EhrIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EhrIntegrationsService],
    }).compile();

    service = module.get<EhrIntegrationsService>(EhrIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
