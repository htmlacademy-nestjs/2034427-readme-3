import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class TagRdo {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
