import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {HttpService} from '@nestjs/axios';
import {CreateTagDto} from '@project/shared/dto';
import {ApplicationServiceURL} from '../app.config';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tag has been successfully created'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  public async create(@Body() dto: CreateTagDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag list'
  })
  @Get()
  public async index() {
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tags}`)
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tag has been successfully deleted'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  public async delete(@Param('id') tagId: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tags}/${tagId}`);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag has been successfully updated'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  public async update(@Param('id') tagId: number, @Body() dto: CreateTagDto) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tags}/${tagId}`, dto);
    return data;
  }
}
