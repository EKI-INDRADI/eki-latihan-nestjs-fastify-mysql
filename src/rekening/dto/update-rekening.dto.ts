import { PartialType } from '@nestjs/swagger';
// import { CreateRekeningDto } from './create-rekening.dto';
import { RekeningDto } from './create-rekening.dto';

// export class UpdateRekeningDto extends PartialType(CreateRekeningDto) {}
export class UpdateRekeningDto extends PartialType(RekeningDto) { }
