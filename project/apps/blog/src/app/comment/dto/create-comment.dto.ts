import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  public message: string;

  @IsNotEmpty()
  @IsNumber()
  public postId: number;

  @IsNotEmpty()
  @IsString()
  public userId: string;
}
