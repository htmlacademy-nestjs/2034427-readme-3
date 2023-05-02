import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import {IUser} from '@project/shared/app-types';
import { UserService } from './user.service';
import {ChangePasswordDto} from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  public async all(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  @Post('follow/:id')
  public async follow(@Param('id', MongoidValidationPipe) id: string, @Body() {currentUserId}: { currentUserId: string }): Promise<IUser> {
    return this.userService.follow(id, currentUserId);
  }

  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string): Promise<IUser> {
    return this.userService.getUser(id);
  }

  @Patch('password/change')
  public async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<IUser> {
    return this.userService.changePassword(changePasswordDto);
  }

  @Get(':id/post-count/inc')
  public async incPostCount(@Param('id') userId: string): Promise<void> {
    await this.userService.incPostCount(userId);
  }

  @Get(':id/post-count/dec')
  public async decPostCount(@Param('id') userId: string): Promise<void> {
    await this.userService.decPostCount(userId);
  }
}
