import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Like } from './entities/like.entity';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([Media, Like])],
  exports: [MediaService],
})
export class MediaModule {}
