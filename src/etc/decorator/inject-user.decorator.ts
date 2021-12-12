import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

// export const InjectUser = (...args: string[]) => SetMetadata('inject-user', args);
export const InjectUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    // tujuannya adalah untuk mengisi user pada produk 
    // @IsObject()  
    // user: UserDto 
    // src\produk\dto\create-produk.dto.ts
    req.body.user = { id : req.user.id} // DATA INI RESULT JIKA KONDISI SUDAH LOGIN
 
    return req.body
})