import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';


// export class JwtGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
@Injectable()
export class JwtGuard extends AuthGuard('jwt'){ // AuthGuard('jwt') <<< jwt adalah  nama strategy

}


