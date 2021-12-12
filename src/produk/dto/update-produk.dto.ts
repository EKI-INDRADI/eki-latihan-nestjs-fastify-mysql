import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
// import { CreateProdukDto } from './create-produk.dto';
import { ProdukDto } from './create-produk.dto';

// export class UpdateProdukDto extends PartialType(CreateProdukDto) {}
// export class UpdateProdukDto extends PartialType(ProdukDto) {} // kenapa menggunakan ProdukDto, agar memiliki id , sedangkan CreateProdukDto tidak memilki Id

// ==================================== CLASS VALIDATOR BUG FIX : OLD BUG FIX (SEBENARNYA OLD BUG FIX JAUH LEBIH BAIK DARI NEW BUG FIX)
// export class UpdateProdukDto extends PartialType(ProdukDto) {
//     // //@ApiProperty({required:false})

//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     barcode: string

//     // // BUG FIX update menghilangkan IsUnique
//     // // {
//     // //     "statusCode": 400,
//     // //     "message": [
//     // //       "barcode test sudah digunakan"
//     // //     ],
//     // //     "error": "Bad Request"
//     // // }
// }
// ==================================== /CLASS VALIDATOR BUG FIX : OLD BUG FIX

// EKI NOTE :
// old bug fix adalah cara saya untuk bug fix
// new bug fix adalah penjelasan dari video di menit 02:33:00 ++

// ====================================CLASS VALIDATOR BUG FIX : NEW BUG FIX
export class UpdateProdukDto extends PartialType(ProdukDto) {} 

// dikembalikan ke semula karena ada 
// NEW BUG FIX src\etc\validator\unique-validator.ts (SAMA SAJA PADAHAL -_-)
// tetapi tetap saran menggunakan OLD BUG FIX
// pada class :
// export class UniqueValidator implements ValidatorConstraintInterface {
//     async validate(value: any, args: ValidationArguments) { 
//         let find = {
//             where: { [args.constraints[1]]: args.value }
//         }

//         if (args.object['id']){
//             find.where['id'] = Not(args.object['id']) // { Not } from 'typeorm';
//         }
//         let check = await getConnection().getRepository(args.constraints[0]).findOne(find)

//         if (check) return false // jika ada return false
//         return true
//     }

//     defaultMessage(args: ValidationArguments) {
//         return args.property + ' ' + args.value + ' sudah digunakan'
//     }

// }
// ==================================== /CLASS VALIDATOR BUG FIX : NEW BUG FIX