
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const OrdersAPI = {
    updateState: localhost + auth + '/private/orders/update',
};

export default OrdersAPI;