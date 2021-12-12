import { Konsuman } from "src/konsumen/entities/konsuman.entity";
import { Produk } from "src/produk/entities/produk.entity";
import { Rekening } from "src/rekening/entities/rekening.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn() //  otomatis generate sebagai primary key + auto increment
    id: number

    @Column()
    nama_user: string

    // @Column({ unique: true })
    // pada class validator ada untuk melakukan validasi data yang sama (duplicate entry) berdasarkan class / array data , 
    // jika terdapat value yang sama maka akan error 500 pada request,
    // {
    //     "statusCode": 500,
    //     "message": "Internal server error"
    // }
    // maka pastikan sebelum unique : true pastikan telah menghapus data value kembar pada database
    // karena error tidak detail , maka diperluan validasi function manual
    @Column()
    email: string

    @Column()
    username: string

    @Column({ name: 'password', select: false }) // {select : false} atau { name: 'password', select: false } sama saja
    password: string

    @CreateDateColumn() // auto generate create new Date()
    create_at: Date

    @UpdateDateColumn() // auto generate update new Date()
    update_at: Date

    // relasi kepada produk
    // ERD : user - produk
    // ERD : 1 - *
    // agar user dapat melakukan relasi pada produk 
    @OneToMany(() => Produk, data => data.id)
    produk: Produk

    @OneToMany(() => Konsuman, data => data.id) // (yang di generate adalah Konsumen) tetapi classnya Konsuman, entities\konsuman.entity.ts  
    konsumen: Konsuman  //ini adalah kesalahan dari nest, kemungkinan karena auto checking english translate men jadi man

    @OneToMany(() => Rekening, data => data.id) 
    rekening: Rekening  

}
