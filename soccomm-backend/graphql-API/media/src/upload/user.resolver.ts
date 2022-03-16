import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Upload } from './entities/upload.entity';
import { User } from './entities/user.entity';
import { UploadService } from './upload.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private uploadService: UploadService) {}

  @ResolveField((of) => [Upload])
  upload(@Parent() user: User) {
    return this.uploadService.findByUserId(user.id);
  }
}
