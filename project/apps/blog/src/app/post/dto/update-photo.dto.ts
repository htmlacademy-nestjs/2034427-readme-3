import {ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {INVALID_TAG_LENGTH, TAG_MAX_LENGTH, TAG_MIN_LENGTH} from "@project/shared/validation";

export class UpdatePhotoDto {
  @IsString()
  @IsOptional()
  public photo: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, {message: INVALID_TAG_LENGTH, each: true})
  @IsOptional()
  public tags: string[];

  @IsString()
  @IsNotEmpty()
  public userId: string;
}
