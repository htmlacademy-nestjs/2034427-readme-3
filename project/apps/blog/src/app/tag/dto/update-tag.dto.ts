import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'foo'
  })
  @IsString()
  public readonly title: string;
}
