import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport"; // ini karena autocomplite dari vscode , disable untuk BUG FIX   @UseGuards(JwtGuard) src\auth\auth.controller.ts
import { ExtractJwt, Strategy } from "passport-jwt";  // Strategy untuk BUG FIX   @UseGuards(JwtGuard) src\auth\auth.controller.ts
import { UserService } from "src/user/user.service";

@Injectable()

// PassportStrategy(Strategy, 'jwt') = jwt name strategy nya bisa di rubah sesuai keinginan
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService
    ) {
        super({
            // ======================== ERROR 2, import { Strategy } from "passport-jwt"; 
            //    TypeError: JwtStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)
            //    at new JwtStrategy (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\passport-jwt\lib\strategy.js:55:15)
            //    at new MixinStrategy (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\passport\dist\passport\passport.strategy.js:32:13)
            //    at new JwtStrategy (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\src\auth\jwt.strategy.ts:14:9)
            //    at Injector.instantiateClass (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\core\injector\injector.js:291:19)
            //    at callback (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\core\injector\injector.js:43:41)
            //    at processTicksAndRejections (internal/process/task_queues.js:95:5)
            //    at Injector.resolveConstructorParams (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\core\injector\injector.js:119:24)
            //    at Injector.loadInstance (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\core\injector\injector.js:47:9)
            //    at Injector.loadProvider (D:\_eki-latihan-nestjs-mysql\rnd-nestjs-mysql\node_modules\@nestjs\core\injector\injector.js:69:9)
            //    at async Promise.all (index 4)
            // ======================== /ERROR 2, import { Strategy } from "passport-jwt"; 

            // ======================== SOLUSI ERROR 2
            // SEBELUMNYA : // JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
            // SEHARUSNYA : (menggunakan j kecil)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),      // ini merima tokenya dari mana , kalo ini dari authorization : Bearer <token>
            // ======================== /SOLUSI ERROR 2
            ignoreExpiration: false, // ini setting ada waktu ato tidak untuk expires nya (sama aja expires_in)
            secretOrKey: process.env.JWT_SECRET_KEY, // secretkey untuk generate token
        })
    }

    async validate(payload: any) { // validate adalah function yang diubah dari PassportStrategy, terjadi ketika header bearer (authorization valid)
        let user = await this.userService.findOne(payload.id) // ini ada payload dari JWT (ketika membuat token JWT akan mengirimkan payload),

        // ini maksudnya src\auth\auth.service.ts << pada generate generateToken
        //   generateToken(user:any){
        //     let dataToken = {id:user.id} // <<<<< id ini adalah payload.id
        //     let token = this.jwtService.sign(dataToken)
        //     return {token : token}
        // }
        // dan
        // src\auth\auth.controller.ts
        // @Post()
        // async loginController(@Body() authDto: AuthDto) {
        //   // console.log(authDto)
        //   let user = await this.authService.checkUser(authDto.username, authDto.password)
        //   return this.authService.generateToken({ // untuk generate token berdasarkan payload data (baca dokumentasi jwt terlebih dahulu, karena jwt mampu menyimpan payload (di enkripsi))
        //     id: user.id,   // hanya kirim id saja  (jika butuh payload bnyk kirim payload yg di perlukan)
        //     loginController_payload : user
        //   })
        // }
        // nah dari sinilah payload ini di terima direquest ()

        let payload_loginController: any = {}
        if (payload.tampilkan_semua_payload && payload.tampilkan_semua_payload.loginController_payload) {
            payload_loginController = JSON.parse(JSON.stringify(payload.tampilkan_semua_payload.loginController_payload))
            // kenapa menggunakan JSON.parse(JSON.stringfy(value)) ? 
            // itu karena saya copy object, karena dsni saya akan melakukan printah delete object, 
            // kenapa tidak langsung delete? itu karena jika saya langsung delete akan berdampak pada object asli
            delete payload_loginController.password // supaya password objectnya tidak muncul
        }
 
        if (user) { // variable user ada karena user = await this.userService.findOne(payload.id)
            // return user // memunculkan semua data dari data await this.userService.findOne(payload.id)
            let res_json: any = {
                id: user.id, // ambil id dari user = await this.userService.findOne(payload.id)
                nama_user: user.nama_user, // ambil nama_user dari user = await this.userService.findOne(payload.id)
                payload_login_controller: payload_loginController // ambil dari JWT payload tanpa await this.userService.findOne(payload.id)
                // ,all_payload: payload.tampilkan_semua_payload // ambil dari JWT payload tanpa await this.userService.findOne(payload.id)
                // jangan lupa  (payload : any) untuk bisa pakai "."
            }
            return res_json
        }
        else {
            throw new UnauthorizedException()
        }
    }

}