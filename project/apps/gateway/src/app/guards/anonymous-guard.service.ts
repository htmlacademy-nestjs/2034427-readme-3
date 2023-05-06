import {BadRequestException, CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return true;
    }

    try {
      await this.jwtService.verify(token, {
        secret: this.configService.get('application.jwt.accessTokenSecret')
      });
    } catch (err) {
      return true;
    }

    throw new BadRequestException('You is authorized');
  }
}
