
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const ProviderAPI = {
    getAll: localhost + auth + '/public/suppliers',
    create: localhost + auth + '/private/suppliers',
    update: localhost + auth + '/private/suppliers/',
    findById: localhost + auth + '/public/suppliers/',
    delete: localhost + auth + '/private/suppliers/',
};
export default ProviderAPI;