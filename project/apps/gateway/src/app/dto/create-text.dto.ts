import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateTextDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'My post',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Anons for post',
    example: 'My anons',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public anons: string;

  @ApiProperty({
    description: 'Text for post',
    example: 'Text my post',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'Post tags list',
    example: ["foo","bar"],
    required: false,
  })
  @IsArray()
  @IsOptional()
  public tags: string[];
}