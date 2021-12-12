import { Produk } from "src/produk/entities/produk.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Penjualan } from "./penjualan.entity";


@Entity()
export class PenjualanItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    jumlah_jual: number

    @Column()
    harga_jual: number

    @Column()
    potongan: number

    @ManyToOne(() => Penjualan, data => data.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    penjualan: Penjualan

    @ManyToOne(() => Produk, data => data.id)
    produk: Produk

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
    update_at: Date

    @ManyToOne(() => User, data => data.id)
    user: User

}