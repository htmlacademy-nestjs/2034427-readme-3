import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: {
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<number>(`${optionSpace}.port`),
        secure: false,
        auth: {
          user: config.get<string>(`${optionSpace}.user`),
          pass: config.get<string>(`${optionSpace}.password`)
        }
      },
      defaults: {
        from: config.get<string>('application.mail.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  }
}
