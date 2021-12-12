<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

##  EKI NOTE :

"sebelumnya terimakasih kepada "Web App Project" Youtube Channel saya tambahkan penjelasan beliau & disini saya tambahkan juga pemahaman typescript saya & beberapa informasi penting dari video tutorial pada comment code" ,

"pentingnya dokumentasi karena disini saya memiliki pengalaman Research & Development tanpa dokumentasi, tanpa portfolio, tanpa bukti nyata adalah 'BULLSHIT' ".

## 1. installation Docker, Phpmyadmin & Mariadb
```bash
install vm alpine + docker
https://github.com/EKI-INDRADI/eki-latihan-vm-alpine-docker-portable

install Docker, Phpmyadmin & Mariadb
https://github.com/EKI-INDRADI/eki-latihan-docker-phpmyadmin-mariadb

create database simple_pos
```

## 2. install nodejs & nestjs

```bash
install nodejs   (https://nodejs.org)

npm i -g @nestjs/cli
nest --version
```

## ==== STAGE 10 = MIGRATION EXPRESS ADAPTER TO FASTIFY ADAPTER


<details>
  <summary>20211212-0045-EXPRESS-TO-FASTIFY-ADAPTER</summary>

  

```bash
/045
```


MySql Fastify : https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-mysql

PostgreSql Fastify : https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-postgresql

Mongodb (mongoose) Fastify : https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-mongodb



RESPONSE :

