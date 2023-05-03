import {IsArray, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsUrl()
  @IsNotEmpty()
  public video: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public userId: string;
}
