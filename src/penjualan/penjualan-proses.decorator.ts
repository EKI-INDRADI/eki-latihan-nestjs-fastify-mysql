import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

// export const PenjualanProses = (...args: string[]) => SetMetadata('penjualan-proses', args);


export const PenjualanProses = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    let user = { id: req.user.id }
    req.body.user = user
    let total_transaksi = 0
    let total_potongan = 0
    let total_bayar = 0
    req.body.item.forEach(req_body_item_arr => {
        total_transaksi += parseFloat(req_body_item_arr.jumlah_jual) * parseFloat(req_body_item_arr.harga_jual)
        total_potongan += parseFloat(req_body_item_arr.potongan)
        req_body_item_arr.user = user
    })

    req.body.bayar.forEach(req_body_bayar_arr => {
        total_bayar += parseFloat(req_body_bayar_arr.jumlah_bayar)
        req_body_bayar_arr.user = user
    })

    req.body.total_transaksi = total_transaksi
    req.body.total_potongan = total_potongan
    req.body.total_bayar = total_bayar

    return req.body
})