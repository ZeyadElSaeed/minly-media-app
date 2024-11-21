import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthInputDto } from './dto/auth.input';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() input: AuthInputDto) {
    return this.authService.authenticate(input);
  }

  @Get()
  @UseGuards(AuthGuard)
  test() {
    return 'this is allowed!s';
  }
}
