import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Category, CategoryUpload } from './entities/category.entity';
import { UploadService } from './upload.service';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private uploadService: UploadService) {}

  @ResolveField((of) => [CategoryUpload])
  groupupload(@Parent() category: Category) {
    return this.uploadService.findByCategoryId(category.id);
  }
}
