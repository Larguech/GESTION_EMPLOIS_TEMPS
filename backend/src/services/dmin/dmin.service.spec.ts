import { Test, TestingModule } from '@nestjs/testing';
import { DminService } from './dmin.service';

describe('DminService', () => {
  let service: DminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DminService],
    }).compile();

    service = module.get<DminService>(DminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
