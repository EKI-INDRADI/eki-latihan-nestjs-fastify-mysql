import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { CreateKonsumanDto, FindKonsumenDto, KonsumenId, ResponseKonsumenDto } from './dto/create-konsuman.dto';
import { UpdateKonsumanDto } from './dto/update-konsuman.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('Konsumen')
@ApiBearerAuth()
@UseGuards(JwtGuard)
// TypeError: Cannot read property 'id' of undefined
// at D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\src\etc\decorator\inject-user.decorator.ts:10:37
@Controller('konsumen')
export class KonsumenController {
  constructor(private readonly konsumenService: KonsumenService) { }


  @Post()
  @ApiBody({ type: CreateKonsumanDto }) // SWAGGER POST SCHEMA (TAMBAHKAN JIKA PARAMETER REQUEST BODY TIDAK ADA DI SWAGGER)
  create(@InjectUser() createKonsumanDto: CreateKonsumanDto) {
    // create(@Body() createKonsumanDto: CreateKonsumanDto) {
    return this.konsumenService.create(createKonsumanDto);
  }

  @Get()
  @ApiOkResponse({type:ResponseKonsumenDto})
  findAll(@Query() filter : FindKonsumenDto) {
    return this.konsumenService.findAll(filter);
    // findAll() {
    //   return this.konsumenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.konsumenService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateKonsumanDto })  // SWAGGER PATCH SCHEMA (TAMBAHKAN JIKA PARAMETER REQUEST BODY TIDAK ADA DI SWAGGER)
  // update(@Param('id') id: string, @Body() updateKonsumanDto: UpdateKonsumanDto) {
  update(@Param('id') id: string, @InjectUser() updateKonsumanDto: UpdateKonsumanDto) {
    return this.konsumenService.update(+id, updateKonsumanDto);
  }

  @Delete(':id')
  // remove(@Param('id') id: string) {
  // return this.konsumenService.remove(+id);
  //}
  remove(@Param() id: KonsumenId) { // agar tervalidasi
    return this.konsumenService.remove(id.id); // agar tervalidasi
  }
}
