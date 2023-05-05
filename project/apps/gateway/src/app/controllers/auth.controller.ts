import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors, UseGuards, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto, LoginUserDto, RefreshTokenDto} from '@project/shared/dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {fillObject} from '@project/util/util-core';
import {FileType} from '@project/shared/app-types';
import {ApplicationServiceURL} from '../app.config';
import {AnonymousGuard} from '../guards/anonymous-guard.service';
import {UserRdo} from '../rdo/user.rdo';
import {LoggedUserRdo} from '../rdo/logged-user.rdo';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully created'
  })
  @Post('register')
  @UseGuards(AnonymousGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  public async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 500}),
          new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})
        ],
        fileIsRequired: false
      })
    ) avatar: FileType
  ) {
    const response = avatar
      ? await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/upload`, avatar)
      : null;
    const {data} = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,{...createUserDto, avatar: response?.data}
    );
    return fillObject(UserRdo, {...data, id: data._id});
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged'
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return fillObject(LoggedUserRdo, data);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Tokens has been successfully updated'
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, refreshTokenDto);
    return fillObject(LoggedUserRdo, data);
  }
}
