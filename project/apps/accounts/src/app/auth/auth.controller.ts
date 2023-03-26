import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {fillObject} from '@project/util/util-core';
import {UserRdo} from './rdo/user.rdo';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully created'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged'
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifyUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifyUser);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
