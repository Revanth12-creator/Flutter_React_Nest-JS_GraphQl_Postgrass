import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupInput } from './dto/craete-group-input';
import { CreateCategoryInput } from './dto/create-category.input';
import { CreatePostInput } from './dto/create-post-input';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';
import { CategoryUpload } from './entities/category.entity';
import { GroupUpload } from './entities/group-upload.entity';
import { PostUpload } from './entities/post.entity';
import { Upload } from './entities/upload.entity';



@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
    @InjectRepository(PostUpload)
    private postuploadRepository: Repository<PostUpload>,

    @InjectRepository(GroupUpload)
    private groupuploadRepository: Repository<GroupUpload>,
    @InjectRepository(CategoryUpload)
    private categoryuploadRepository: Repository<CategoryUpload>,
  ) {}
  async create(createUploadInput: CreateUploadInput) {
    const file = await this.uploadRepository.create(createUploadInput);
    return this.uploadRepository.save(file);
  }
  async createCategory(createCategoryInput: CreateCategoryInput) {
    const file = await this.categoryuploadRepository.create(
      createCategoryInput,
    );
    return this.categoryuploadRepository.save(file);
  }

  async createpost(createPostInput: CreatePostInput) {
    const file = await this.postuploadRepository.create(createPostInput);
    return this.postuploadRepository.save(file);
  }

  async creategroup(createGroupInput: CreateGroupInput) {
    const file = await this.groupuploadRepository.create(createGroupInput);
    return this.groupuploadRepository.save(file);
  }

  findAll() {
    return this.uploadRepository.find();
  }

  findOne(id: string) {
    return this.uploadRepository.findOne(id);
  }
  findByUserId(userId: string) {
    return this.uploadRepository.find({ where: { userId } });
  }
  findByGroupId(groupId: string) {
    return this.groupuploadRepository.find({ where: { groupId } });
  }

  findByCategoryId(categoryId: string) {
    return this.categoryuploadRepository.find({ where: { categoryId } });
  }

  async update(id: string, updateUploadInput: UpdateUploadInput) {
    const uplaod = await this.uploadRepository.create(updateUploadInput);
    return this.uploadRepository.update(id, uplaod);
  }

  remove(id: string) {
    return this.uploadRepository.delete(id);
  }

  async findByPostId(postId: string) {
    return this.postuploadRepository.find({ where: { postId } });
  }

  // async createMedia(userId: any, file: Express.Multer.File, docName: string) {
  //   const docId: any = await this.documentService.createDocumentInLocal(
  //     userId,
  //     file,
  //     docName
  //   );
  //   const createEducationDoc = await this.uploadRepository.save({
  //     userId: user.userId,
  //     documentId: docId
  //   });
  //   return createEducationDoc;
  // }
}
