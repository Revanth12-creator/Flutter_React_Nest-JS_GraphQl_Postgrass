import { profile_pic, all_docs } from './../filePathConstants';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { mkdir } from 'fs';

export const imageStorage = diskStorage({
  destination: profile_pic.PROFILE_IMAGE_PATH,
  filename: (req: any, file: Express.Multer.File, callback: any) => {
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const imgFirstName = 'local-profile';
    callback(
      null,
      `${imgFirstName}-${randomName}-${uuid()}${extname(file.originalname)}`,
    );
  },
});

export const DocsStorage = diskStorage({
  destination: function (req: any, files: Express.Multer.File, cb: any) {
    var folderName = `${all_docs.DOCS_PATH}`;
    mkdir(folderName, { recursive: true }, (err) => {
      if (err) return err;
    });
    cb(null, folderName);
  },
  filename: (req: any, files: Express.Multer.File, callback: any) => {
    const docFirstName = 'local-doc';
    const randomName = Array(3)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(
      null,
      `${docFirstName}-${randomName}-${uuid()}${extname(files.originalname)}`,
    );
  },
});
