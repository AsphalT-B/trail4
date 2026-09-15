import { Test, TestingModule } from '@nestjs/testing';
import { VidpostController } from './vidpost.controller.js';
import { VidpostService } from './vidpost.service.js';

describe('VidpostController', () => {
  let controller: VidpostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VidpostController],
      providers: [VidpostService],
    }).compile();

    controller = module.get<VidpostController>(VidpostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
