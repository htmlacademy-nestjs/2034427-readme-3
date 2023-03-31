import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from '@project/util/util-core';
import {UserService} from './user.service';
import {UserProfileRdo} from './rdo/user-profile.rdo';
import {UserRdo} from '../auth/rdo/user.rdo';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: [UserProfileRdo],
    status: HttpStatus.OK,
    description: 'Users list'
  })
  @Get()
  public async all() {
    const users = await this.userService.getAll();
    return users.map((user) => {
      return fillObject(UserProfileRdo, user)
    })
  }

  @ApiResponse({
    type: UserProfileRdo,
    status: HttpStatus.CREATED,
    description: 'subscribe to user'
  })
  @Post('follow/:id')
  public async follow(@Param('id') id: string, @Body() {temp_currentUserId}: {temp_currentUserId: string}): Promise<UserProfileRdo> {
    const users = this.userService.follow(id, temp_currentUserId);
    return  fillObject(UserProfileRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id') id: string): Promise<UserProfileRdo> {
    const existUser = await this.userService.getUser(id);
    return fillObject(UserProfileRdo, existUser);
  }
}
