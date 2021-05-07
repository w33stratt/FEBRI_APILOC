const {tambahStatusBarang, tampilStatusBarang, tampilBarangById, editBarangById, deleteBarangById} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/api',
        handler: tambahStatusBarang,
    },
    {
        method: 'GET',
        path: '/api',
        handler: tampilStatusBarang,
    },
    {
        method: 'GET',
        path: '/api/{invoice_id}',
        handler: tampilBarangById,
    },
    {
        method: 'PUT',
        path: '/api/{invoice_id}',
        handler: editBarangById,
    },
    {
        method: 'DELETE',
        path: '/api/{invoice_id}',
        handler: deleteBarangById,
    },
];

module.exports = routes;
