import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]) // mengaktifkan seluruh entity user

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // agar bisa digunakan di tempat lain harus export  (keperluan jwt)
})
export class UserModule {}
