import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/file.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
