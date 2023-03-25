import {ApiProperty} from "@nestjs/swagger";

export class CreateTextDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'My post'
  })
  public title: string;

  @ApiProperty({
    description: 'Anons for post',
    example: 'My anons'
  })
  public anons: string;

  @ApiProperty({
    description: 'Text for post',
    example: 'Text my post'
  })
  public text: string;

  @ApiProperty({
    description: 'Post tags list',
    example: 'javascript nest',
    required: false,
  })
  public tags: string[];
}
