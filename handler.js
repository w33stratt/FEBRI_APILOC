
const {nanoid} = require('nanoid');
const banks = require('./bank');

//tambah barang
const tambahStatusBarang = (request, h) => {
    const {detail_transaksi, jumlah_saldo, status} = request.payload;

    const invoice_id = nanoid(16);
    /* createdAt = Date
        updateAt = Date */
    
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newBarang = {
        invoice_id, detail_transaksi, jumlah_saldo, status, createdAt, updatedAt,
    };

    banks.push(newBarang);

    const isSucces = banks.filter((bank) => bank.invoice_id).length > 0;

    if(isSucces){
        const response = h.response({
            status: 'success',
            message: 'Barang berhasil ditambahkan',
            data: {
                invoice_id}
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'failed',
        message: 'Barang gagal ditambahkan',
 
    });
    response.code(500);
    return response;
};

//nampil barang
const tampilStatusBarang = () => ({
    status: 'success',
    data: {
        banks,
    },
});

//nampilin barang per invoice id
const tampilBarangById = (request, h) => {
    const {invoice_id} = request.params;

    const bank = banks.filter((bank) => bank.invoice_id === invoice_id)[0];

    if(bank!== undefined){
        return {
            status: 'success',
            data: {
                bank,
            },
        };
    }
    const response = h.response({
        status: 'failed',
        message: 'Barang tidak ditambahkan',
    });
    response.code(404);
    return response;
}

//edit barang per invoice id
const editBarangById = (request, h) => {
    const {invoice_id} = request.params;
    const {detail_transaksi, jumlah_saldo, status} = request.payload;
    const updateAt = new Date().toISOString();

    const index = banks.findIndex((bank) => bank.invoice_id === invoice_id);

    if(index !== -1){
        banks[index] = {
            ...banks[index],
            detail_transaksi,
            jumlah_saldo,
            status,
            updateAt
        };

        const response = h.response({
            status: 'success',
            message: 'Barang berhasil diperbahrui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'Barang gagal diperbaharui, invoice tidak ditemukan',
    });
    response.code(404);
    return response;
}

//delete barang by invoice id
const deleteBarangById = (request, h) => {
    const {invoice_id} = request.params;

    const index = banks.findIndex((bank) => bank.invoice_id === invoice_id);

    if(index !== -1){
        banks.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Barang berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'failed',
        message: 'Barang gagal dihapus, invoice tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {tambahStatusBarang, tampilStatusBarang, tampilBarangById, editBarangById, deleteBarangById};
