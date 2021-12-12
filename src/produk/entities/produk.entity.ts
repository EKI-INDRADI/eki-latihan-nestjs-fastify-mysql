import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Produk {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    barcode: string

    @Column()
    nama_produk: string

    @Column()
    deskripsi_produk: string

    @Column()
    harga_beli: number

    @Column()
    harga_jual: number

    @Column()
    foto: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" }) // generate langsung waktu updatenya memunculkan pada object {onUpdate : value} // mungkin nanti akan otomatis keluar pada result object
    update_at: Date

    // relasi kepada user  
    // ERD : produk - user
    // ERD : * - 1
    @ManyToOne(() => User, data => data.id) // User dari entities
    user: User // dari entities


}
