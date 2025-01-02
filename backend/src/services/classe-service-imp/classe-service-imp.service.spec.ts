import { Test, TestingModule } from '@nestjs/testing';
import { ClasseServiceImpService } from './classe-service-imp.service';

describe('ClasseServiceImpService', () => {
  let service: ClasseServiceImpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClasseServiceImpService],
    }).compile();

    service = module.get<ClasseServiceImpService>(ClasseServiceImpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
