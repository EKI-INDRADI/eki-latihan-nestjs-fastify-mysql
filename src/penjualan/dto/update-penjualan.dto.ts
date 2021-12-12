import { PartialType } from '@nestjs/swagger';
import { CreatePenjualanDto, PenjualanDto } from './create-penjualan.dto';

// export class UpdatePenjualanDto extends PartialType(CreatePenjualanDto) {}

export class UpdatePenjualanDto extends PartialType(PenjualanDto) {}
