import {ApiProperty} from "@nestjs/swagger";

export class CreateVideoDto {

  @ApiProperty({
    description: 'Video title',
    example: 'My video'
  })
  public title: string;

  @ApiProperty({
    description: 'Video url',
    example: 'http://youtube/my-video'
  })
  public video: string;

  @ApiProperty({
    description: 'Video tags list',
    example: 'javascript nest',
    required: false,
  })
  public tags: string[];
}
