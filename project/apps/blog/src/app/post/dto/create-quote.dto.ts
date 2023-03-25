import {ApiProperty} from "@nestjs/swagger";

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Text quote'
  })
  public text: string;
  @ApiProperty({
    description: 'Quote author',
    example: 'Keks'
  })
  public quoteAuthor: string;

  @ApiProperty({
    description: 'Post tags list',
    example: 'javascript nest',
    required: false,
  })
  public tags: string[];
}
