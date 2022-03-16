import { Test, TestingModule } from '@nestjs/testing';
import { GroupUserResolver } from './group-user.resolver';
import { GroupUserService } from './group-user.service';

describe('GroupUserResolver', () => {
  let resolver: GroupUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupUserResolver, GroupUserService],
    }).compile();

    resolver = module.get<GroupUserResolver>(GroupUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
