import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationratingResolver } from './applicationrating.resolver';
import { ApplicationratingService } from './applicationrating.service';

describe('ApplicationratingResolver', () => {
  let resolver: ApplicationratingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationratingResolver, ApplicationratingService],
    }).compile();

    resolver = module.get<ApplicationratingResolver>(ApplicationratingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
