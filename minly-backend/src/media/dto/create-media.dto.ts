import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { MediaType } from '../entities/mediaType';

export class CreateMediaDto {
  // @IsNotEmpty()
  // readonly file: Express.Multer.File;

  // @IsEnum(MediaType, { message: 'type must be either "image" or "video"' })
  // type: MediaType;

  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsUrl()
  // @IsNotEmpty()
  // url: string;
}
