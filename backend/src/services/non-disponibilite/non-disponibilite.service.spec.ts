import { Test, TestingModule } from '@nestjs/testing';
import { NonDisponibiliteService } from './non-disponibilite.service';

describe('NonDisponibiliteService', () => {
  let service: NonDisponibiliteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonDisponibiliteService],
    }).compile();

    service = module.get<NonDisponibiliteService>(NonDisponibiliteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
