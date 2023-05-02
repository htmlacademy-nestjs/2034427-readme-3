import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  public photo: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  @IsNotEmpty()
  public userId: string;
}
