import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {HttpService} from '@nestjs/axios';
import {PasswordChangeDto} from '@project/shared/dto';
import {fillObject} from '@project/util/util-core';
import {ApplicationServiceURL} from '../app.config';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {UserId} from '../decorators/user-id.decorator';
import {UserRdo} from '../rdo/user.rdo';
import {UserProfileRdo} from '../rdo/user-profile.rdo';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
    description: 'Users list'
  })
  @Get()
  public async index() {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`);
    return data.map((user) => {
      return fillObject(UserRdo, {...user, id: user._id});
    })
  }

  @ApiResponse({
    type: UserProfileRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    return fillObject(UserProfileRdo, {...data, id: data._id});
  }

  @ApiResponse({
    type: UserProfileRdo,
    status: HttpStatus.CREATED,
    description: 'subscribe to user'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('follow/:id')
  public async follow(@Param('id') id: string, @UserId() currentUserId: string) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/follow/${id}`, {currentUserId});
    return fillObject(UserProfileRdo, {...data, id: data._id});
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Password has been successfully changed'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('password/change')
  public async changePassword(@Body() changePasswordDto: PasswordChangeDto, @UserId() userId: string) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/password/change`, {...changePasswordDto, userId});
    return fillObject(UserRdo, {...data, id: data._id});
  }
}
