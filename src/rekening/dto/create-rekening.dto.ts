

import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsObject, IsOptional, IsString } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { CreateUserDto } from "src/user/dto/create-user.dto"
import { Rekening } from "../entities/rekening.entity"

export class RekeningDto {
    @ApiProperty()
    @IsExist([Rekening, 'id'])
    id: number

    @ApiProperty()
    @IsString()
    nama_rekening: string

    @ApiProperty()
    @IsString()
    keterangan_rekening: string

    @ApiProperty()
    @IsString()
    type_rekening: string

    @ApiHideProperty() // HIDE SWAGGER SCHEMA USER
    @IsObject()
    user: CreateUserDto
}

// export class CreateRekeningDto { }
export class CreateRekeningDto extends OmitType(RekeningDto, ['id']) { } // buang id
export class RekeningIdDto extends PickType(RekeningDto, ['id']) { } // ambil id doang

export class FindRekening extends PageRequestDto{
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    nama_rekening: string
}

export class ResponRekeningDto extends PageResponseDto {
    @ApiProperty({type : [RekeningDto]})
    data : RekeningDto[]

}