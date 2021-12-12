import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RekeningService } from './rekening.service';
import { CreateRekeningDto, FindRekening, RekeningIdDto, ResponRekeningDto } from './dto/create-rekening.dto';
import { UpdateRekeningDto } from './dto/update-rekening.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';

@ApiTags('Rekening')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rekening')
export class RekeningController {
  constructor(private readonly rekeningService: RekeningService) { }

  @Post()
  @ApiBody({ type: CreateRekeningDto })
  create(@InjectUser() createRekeningDto: CreateRekeningDto) {
    // create(@Body() createRekeningDto: CreateRekeningDto) {
    return this.rekeningService.create(createRekeningDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponRekeningDto })
  findAll(@Query() page: FindRekening) {
    return this.rekeningService.findAll(page);
    // findAll() {
    //   return this.rekeningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rekeningService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRekeningDto })
  update(@Param('id') id: string, @InjectUser() updateRekeningDto: UpdateRekeningDto) {
    // update(@Param('id') id: string, @Body() updateRekeningDto: UpdateRekeningDto) {
    return this.rekeningService.update(+id, updateRekeningDto);
  }

  @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rekeningService.remove(+id);
  // }
  remove(@Param() id: RekeningIdDto) { // agar tervalidasi
    return this.rekeningService.remove(id.id); // agar tervalidasi
  }
}
