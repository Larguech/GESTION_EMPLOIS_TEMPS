import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportDataService } from './import-data.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('data')
export class ImportDataController {
  constructor(private readonly importDataService: ImportDataService) {}

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Dossier temporaire pour stocker les fichiers
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async importData(@UploadedFile() file: Express.Multer.File): Promise<boolean> {
    if (!file) {
      return false;
    }
    return this.importDataService.putDataToDb(file.path);
  }
}
