import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { Konsuman } from "../entities/konsuman.entity"

export class KonsumenDto {

    @ApiProperty() //swagger
    @IsExist([Konsuman, 'id'])
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nama_konsumen: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    alamat_konsumen: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email_konsumen: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    no_hp_konsumen: string

    @ApiHideProperty() // HIDE SWAGGER SCHEMA USER
    @IsObject()
    user: CreateUserDto
}
// export class CreateKonsumanDto { }
export class CreateKonsumanDto extends OmitType(KonsumenDto, ['id']) { } // buang id
export class KonsumenId extends PickType(KonsumenDto, ['id']) { } // hanya ambil id

export class FindKonsumenDto extends PageRequestDto{
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    nama_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    alamat_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email_konsumen: string

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    no_hp_konsumen: string
}

export class ResponseKonsumenDto extends PageResponseDto{
    @ApiProperty({type : [KonsumenDto]})
    data : KonsumenDto[]
}