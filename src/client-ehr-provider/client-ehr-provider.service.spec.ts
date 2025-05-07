import { Test, TestingModule } from '@nestjs/testing';
import { ClientEhrProviderService } from './client-ehr-provider.service';

describe('ClientEhrProviderService', () => {
  let service: ClientEhrProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientEhrProviderService],
    }).compile();

    service = module.get<ClientEhrProviderService>(ClientEhrProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
