import { Test, TestingModule } from '@nestjs/testing';
import { EhrProvidersController } from './ehr-providers.controller';
import { EhrProvidersService } from './ehr-providers.service';

describe('EhrProvidersController', () => {
  let controller: EhrProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EhrProvidersController],
      providers: [EhrProvidersService],
    }).compile();

    controller = module.get<EhrProvidersController>(EhrProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
