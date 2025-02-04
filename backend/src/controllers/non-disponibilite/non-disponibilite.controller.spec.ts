import { Test, TestingModule } from '@nestjs/testing';
import { NonDisponibiliteController } from './non-disponibilite.controller';

describe('NonDisponibiliteController', () => {
  let controller: NonDisponibiliteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonDisponibiliteController],
    }).compile();

    controller = module.get<NonDisponibiliteController>(NonDisponibiliteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
