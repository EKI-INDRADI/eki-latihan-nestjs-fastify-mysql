import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
// const app = await NestFactory.create(AppModule); // OLD CODE
  const app = await NestFactory.create<NestFastifyApplication>( // FASTIFY
    AppModule
    ,
    new FastifyAdapter()
  );


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // validasi berdasarkan DTO
    forbidUnknownValues: true,
    transform: true, //  supaya ada message errornya.
    validateCustomDecorators: true, // karena ada validasi buatan sendiri, IsUnique src/etc/validator/unique-validator, pada src\user\dto\create-user.dto.ts
    transformOptions: {  // karena ada validasi buatan sendiri, sda
      enableImplicitConversion: true  // karena ada validasi buatan sendiri, sda
    }
    //=============== ERROR MESSAGE TO OBJECT DETAIL VALIDATION
    // import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
    // exceptionFactory: (validationErrors: ValidationError[] = []) => {
    //   return new BadRequestException(validationErrors);
    // },
    //=============== /ERROR MESSAGE TO OBJECT DETAIL VALIDATION

  })) // middleware

  //============== SWAGGER
  const configSwagger = new DocumentBuilder()
    .setTitle('OPEN-API POS')
    .setDescription('Documentasi untuk api point of sale')
    .setVersion('1.3')
    .addBearerAuth()  // karena token disini menggunakan Bearer Aeuth , ada banyak security contoh lainnya : // .addApiKey('x-access-token') // .addBasicAuth
    .build()

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  }
  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger)

  // fs.writeFileSync("./swagger-spec.json", JSON.stringify(swaggerDocument)); // generate swagger json

  SwaggerModule.setup('api-docs', app, swaggerDocument, configCustomSwagger)
  // api-docs = routes
  //============== /SWAGGER
  // await app.listen(3000); // 127.0.0.1/localhost
  await app.listen(3001, '0.0.0.0'); // global ip
}
bootstrap();

