import { Test, TestingModule } from '@nestjs/testing';
import { ClasseControllerController } from './classe-controller.controller';

describe('ClasseControllerController', () => {
  let controller: ClasseControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClasseControllerController],
    }).compile();

    controller = module.get<ClasseControllerController>(ClasseControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
