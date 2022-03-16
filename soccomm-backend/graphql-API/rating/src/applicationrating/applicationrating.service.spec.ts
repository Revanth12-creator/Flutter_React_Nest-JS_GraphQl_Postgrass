import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationratingService } from './applicationrating.service';

describe('ApplicationratingService', () => {
  let service: ApplicationratingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationratingService],
    }).compile();

    service = module.get<ApplicationratingService>(ApplicationratingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
