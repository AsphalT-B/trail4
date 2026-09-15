import { Test, TestingModule } from '@nestjs/testing';
import { VidpostService } from './vidpost.service.js';

describe('VidpostService', () => {
  let service: VidpostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VidpostService],
    }).compile();

    service = module.get<VidpostService>(VidpostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
