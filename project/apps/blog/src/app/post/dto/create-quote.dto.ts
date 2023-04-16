import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

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
    example: 'javascript nest',
    required: false,
  })
  @IsString()
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
