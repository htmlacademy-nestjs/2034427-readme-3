import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public anons: string;

  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public userId: string;
}
