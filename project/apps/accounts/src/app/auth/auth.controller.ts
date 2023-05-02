import { Body, Controller, Post } from '@nestjs/common';
import {CreateUserDto, LoginUserDto, RefreshTokenDto} from '@project/shared/dto';
import { AuthService } from './auth.service';
import {NotifyService} from '../notify/notify.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    const {email, firstname, lastname} = user;
    await this.notifyService.create({email, firstname, lastname});
    return user;
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifyUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createToken(verifyUser);
    return Object.assign(verifyUser, loggedUser);
  }

  @Post('refresh')
  public async refreshToken(@Body() {refreshToken}: RefreshTokenDto) {
    const user = await this.authService.verifyRefreshToken(refreshToken);
    const loggedUser = await this.authService.createToken(user);
    return Object.assign(user, loggedUser);
  }
}
