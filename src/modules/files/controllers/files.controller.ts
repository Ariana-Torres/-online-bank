import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { Response } from 'express';
import { fileFilter } from 'src/modules/helpers/fileFilter.helper';
import { fileNamer } from 'src/modules/helpers/fileNamer.helper';
import { FilesService } from '../services/file.service';

  @Controller('files')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: fileFilter,
        storage: diskStorage({
          destination: './static/account/',
          filename: fileNamer,
        }),
      }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('Asegurese que el archivo es una imagen');
      }
  
      const url = `${file.filename}`;
  
      return { url };
    }
  
    @Get('account/:imageName')
    findBook(@Res() res: Response, @Param('imageName') imageName: string) {
      const path = this.filesService.getStaticImageName(imageName);
      res.sendFile(path);
    }
  }
  