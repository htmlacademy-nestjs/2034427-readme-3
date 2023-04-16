import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsOptional, IsString} from "class-validator";

export class CreatePhotoDto {

  @ApiProperty({
    description: 'Post Image',
    example: 'image.jpg',
    required: true
  })
  @IsString()
  public photo: string;

  @ApiProperty({
    description: 'Post tags list',
    example: 'javascript nest',
    required: false,
  })
  @IsArray()
  @IsOptional()
  public tags: number[];

  @ApiProperty({
    description: 'User unique identifier',
    example: 100,
    required: true,
  })
  @IsString()
  public userId: string;
}
