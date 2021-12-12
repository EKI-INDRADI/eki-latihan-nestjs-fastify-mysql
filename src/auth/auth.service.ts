import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

// import { User } from 'src/user/entities/user.entity'; // BUG FIX
// import { InjectRepository } from '@nestjs/typeorm'; // BUG FIX
// import { Repository } from 'typeorm'; // BUG FIX

@Injectable()
export class AuthService { // services ini digunakan untuk melakukan pengecekan login valid / tidak
    constructor(
        private userService: UserService,
        private jwtService: JwtService, // untuk generate token

        // private userRepo: Repository<User> // BUG FIX
        // @InjectRepository(User) private userRepo: Repository<User> // BUG FIX
    ) {

    }


    // function untuk cek user
    async checkUser(username, password) {
        let user = await this.userService.findUsername(username)
       
        if (user) {
            const valid = this.userService.compare(password, user.password)  // tidak perlu await karena sudah menggunakan bcrypt.compareSync pada services/function nya
            if (valid) {
                return user
            } else {
                throw new BadRequestException({ message: 'Password salah' })
            }
        } else {
            throw new BadRequestException('Username tidak ditemukan')
        }

    }


    generateToken(user: any) {
        let dataToken = { id: user.id, tampilkan_semua_payload: user } /// contoh payload JWT
        let token = this.jwtService.sign(dataToken)
        return { token: token }
    }

}
