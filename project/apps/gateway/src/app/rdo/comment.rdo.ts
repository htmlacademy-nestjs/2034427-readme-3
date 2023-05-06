import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty()
  @Expose()
  public commentId: number;

  @ApiProperty()
  @Expose()
  public message: string;

  @ApiProperty()
  @Expose()
  public userId: string;

  @ApiProperty()
  @Expose()
  public createdAt: Date;
}
