import {Controller} from '@nestjs/common';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {RabbitRouting} from '@project/shared/app-types';
import {FileService} from './file.service';

@Controller()
export class FileSubscriber {
  constructor(private readonly fileService: FileService) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.DeletePhoto,
    queue: 'readme.photo.delete'
  })
  public async deleteFile(photoPath) {
    await this.fileService.delete(photoPath);
  }
}
