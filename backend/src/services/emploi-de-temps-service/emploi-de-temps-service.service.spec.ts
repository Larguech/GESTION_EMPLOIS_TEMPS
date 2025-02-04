import { Test, TestingModule } from '@nestjs/testing';
import { EmploiDeTempsServiceService } from './emploi-de-temps-service.service';

describe('EmploiDeTempsServiceService', () => {
  let service: EmploiDeTempsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmploiDeTempsServiceService],
    }).compile();

    service = module.get<EmploiDeTempsServiceService>(EmploiDeTempsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
