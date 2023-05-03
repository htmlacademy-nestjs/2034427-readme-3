import {Controller, Get, Param} from '@nestjs/common';
import {MailService} from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    public readonly mailService: MailService,
  ) {}

  @Get(':id')
  public async sendNotify(@Param('id') userId: string) {
    await this.mailService.sendNotify(userId);
  }
}
