import {IsNotEmpty, IsString} from 'class-validator';
import {PostQuoteDto} from '@project/shared/dto';

export class CreateQuoteDto extends PostQuoteDto{
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
