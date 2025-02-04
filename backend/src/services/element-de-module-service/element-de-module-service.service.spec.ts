import { Test, TestingModule } from '@nestjs/testing';
import { ElementDeModuleServiceService } from './element-de-module-service.service';

describe('ElementDeModuleServiceService', () => {
  let service: ElementDeModuleServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementDeModuleServiceService],
    }).compile();

    service = module.get<ElementDeModuleServiceService>(ElementDeModuleServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
