import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
