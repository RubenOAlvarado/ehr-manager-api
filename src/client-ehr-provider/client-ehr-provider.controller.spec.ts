import { Test, TestingModule } from '@nestjs/testing';
import { ClientEhrProviderController } from './client-ehr-provider.controller';
import { ClientEhrProviderService } from './client-ehr-provider.service';

describe('ClientEhrProviderController', () => {
  let controller: ClientEhrProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientEhrProviderController],
      providers: [ClientEhrProviderService],
    }).compile();

    controller = module.get<ClientEhrProviderController>(
      ClientEhrProviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
