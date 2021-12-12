import { ApiProperty, PickType } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
// import { UserDto } from "src/user/dto/create-user.dto"; // tidak bisa digunakan karena ada unique validator

//============= bug unique validator jika menggunakan UserDto
// export class AuthDto extends PickType(UserDto,['username','password']){  // hanya ambil username dan password doang dari user dto
//     // keperluan login
// }
//============= / bug unique validator jika menggunakan UserDto

export class AuthDto {
    // CLASS VALIDATOR BUG FIX : OLD BUG FIX (VERSI SAYA) & NEW BUG FIX (VERSI VIDEO)  - SUDAH DI BUG FIX DARI AWAL (-_-)
    // keperluan login
    @ApiProperty()  // swagger
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    username: string

    // @ApiProperty({required:true})
    @ApiProperty()  // swagger
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    password: string

    // / CLASS VALIDATOR BUG FIX : OLD BUG FIX & NEW BUG FIX  - SUDAH DI BUG FIX DARI AWAL (-_-)
}