import {Controller, Get, UseGuards} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {UserId} from "../decorators/user-id.decorator";
import {ApplicationServiceURL} from "../app.config";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('mail')
export class MailController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async sendNotify(@UserId() userId: string) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.Mail}/${userId}`);
  }
}
