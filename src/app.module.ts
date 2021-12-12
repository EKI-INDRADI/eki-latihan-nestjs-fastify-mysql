import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';
import { UniqueValidator } from './etc/validator/unique-validator';
import { AuthModule } from './auth/auth.module';
import { ProdukModule } from './produk/produk.module';
import { Produk } from './produk/entities/produk.entity';
import { KonsumenModule } from './konsumen/konsumen.module';
import { RekeningModule } from './rekening/rekening.module';
import { Konsuman } from './konsumen/entities/konsuman.entity';
import { Rekening } from './rekening/entities/rekening.entity';
import { PenjualanModule } from './penjualan/penjualan.module';
import { Penjualan } from './penjualan/entities/penjualan.entity';
import { PenjualanItem } from './penjualan/entities/penjualan-item.entity';
import { PenjualanBayar } from './penjualan/entities/penjualan-bayar.entity';
import { PageService } from './etc/service/page/page.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User, // jangan lupa tambahin setelah selesai buat user.entity.js
        Produk, // karena adanya  synchronize : true, maka produk tabel akan otomatis digenerate didatabase
        Konsuman, // (yang di generate adalah Konsumen) tetapi classnya Konsuman, entities\konsuman.entity.ts , ini adalah kesalahan dari nest, kemungkinan karena auto checking english translate men jadi man
        Rekening,
        Penjualan,
        PenjualanItem,
        PenjualanBayar
      ],
      synchronize: true // entity yang dibuat tablenya akan otomatis di generate
    }),
    UserModule,
    AuthModule,
    ProdukModule,
    KonsumenModule,
    RekeningModule,
    PenjualanModule
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator, UniqueValidator, PageService],
})
export class AppModule { }
