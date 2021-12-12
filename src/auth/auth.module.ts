import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, // panggil module User
    ConfigModule.forRoot(), // supaya kita bisa panggil seluruh env yang ada pada root folder (folder awal ./)
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '12h' // waktu expred
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy // panggil jwt.stratagy
  ],
  exports : [ // biar bisa di panggil di tempat lain
    AuthService, 
    JwtModule
  ]
})
export class AuthModule { }
