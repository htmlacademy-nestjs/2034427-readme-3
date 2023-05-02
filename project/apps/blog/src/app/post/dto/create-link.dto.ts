import {IsArray, IsOptional, IsString, IsUrl} from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  public linkUrl: string;

  @IsString()
  public descriptionLink: string;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsString()
  public userId: string;
}
