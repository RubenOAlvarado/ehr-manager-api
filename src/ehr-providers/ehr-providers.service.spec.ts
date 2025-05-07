import { Test, TestingModule } from '@nestjs/testing';
import { EhrProvidersService } from './ehr-providers.service';

describe('EhrProvidersService', () => {
  let service: EhrProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EhrProvidersService],
    }).compile();

    service = module.get<EhrProvidersService>(EhrProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
