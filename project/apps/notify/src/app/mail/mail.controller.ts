import {Controller, Get} from '@nestjs/common';
import {MailService} from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    public readonly mailService: MailService,
  ) {}

  @Get()
  public async sendNotify() {
    await this.mailService.sendNotify();
  }
}
