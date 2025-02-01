import { Module } from '@nestjs/common';
import { ImportDataController } from './import-data.controller';
import { ImportDataService } from './import-data.service';

@Module({
  controllers: [ImportDataController],
  providers: [ImportDataService],
})
export class ImportDataModule {}
