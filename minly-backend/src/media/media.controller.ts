import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/guards/auth.guard';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  private logger = new Logger(MediaController.name);
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(__dirname, '..', 'uploads'),
        filename: (req: any, file, callback) => {
          const userId = req.user.id;
          const timestamp = Date.now();
          const ext = path.extname(file.originalname);
          const filename = `${userId}-${timestamp}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @Request() req,
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({
            fileType: /image\/(jpeg|png|gif)|video\/(mp4|webm)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const userId = req.user.id;
    this.logger.log('file', file);
    return this.mediaService.create(createMediaDto, file, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') mediaUrl: string, @Res() res: Response) {
    const filePath = await this.mediaService.getMediaFile(+mediaUrl);
    return res.sendFile(filePath);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') mediaId: string,
    @Body() updateMediaDto: UpdateMediaDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.mediaService.update(+mediaId, userId, updateMediaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') mediaId: string, @Request() req) {
    const userId = req.user.id;
    const media = this.mediaService.remove(+mediaId, userId);
    return media;
  }

  @Get(':id/like')
  @UseGuards(AuthGuard)
  async like(@Param('id') mediaId: string, @Request() req) {
    const userId = req.user.id;
    return await this.mediaService.like(+mediaId, userId);
  }

  @Get(':id/unlike')
  @UseGuards(AuthGuard)
  async unlike(@Param('id') mediaId: string, @Request() req) {
    const userId = req.user.id;
    const like = await this.mediaService.unlike(+mediaId, userId);
    return like;
  }
}
