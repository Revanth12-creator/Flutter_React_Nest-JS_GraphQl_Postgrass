import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GroupUpload } from './entities/group-upload.entity';
import { Group } from './entities/group.entity';
import { UploadService } from './upload.service';

@Resolver((of) => Group)
export class GroupResolver {
  constructor(private uploadService: UploadService) {}

  @ResolveField((of) => [GroupUpload])
  groupupload(@Parent() group: Group) {
    return this.uploadService.findByGroupId(group.id);
  }
}
