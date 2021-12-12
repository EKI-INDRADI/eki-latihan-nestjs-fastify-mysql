import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { IsUnique } from "src/etc/validator/unique-validator"
import { UserDto } from "src/user/dto/create-user.dto"
import { Produk } from "../entities/produk.entity"

export class ProdukDto {
    @ApiProperty() //swagger
    @IsExist([Produk, 'id'])
    @IsNumber()
    id: number

    @ApiProperty()
    @IsUnique([Produk, 'barcode'])
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nama_produk: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    deskripsi_produk: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_beli: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    harga_jual: number

    @ApiProperty({ format: 'binary' })  // untuk merubah menjadi file upload
    @IsOptional() // jangan setting ke string
    foto: string

    // @ApiProperty() 
    // @IsDate()
    // create_at: Date

    // @ApiProperty() 
    // @IsDate()
    // update_at: Date

    @ApiHideProperty() // <<< ini berguna untuk exclude swagger,  gak perlu di input user @ApiProperty() (otomatis dari user login)
    @IsObject()  //datanya harus object (karena relasi dari user)
    user: UserDto // pake fieldnya mengikuti UserDto
}
export class CreateProdukDto extends OmitType(ProdukDto, ['id']) { } //OmitType dari swagger & buang id nya  // OmitType = buang sebagian
export class ProdukIdDto extends PickType(ProdukDto, ['id']) { } //PickType dari swagger & hanya ambil id nya  // PickType = ambil sebagian

export class FindProdukDto extends PageRequestDto { // keperluan pencarian
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    barcode: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    nama_produk: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    deskripsi_produk: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    harga_beli: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    harga_jual: number
}

export class ResponProdukDto extends PageResponseDto {
    @ApiProperty({type : [ProdukDto]})
    data : ProdukDto[]

}

//==============  default 
// export class CreateProdukDto {}
//==============  /default 