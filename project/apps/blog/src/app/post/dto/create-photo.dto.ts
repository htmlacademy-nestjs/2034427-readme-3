import {ApiProperty} from "@nestjs/swagger";

export class CreatePhotoDto {

  @ApiProperty({
    description: 'Post Image',
    example: 'image.jpg'
  })
  public photo: string;

  @ApiProperty({
    description: 'Post tags list',
    example: 'javascript nest',
    required: false,
  })
  public tags: string[];
}
