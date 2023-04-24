import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import {NotifyService} from '../notify/notify.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully created'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const user = await this.authService.register(dto);
    const {email, firstname, lastname} = user;
    await this.notifyService.create({email, firstname, lastname});
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged'
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<LoggedUserRdo> {
    const verifyUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createToken(verifyUser);
    return fillObject(LoggedUserRdo, Object.assign(verifyUser, loggedUser));
  }
}
