import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import * as path from 'path';
import { UploadDoc, UploadImage } from './../../uploadfile';
import { UploadService } from './upload.service';
import { profile_pic } from "../../filePathConstants";

const imgFileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);
  if (ext !== '.png||jpeg||jpg') {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};
@Controller('media')
export class uploadController {
  constructor(private uploadService: UploadService) {}

  @Get("profile-image-from-local/:fileName")
  async getProfileImageFromLocal(
    @Param("fileName") fileName: any,
    @Res() res: any
  ): Promise<any> {
    return res.sendFile(fileName, {
      root: `${profile_pic.PROFILE_IMAGE_PATH}`,
    });
  }

  //For profile pic
  @UseInterceptors(UploadImage)
  @Post("upload-profile-image-to-local/:userId")
  async uploadProfile(@Param("userId") userId: string,@UploadedFile() file:Express.Multer.File){
    console.log(file,"userid is",userId);
    const response = {
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      userId: userId,
    };
    console.log(response);
    return await this.uploadService.create(response);
  }

  //category upload
  @UseInterceptors(UploadImage)
  @Post('category')
  async uploadCategory(@UploadedFile() file, @Body() categoryId) {
    console.log(file);
    const response = {
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      categoryId: categoryId.categoryId,
    };
    console.log(response);

    return await this.uploadService.createCategory(response);
  }

  //for multiple posts (multiple) file upload

  @UseInterceptors(UploadDoc)
  @Post('postupload')
  async uploadImages(@UploadedFiles() files, @Body() postId) {
    console.log(files);
    console.log(postId);
    const response = {
      destination: files.destination,
      filename: files.filename,
      path: files.path,
      mimetype: files.mimetype,
      postId: postId.postId,
    };
    files.map((val) => {
      const response = {
        destination: val.destination,
        filename: val.filename,
        path: val.path,
        mimetype: val.mimetype,
        postId: postId.postId,
      };
      return this.uploadService.createpost(response);
    });
    console.log(JSON.stringify(response), 'response');
    return 'upload Successful';
  }

  @UseInterceptors(UploadImage)
  @Post('group')
  async uploadgroupProfile(@UploadedFile() file, @Body() groupId) {
    console.log(file);
    const response = {
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      groupId: groupId.groupId,
    };
    console.log(response);

    return await this.uploadService.creategroup(response);
  }
}
