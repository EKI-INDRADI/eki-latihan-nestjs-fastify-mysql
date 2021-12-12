import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Connection, Repository } from 'typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';

@Injectable()
// export class ProdukService {
export class ProdukService extends PageService {
  // buat constructor()
  constructor(
    @InjectRepository(Produk) private produkRepo: Repository<Produk>, // inject produk entites
    @InjectConnection() private MySqlConnection: Connection // MANUAL QUERY
    // https://docs.nestjs.com/techniques/database
  ) {
    super()
  }

  create(createProdukDto: CreateProdukDto) {
    return this.produkRepo.save(createProdukDto) //'This action adds a new produk';
  }

  findAll(filter) {
    return this.generatePage(filter, this.produkRepo, {
      relations: ['user']
    })

    // findAll() {
    // return this.produkRepo.find({
    // relations: ['user'] // ManyToOne // src\produk\entities\produk.entity.ts
    // }) //`This action returns all produk`;
  }

  findOne(id: number) {
    return this.produkRepo.findOne(id) //`This action returns a #${id} produk`;
  }

  update(id: number, updateProdukDto: UpdateProdukDto) {
    updateProdukDto.id = id
    return this.produkRepo.save(updateProdukDto) //`This action updates a #${id} produk`;
  }

  async remove(id: number) {
    let produk_result = await this.produkRepo.findOne(id) // cari data produk
    return this.produkRepo.remove(produk_result) //This action removes a #${id} produk`;
  }

  //=================== MANUAL QUERY

  async GetProduk(req_body: any) {

    let res_json: any = {}

    // let query_params = `
    // SELECT * 
    // FROM produk 
    // WHERE 
    // barcode LIKE '%${req_body.condition.barcode}%' OR 
    // nama_produk LIKE  '%${req_body.condition.nama_produk}%' OR 
    // deskripsi_produk LIKE '%${req_body.condition.deskripsi_produk}%'
    // LIMIT 10 
    // OFFSET 20 `

    let query_params = `
    SELECT * 
    FROM produk `

    if (req_body.condition.barcode) {
      query_params = query_params + `WHERE `
      query_params = query_params + `barcode LIKE '%${req_body.condition.barcode}%'  `
    }

    let query_count_params = query_params


    if (req_body.limit) {
      query_params = query_params + ` LIMIT ${req_body.limit}  `
    }

    if (req_body.skip) {
      query_params = query_params + ` OFFSET ${req_body.skip}  `
    }


    let result = await this.MySqlConnection.query(query_params)

    if (req_body.enable_count == 1) {
      let result_count = await this.MySqlConnection.query(query_count_params)

      res_json.total = result_count.length

      if (req_body.limit) {
        res_json.page = Math.ceil(req_body.skip / req_body.limit)
        res_json.pages = Math.ceil(result_count.length / req_body.limit)
      }
    }

    if (req_body.enable_manual_relation_user == 1) {
      for (let i_a = 0; i_a < result.length; i_a++) {
        let getUser = await this.MySqlConnection.query(`SELECT * FROM user WHERE id = ${result[i_a].userId} `)

        delete getUser[0].password
        result[i_a].user = getUser[0]
        delete result[i_a].userId
      }
    }

    res_json.data = result

    return res_json
  }


  //=================== MANUAL QUERY
}
