import {Controller, Get, HttpStatus, UseGuards} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {UserId} from '../decorators/user-id.decorator';
import {ApplicationServiceURL} from '../app.config';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification sending',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async sendNotify(@UserId() userId: string) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Mail}/${userId}`);
  }
}
