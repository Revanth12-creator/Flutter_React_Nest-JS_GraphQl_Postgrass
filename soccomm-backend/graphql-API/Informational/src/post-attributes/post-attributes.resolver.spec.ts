import { Test, TestingModule } from '@nestjs/testing';
import { PostAttributesResolver } from './post-attributes.resolver';
import { PostAttributesService } from './post-attributes.service';

describe('PostAttributesResolver', () => {
  let resolver: PostAttributesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostAttributesResolver, PostAttributesService],
    }).compile();

    resolver = module.get<PostAttributesResolver>(PostAttributesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
