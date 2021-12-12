import { PartialType } from '@nestjs/swagger';
// import { CreateKonsumanDto} from './create-konsuman.dto';
import { KonsumenDto } from './create-konsuman.dto';

// export class UpdateKonsumanDto extends PartialType(CreateKonsumanDto) {}
export class UpdateKonsumanDto extends PartialType(KonsumenDto) {}