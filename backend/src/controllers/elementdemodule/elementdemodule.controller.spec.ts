import { Test, TestingModule } from '@nestjs/testing';
import { ElementdemoduleController } from './elementdemodule.controller';

describe('ElementdemoduleController', () => {
  let controller: ElementdemoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementdemoduleController],
    }).compile();

    controller = module.get<ElementdemoduleController>(ElementdemoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
