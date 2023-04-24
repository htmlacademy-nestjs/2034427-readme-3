import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserService } from './user.service';
import { UserProfileRdo } from './rdo/user-profile.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('follow/:id')
  public async follow(@Param('id', MongoidValidationPipe) id: string, @Body() {temp_currentUserId}: { temp_currentUserId: string }): Promise<UserProfileRdo> {
    const users = this.userService.follow(id, temp_currentUserId);
    return fillObject(UserProfileRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string): Promise<UserProfileRdo> {
    const existUser = await this.userService.getUser(id);
    return fillObject(UserProfileRdo, existUser);
  }
}
