import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';


@ValidatorConstraint({async:true}) // karena validasi buatan sendiri, ValidatorConstraint diset asynchronous, agar erornya diproses sebelum printah simpan dieksekusi

@Injectable()
// export class ExistValidator {}
export class ExistValidator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) { // mewajibkan menggunakan function validate (pada ValidatorConstraintInterface), karena diperluan untuk return true atau false
        // perlu kirimkan Repositorinya / Entity  dan field untuk melakukan validasi
        // console.log(args.constraints[1])
        let find = { [args.constraints[1]]: args.value } // berpengaruh pada src\user\dto\create-user.dto.ts
        // example   find = { email : admin@gmail.com }
        // console.log(args.constraints[0])
        let check = await getConnection().getRepository(args.constraints[0]).findOne(find)

        if (check) return true 
        return false
    }

    defaultMessage(args: ValidationArguments) {
        // args.property  = nama object  , args.value = value object
        return args.property + ' ' + args.value + ' tidak ditemukan'
    }

}

export function IsExist(option:any,validationOption?:ValidationOptions){
    return function (object:any, propertyName:string) {
        registerDecorator({ // ikutin aja gw juga kurang paham >.<
            name : 'IsExist', // nama yang akan digunakan nanti pada DTO
            target : object.constructor,
            propertyName : propertyName,
            constraints : option,
            options : validationOption, // diambil dari class validator
            validator : ExistValidator, // diambil dari class name
            async : true
        })
    }
}

