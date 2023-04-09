import {ApiProperty} from '@nestjs/swagger';

export class CreateLinkDto {

  @ApiProperty({
    description: 'URL Link',
    example: 'http://my-linc.com'
  })
  public linkUrl: string;

  @ApiProperty({
    description: 'Link description',
    example: 'Link for service'
  })
  public descriptionLink: string;

  @ApiProperty({
    description: 'Post tags list',
    example: 'javascript nest',
    required: false,
  })
  public tags: number[];

  public userId: string;
}
