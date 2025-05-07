import { Test, TestingModule } from '@nestjs/testing';
import { EhrIntegrationsController } from './ehr-integrations.controller';
import { EhrIntegrationsService } from './ehr-integrations.service';

describe('EhrIntegrationsController', () => {
  let controller: EhrIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EhrIntegrationsController],
      providers: [EhrIntegrationsService],
    }).compile();

    controller = module.get<EhrIntegrationsController>(
      EhrIntegrationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
