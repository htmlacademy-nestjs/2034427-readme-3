import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpService} from "@nestjs/axios";
import {ApplicationServiceURL} from "../app.config";
import {CreateTagDto} from "@project/shared/dto";

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
  @Post()
  public async create(@Body() dto: CreateTagDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}`, dto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags list'
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
  @Delete(':id')
  public async delete(@Param('id') tagId: number) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tags}/${tagId}`);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag has been successfully updated'
  })
  @Patch(':id')
  public async update(@Param('id') tagId: number, @Body() dto: CreateTagDto) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tags}/${tagId}`, dto);
    return data;
  }
}
