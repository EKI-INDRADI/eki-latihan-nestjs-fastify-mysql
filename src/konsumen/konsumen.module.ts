import { Module } from '@nestjs/common';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { Konsuman } from './entities/konsuman.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Konsuman])  // (yang di generate adalah Konsumen) tetapi classnya Konsuman, entities\konsuman.entity.ts  
    // ini adalah kesalahan dari nest, kemungkinan karena auto checking english translate men jadi man

  ],
  controllers: [KonsumenController],
  providers: [KonsumenService]
})
export class KonsumenModule { }
