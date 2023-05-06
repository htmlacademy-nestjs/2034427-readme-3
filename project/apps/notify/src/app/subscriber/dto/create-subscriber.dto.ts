import {IsEmail, IsString} from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}
