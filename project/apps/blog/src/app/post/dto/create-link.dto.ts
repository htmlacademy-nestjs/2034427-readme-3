import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsOptional, IsString, IsUrl} from "class-validator";

export class CreateLinkDto {

  @ApiProperty({
    description: 'URL Link',
    example: 'http://my-linc.com',
    required: true
  })
  @IsUrl()
  public linkUrl: string;

  @ApiProperty({
    description: 'Link description',
    example: 'Link for service',
    required: true
  })
  @IsString()
  public descriptionLink: string;

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
