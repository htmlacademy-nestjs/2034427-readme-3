import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({description: "Unique tag ID", example: 25})
  @Expose()
  public id: number;

  @ApiProperty({description: "Tag name", example: "foo"})
  @Expose()
  public title: string;
}
