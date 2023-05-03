import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Text quote',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public text: string;
  @ApiProperty({
    description: 'Quote author',
    example: 'Keks',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  public quoteAuthor: string;

  @ApiProperty({
    description: 'Post tags list',
    example: ["foo","bar"],
    required: false,
  })
  @IsArray()
  @IsOptional()
  public tags: string[];
}
