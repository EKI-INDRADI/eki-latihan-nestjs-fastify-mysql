import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth') // supaya  dokumentasi tampil di swagger (auto generate)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Get()
  @ApiBearerAuth() // ini berfungsi agar swagger tau bahwa API ini memerlukan header (Bearer token) untuk authorize routesnya (contoh gambar gembok dikanan nama routes)
  @UseGuards(JwtGuard) // melindungin request dengan JWT menggunakan Guard
  checkUserController(@Request() req) {
      // ======================== ERROR 1, KETIKA NENAMBAHKAN UseGuard
    // Error: Strategy#authenticate must be overridden by subclass
    // at JwtStrategy.Strategy.authenticate (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\passport-strategy\lib\strategy.js:21:9)
    // at attempt (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\passport\lib\middleware\authenticate.js:366:16)
    // at authenticate (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\passport\lib\middleware\authenticate.js:367:7)
    // at D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\passport\dist\auth.guard.js:91:3
    // at new Promise (<anonymous>)
    // at D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\passport\dist\auth.guard.js:83:83
    // at JwtGuard.<anonymous> (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\passport\dist\auth.guard.js:49:36)
    // at Generator.next (<anonymous>)
    // at fulfilled (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\passport\dist\auth.guard.js:17:58)
    // at processTicksAndRejections (internal/process/task_queues.js:95:5)
    // ======================== /ERROR 1, KETIKA NENAMBAHKAN UseGuard

    // ======================== SOLUSI ERROR 1
    // pada JWT strategy (src\auth\jwt.strategy.ts), seharusnya mengambil dari passport-jwt
    // ------------ SEBELUM
    // import { Strategy } from "passport";
    // import { ExtractJwt } from "passport-jwt";
    // ------------ /SEBELUM

    //------------- SESUDAH
    // import { ExtractJwt, Strategy } from "passport-jwt";
    //------------- /SESUDAH
    // ======================== /SOLUSI ERROR 1
    return req.user
  }

  @Post()
  async loginController(@Body() authDto: AuthDto) {
    // console.log(authDto)
    let user = await this.authService.checkUser(authDto.username, authDto.password)
    return this.authService.generateToken({ // untuk generate token berdasarkan payload data (baca dokumentasi jwt terlebih dahulu, karena jwt mampu menyimpan payload (di enkripsi))
      id: user.id,   // hanya kirim id saja  (jika butuh payload bnyk kirim payload yg di perlukan)
      loginController_payload : user
    })
  }

}
