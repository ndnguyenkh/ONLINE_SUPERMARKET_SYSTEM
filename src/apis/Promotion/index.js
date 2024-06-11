
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const PromotionAPI = {
    getAll: localhost + auth + '/public/promotions',
    create: localhost + auth + '/private/promotions',
    update: localhost + auth + '/private/promotions/',
    delete: localhost + auth + '/private/promotions/',
};

export default PromotionAPI;