![EXAMPLE](https://github.com/EKI-INDRADI/eki-latihan-nestjs-mysql/blob/master/_BENCHMARK/AUTOCANNON_RESPONSE.png)


BENCHMARK :

![EXAMPLE](https://github.com/EKI-INDRADI/eki-latihan-nestjs-mysql/blob/master/_BENCHMARK/AUTOCANNON_1.png)

![EXAMPLE](https://github.com/EKI-INDRADI/eki-latihan-nestjs-mysql/blob/master/_BENCHMARK/AUTOCANNON_2_3.png)


BENCHMARK NOTE :

```bash
npm i autocannon -g

autocannon -c 100 -d 40 -p 10 localhost:3000 ( express nestjs )

autocannon -c 100 -d 40 -p 10 localhost:3001 ( fastify nestjs )
```

all result :
https://github.com/fastify/benchmarks


- backend ini sudah banyak menggunakan inject depedency dan perubahan middleware,

- tidak seperti benchmark list pada https://github.com/fastify/benchmarks yang polos tanpa ada inject dependency

- pada benchmark ini fastify adapter nestjs menunjukan kinerja 3x lipat lebih cepat dari express adapter nestjs

- untuk jangka panjang saya belum test lebih lanjut, tetapi jika saya mendapatkan informasi lebih lanjut saya akan infokan pada github ini


```bash

---info
npm uninstall @nestjs/platform-express
npm i --save @nestjs/platform-fastify

reference : 
https://docs.nestjs.com/techniques/performance

npm uninstall @nestjs/swagger swagger-ui-express
npm install --save @nestjs/swagger fastify-swagger

reference : 
https://docs.nestjs.com/openapi/introduction


//============================ MULTER NOT SUPPORT FASTIFY ADAPTER
NOTE : https://docs.nestjs.com/techniques/file-upload (fastify tidak support multer multipart form data di nestjs)

silahkan coba depedency alternative lain, 

atau mungkin untuk file upload dapat menggunakan nestjs express secara terpisah, 

toh jika tujuannya ingin membuat microservices, 

memang seharusnya terpisah
//============================ /MULTER NOT SUPPORT FASTIFY ADAPTER



//====================================FASITFY BUG FIX

---
UnhandledPromiseRejectionWarning: TypeError: this.setInstance is not a function
    at new FastifyAdapter (D:\_eki-latihan-nestjs-mysql-fastify\rnd-nestjs-mysql\node_modules\@nestjs\platform-fastify\adapters\fastify-adapter.js:72:14)
    at bootstrap (D:\_eki-latihan-nestjs-mysql-fastify\rnd-nestjs-mysql\src\main.ts:13:5)
    at Object.<anonymous> (D:\_eki-latihan-nestjs-mysql-fastify\rnd-nestjs-mysql\src\main.ts:55:1)
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
(Use `node --trace-warnings ...` to show where the warning was created)
(node:21788) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:21788) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
---


npm update @nestjs/core  


//====================================/FASITFY BUG FIX

---/info

---code
update src\main.ts

// const app = await NestFactory.create(AppModule); // OLD CODE

const app = await NestFactory.create<NestFastifyApplication>( // FASTIFY
  AppModule,
  new FastifyAdapter()
);

// await app.listen(3000); // 127.0.0.1/localhost
await app.listen(3000, '0.0.0.0'); // global ip


update src\produk\produk.controller.ts

---sebelum
import { Request } from 'express'; //MANUAL QUERY ganti request express nya pake default nestJs aja

  @Post('/produk-manual-query')
  @ApiBody({ type: ProdukManualQueryDto })
  produkManualQuery(
    @Req()
    req: Request
  ): any {

   return this.produkService.GetProduk(req.body)
  }

---/sebelum

---sesudah
// import { Request } from 'express'; //MANUAL QUERY ganti request express nya pake default nestJs aja

  @Post('/produk-manual-query')
  @ApiBody({ type: ProdukManualQueryDto })
  produkManualQuery(
    @Body()
    req_body: ProdukManualQueryDto
  ): any {

   return this.produkService.GetProduk(req_body)
  }
---/sesudah


  update src\produk\dto\create-produk.dto.ts

---sebelum_1
export class ProdukDto {
  ...
  ...
    @ApiProperty({ format: 'binary' })
    @IsOptional()
    foto: string
---/sebelum_1

---sesudah_2
    @ApiProperty() 
    @IsOptional()
    foto: string
---/sesudah_2

updatesrc\produk\produk.controller.ts

---sebelum_2
  import { FileInterceptor } from  '@nestjs/platform-express';
  import { diskStorage } from 'multer';

  @Post() 
  @UseInterceptors(FileInterceptor('foto', {
       storage: diskStorage({ 
         destination: './assets/produk',
         filename: (req: any, file, cb) => {
           let number_user_id = Number(req.user.id)
           let eki_auto_generate = "PD"
             + new Date().getFullYear() 
             + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
             + ("0" + new Date().getDate()).slice(-2) + "-"
             + "USR" + number_user_id.toString().padStart((String(number_user_id).length > 4) ? String(number_user_id).length : 4, '0') + "-"
             + Date.now()

           cb(null, eki_auto_generate + extname(file.originalname))
       }
     })
   }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProdukDto })
  create(@InjectUser() createProdukDto: CreateProdukDto, @UploadedFile() foto: Express.Multer.File) {
    createProdukDto.foto = foto.filename //DISABLE FASTIFY ADAPTER
    return this.produkService.create(createProdukDto);
  }
---/sebelum_2

---sesudah_2
  @Post()
  @ApiBody({ type: CreateProdukDto })
  create(@InjectUser() createProdukDto: CreateProdukDto) { 
    return this.produkService.create(createProdukDto);
  }
---/sesudah_2

---sebelum_3
 @Patch(':id')
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './assets/produk',
      filename: (req: any, file, cb) => {
        let number_user_id = Number(req.user.id)
        let eki_auto_generate = "PD"
          + new Date().getFullYear()
          + ("0" + (new Date().getMonth() + 1)).slice(-2)
          + ("0" + new Date().getDate()).slice(-2) + "-"
          + "USR" + number_user_id.toString().padStart((String(number_user_id).length > 4) ? String(number_user_id).length : 4, '0') + "-"
          + Date.now()
        cb(null, eki_auto_generate + extname(file.originalname))
      }
    })
  }))
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ type: UpdateProdukDto }) 
  update(@Param('id') id: string, @InjectUser() updateProdukDto: UpdateProdukDto, @UploadedFile() foto: Express.Multer.File) {
     if (foto) {
       updateProdukDto.foto = foto.filename
    }
    return this.produkService.update(+id, updateProdukDto);
  }
---/sebelum_3

---sesudah_3
  @Patch(':id')
  @ApiBody({ type: UpdateProdukDto })
  update(@Param('id') id: string, @InjectUser() updateProdukDto: UpdateProdukDto) {
    return this.produkService.update(+id, updateProdukDto);
  }
---/sesudah_3


//=========================== WAJIB REBUILD DIST FILE

delete /dist files

---- build kembali file /dist nya
npm run build
----
//=========================== /WAJIB REBUILD DIST FILE


---/code

```

</details>


## ==== /STAGE 10 = MIGRATION EXPRESS ADAPTER TO FASTIFY ADAPTER


mohon maaf lama update, karena tidak memiliki banyak waktu karena saya bekerja pada salah 1 perusahaan startup dengan waktu kerja 11-12 jam per hari

semoga dokumentasi ini bermanfaat cukup liat setiap branch nya, akan langsung paham (sudah dibuat komentar code untuk di pahami juga)

end video  04:24:41 [pagenation rekening done]

stage 8 - update manual raw query SQL

stage 9 - migrasi MySql to PostgreSql

stage 10 - migrasi express adapter nestjs to fastify adapter nestjs

 
## REFERENSI :

NestJs (express) - MySQL - https://www.youtube.com/watch?v=WuGKMQpVQRA (thanks to Web App Project)

## EKI INDRADI

"TIME > KNOWLEDGE > MONEY". #STILL_ONE_DIGIT
