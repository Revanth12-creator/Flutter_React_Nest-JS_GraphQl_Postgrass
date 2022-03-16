import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageSize, DocsSize } from 'utils/filesize';
import { imageFileFilter, DocsFileFilter } from 'utils/filter';
import { imageStorage, DocsStorage } from 'utils/storage';

export const UploadImage = FileInterceptor('imagefile', {
  limits: imageSize,
  storage: imageStorage,
  fileFilter: imageFileFilter,
});

export const UploadDoc = FilesInterceptor('docfile', 20, {
  limits: DocsSize,
  storage: DocsStorage,
  fileFilter: DocsFileFilter,
});
