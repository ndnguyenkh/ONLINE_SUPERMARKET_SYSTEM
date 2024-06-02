
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const CartAPI = {
    create: localhost + auth + '/private/carts',
    getAll: localhost + auth + '/private/carts',
    remove: localhost + auth + '/private/carts/',
    addQuantity: localhost + auth + '/private/carts/increase/',
    removeQuantity: localhost + auth + '/private/carts/decrease/',
};

export default CartAPI;