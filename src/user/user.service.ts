import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
    // inject entity user 
    // Repository<User>   = menfaatkan Generic class 
    // sudah termasuk request response berdasarkan generic class user
  ) { }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password)
    return this.userRepo.save(createUserDto); // panggil generic class user  (schema) untuk melakukan create
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  //================ keperluan auth services
  findUsername(username) {
    // return this.userRepo.findOne({ username: username }); // SEEBELUM BUG FIX
    // return this.userRepo.createQueryBuilder('user') 
    //   .addSelect('password').where({ username: username }).getRawOne() // OLD BUG FIX (VERSI SAYA)
    return this.userRepo.findOne({ username: username }, { select: ['id', 'password'] }); //NEW BUG FIX (VERSI VIDEO)

    //======================= NOT USED
    //============ BUG FIX 
    // https://stackoverflow.com/questions/65870541/typeorm-nestjs-using-querybuilder
    // https://github.com/typeorm/typeorm/issues/5816
    // return await this.userRepo
    //   .createQueryBuilder('users')
    //   .select('users.first_name', 'fName')
    //   .addSelect('users.last_name', 'lName')
    //   .addSelect('adr.address', 'address')
    //   .addSelect('adr.city', 'city')
    //   .innerJoin('address', 'adr', 'adr.user_id=users.id')
    //   .printSql() 
    //   .getRawMany();
    // console.log(user)
    //======================= NOT USED
  }
  //================ / keperluan auth services

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id // inject id (berdasarkan request) , maka kondisi akan update
    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password)
    }
    return this.userRepo.save(updateUserDto);
    // jika pada object/value dari .save memiliki ID sama  & kondisnya sama dengan existing maka akan replace.
    // tetapi jika tidak ada id maka otomatis akan create baru
  }

  async remove(id: number) { // async function
    let user = await this.userRepo.findOne(id) // cari data berdasarkan id request
    return this.userRepo.remove(user); // jika di temukan maka hapus
  }
  // setelah ada fitur IsUnique src\etc\validator\unique-validator.ts 
  // ketika telah berhasil dihapus misalkan id 8
  // maka ketika menghapus id 8 kembali akan error ExceptionHandler
  // karena tidak adanya nilai yang ingin dihapus 
  // cara penanganannya adalah selanjutnya akan di bahas IsExist validator
  // solusinya : 
  // 1. UserIdDto src\user\dto\create-user.dto.ts 
  // 2. remove(@Param() get_UserIdDto: UserIdDto)  src\user\user.controller.ts


  hash(plaintextPassword) {
    // const hash = bcrypt.hash(plaintextPassword, 10) // jika hash return nya berupa promise
    const hash = bcrypt.hashSync(plaintextPassword, 10)
    return hash
  }

  //================ keperluan auth services
  compare(plaintextPassword, hashPassword) {
    const valid = bcrypt.compareSync(plaintextPassword, hashPassword)
    return valid
  }
  //================ /keperluan auth services

}
