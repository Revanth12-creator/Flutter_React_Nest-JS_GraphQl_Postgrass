import {
  Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';
import { GroupUpload } from './entities/group-upload.entity';
import { Group } from './entities/group.entity';
import { Post, PostUpload } from './entities/post.entity';
import { Upload } from './entities/upload.entity';
import { User } from './entities/user.entity';
import { UploadService } from './upload.service';

@Resolver(() => Upload || GroupUpload || PostUpload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => Upload)
  createUpload(
    @Args('createUploadInput') createUploadInput: CreateUploadInput,
  ) {
    return this.uploadService.create(createUploadInput);
  }

  @Query(() => [Upload], { name: 'allupload' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Query(() => Upload, { name: 'upload' })
  findOne(@Args('id') id: string) {
    return this.uploadService.findOne(id);
  }

  @Mutation(() => Upload)
  updateUpload(
    @Args('updateUploadInput') updateUploadInput: UpdateUploadInput,
  ) {
    return this.uploadService.update(updateUploadInput.id, updateUploadInput);
  }

  @Mutation(() => Upload)
  removeUpload(@Args('id') id: string) {
    return this.uploadService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.uploadService.findOne(reference.id);
  }
  @ResolveField((of) => User)
  user(@Parent() upload: Upload) {
    return { __typename: 'User', id: upload.userId };
  }

  @ResolveField((of) => Group)
  groupupload(@Parent() upload: GroupUpload) {
    return { __typename: 'Group', id: upload.groupId };
  }

  @ResolveField((of) => Post)
  post(@Parent() postupload: PostUpload) {
    return { __typename: 'Post', id: postupload.postId };
  }
}
