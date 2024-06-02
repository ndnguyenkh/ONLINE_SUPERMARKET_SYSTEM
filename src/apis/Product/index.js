

const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const ProductAPI = {
    getAll: localhost + auth + '/public/products',
    create: localhost + auth + '/private/products',
    update: localhost + auth + '/private/products/',
    delete: localhost + auth + '/private/products/',
    // findById: localhost + auth + '/public/suppliers/',
    // findById: localhost + auth + '/public/suppliers/',
};
export default ProductAPI;