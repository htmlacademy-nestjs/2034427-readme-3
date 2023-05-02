import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsOptional} from 'class-validator';

export class CreatePhotoDto {

  @ApiProperty({ type: 'string', format: 'binary', required: true})
  public photo: string;

  @ApiProperty({
    type: [String],
    description: 'Post tags list',
    example: ["foo","bar"],
    required: false,
  })
  @ApiProperty({ type: ['string'] })
  @IsArray()
  @IsOptional()
  public tags: string[];
}
