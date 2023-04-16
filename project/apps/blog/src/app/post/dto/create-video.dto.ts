import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsOptional, IsString, IsUrl} from "class-validator";

export class CreateVideoDto {

  @ApiProperty({
    description: 'Video title',
    example: 'My video',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Video url',
    example: 'http://youtube/my-video',
    required: true
  })
  @IsUrl()
  @IsNotEmpty()
  public video: string;

  @ApiProperty({
    description: 'Post tags list',
    example: ["foo","bar"],
    required: false,
  })
  @IsArray()
  @IsOptional()
  public tags: string[];

  @ApiProperty({
    description: 'User unique identifier',
    example: 100,
    required: true,
  })
  @IsString()
  public userId: string;
}
