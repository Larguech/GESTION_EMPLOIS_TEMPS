import { Test, TestingModule } from '@nestjs/testing';
import { DepartementServiceImpService } from './departement-service-imp.service';

describe('DepartementServiceImpService', () => {
  let service: DepartementServiceImpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartementServiceImpService],
    }).compile();

    service = module.get<DepartementServiceImpService>(DepartementServiceImpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
