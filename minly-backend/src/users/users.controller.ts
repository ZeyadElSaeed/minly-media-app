import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthInputDto } from 'src/auth/dto/auth.input';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findUser(@Request() req) {
    const uesrId = req.user.id;
    return this.usersService.findOneById(+uesrId);
  }

  @Get('media')
  @UseGuards(AuthGuard)
  findUserMedia(@Request() req) {
    const uesrId = req.user.id;
    return this.usersService.findMedia(uesrId);
  }

}
