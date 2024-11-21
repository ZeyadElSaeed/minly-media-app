import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { MediaType } from './entities/mediaType';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Like) private readonly likesRepository: Repository<Like>,
  ) {}

  create(
    createMediaDto: CreateMediaDto,
    file: Express.Multer.File,
    userId: number,
  ) {
    const fileType =
      file.mimetype.split('/')[0] === 'image'
        ? MediaType.IMAGE
        : MediaType.VIDEO;
    const media = { ...createMediaDto, type: fileType, url: file.filename };
    const createdMedia = this.mediaRepository.create({
      user: { id: userId },
      ...media,
    });
    return this.mediaRepository.save(createdMedia);
  }

  getFilePath(mediaUrl: string) {
    const filePath = path.join(__dirname, '..', 'uploads', mediaUrl);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Content not found in file system.');
    }
    return filePath;
  }

  async getMediaFile(mediaId: number) {
    const media = await this.findMediaById(mediaId);
    return this.getFilePath(media.url);
  }

  findAll() {
    return this.mediaRepository.find({ relations: ['user', 'likes'] });
  }

  findAllByUser(userId: number) {
    return this.mediaRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'likes'],
    });
  }

  async findMediaById(id: number) {
    const media = await this.mediaRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async findLike(mediaId: number, userId: number) {
    return await this.likesRepository.findOne({
      where: { user: { id: userId }, media: { id: mediaId } },
      relations: ['user', 'media'],
    });
  }

  async update(id: number, userId: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.findMediaById(id);
    new Logger(MediaService.name).log('media', media.title);
    if (media.user.id !== userId) {
      throw new UnauthorizedException("You can't edit the content");
    }
    Object.assign(media, updateMediaDto);
    return this.mediaRepository.save(media);
  }

  async remove(mediaId: number, userId: number) {
    const media = await this.findMediaById(mediaId);
    if (media.user.id !== userId) {
      throw new UnauthorizedException("You can't remove the content");
    }
    const filePath = this.getFilePath(media.url);
    fs.unlinkSync(filePath);
    return this.mediaRepository.remove(media);
  }

  async like(mediaId: number, userId: number) {
    const foundLike = await this.findLike(mediaId, userId);
    if (foundLike) {
      throw new ConflictException('User already liked the content');
    }
    const like = { user: { id: userId }, media: { id: mediaId } };
    const createdLike = this.likesRepository.create(like);
    return this.likesRepository.save(createdLike);
  }

  async unlike(mediaId: number, userId: number) {
    const foundLike = await this.findLike(mediaId, userId);
    if (!foundLike) {
      throw new NotFoundException(`User does't have likes on that content`);
    }
    return this.likesRepository.remove(foundLike);
  }
}
