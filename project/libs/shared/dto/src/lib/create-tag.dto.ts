import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'foo'
  })
  @IsString()
  @IsNotEmpty()
  public readonly title: string;
}
