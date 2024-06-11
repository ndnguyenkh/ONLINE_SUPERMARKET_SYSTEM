const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const StockAPI = {
    getAllEx: localhost + auth + '/public/export-stocks',
    getAllIx: localhost + auth + '/public/import-stocks',
    createIn: localhost + auth + '/private/import-stocks',
    createEx: localhost + auth + '/private/export-stocks',
};
export default StockAPI;