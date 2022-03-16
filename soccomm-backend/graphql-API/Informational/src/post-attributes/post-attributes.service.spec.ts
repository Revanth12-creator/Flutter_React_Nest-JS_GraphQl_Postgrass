import { Test, TestingModule } from '@nestjs/testing';
import { PostAttributesService } from './post-attributes.service';

describe('PostAttributesService', () => {
  let service: PostAttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostAttributesService],
    }).compile();

    service = module.get<PostAttributesService>(PostAttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
