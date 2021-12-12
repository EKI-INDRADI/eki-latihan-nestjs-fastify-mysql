import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

import { User } from "../entities/user.entity"
//=================== @IsUnique
import { IsUnique } from "src/etc/validator/unique-validator"
//=================== @IsUnique
//=================== @IsExist
import { IsExist } from "src/etc/validator/exist-validator"
//=================== @IsExist
// import { OmitType, PickType } from "@nestjs/mapped-types" // sebelum swagger, masih menggunakan milik @nestjs/mapped-types
import { OmitType, PickType } from "@nestjs/swagger" // setelah swagger, menggunakan milik @nestjs/swagger (mendukung swagger)

import { ApiProperty } from "@nestjs/swagger"
export class UserDto { // DTO data transfer object (schema) untuk keperluan controller //https://docs.nestjs.com/controllers
    @ApiProperty() // BUG FIX SWAGGER VS CLASS-VALIDATOR pastikan tidak ada space enter agar swagger jalan diantara @ApiProperty()
    @IsOptional()
    @IsExist([User, 'id'])
    id?: number  // ? = optional

    @ApiProperty({required:true}) //  {required:true} swagger wajib di isi (kayaknya sama aja  @IsNotEmpty())
    @IsString()
    @MaxLength(64)
    @MinLength(8)
    @IsNotEmpty()
    nama_user: string

    // @ApiProperty({required:true})
    @IsEmail()
    @IsUnique([User, 'email']) // src\etc\validator\unique-validator.ts
    @MaxLength(32)
    @MinLength(6)
    @IsNotEmpty()
    email: string

    // @ApiProperty({required:true})
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    @IsUnique([User, 'username']) // src\etc\validator\unique-validator.ts
    username: string

    // @ApiProperty({required:true})
    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @IsNotEmpty()
    password: string
    // create_at : Date // tidak digunakan karena auto generate create new Date()
    // update_at : Date // tidak digunakan karena auto generate update new Date()
}


// extends = copy class
// OmitType(UserDto,['id']) = membuang hanya object id  / hapus object id
export class CreateUserDto extends OmitType(UserDto, ['id']) { }

// PickType(UserDto,['id']) = mengambil hanya object id , yang lainnya tidak digunakan
export class UserIdDto extends PickType(UserDto, ['id']) { }
