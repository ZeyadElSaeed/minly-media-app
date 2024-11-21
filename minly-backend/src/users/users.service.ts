import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mediaService: MediaService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this.findOneByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = this.userRepository.save(newUser);
    return plainToClass(CreateUserDto, savedUser);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findMedia(userId: number) {
    const media = await this.mediaService.findAllByUser(userId);
    if (media.length === 0) {
      throw new NotFoundException(`No uploaded media found to the user`);
    }
    return media;
  }
}
