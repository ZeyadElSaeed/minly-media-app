import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInputDto } from './dto/auth.input';
import { SignInDto } from './dto/signin.input';
import { UsersService } from 'src/users/users.service';
import { AuthResultDto } from './dto/auth.result';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInputDto): Promise<AuthResultDto> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInputDto): Promise<SignInDto | null> {
    const user = await this.userService.findOneByEmail(input.email);
    if (user && user.password === input.password) {
      return {
        id: user.id,
        email: user.email,
      };
    }
    return null;
  }

  async signIn(user: SignInDto): Promise<AuthResultDto> {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, ...user };
  }
}
