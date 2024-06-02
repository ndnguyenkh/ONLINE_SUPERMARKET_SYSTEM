

const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const CategoryAPI = {
    getAll: localhost + auth + '/public/parent-categories',
    getAllChild: localhost + auth + '/public/child-categories',
    // create: localhost + auth + '/private/suppliers',
    // update: localhost + auth + '/private/suppliers/',
    findById: localhost + auth + '/public/parent-categories/',
    findByIdChild: localhost + auth + '/public/child-categories/',
    create: localhost + auth + '/private/parent-categories',
    createChild: localhost + auth + '/private/child-categories',
    update: localhost + auth + '/private/parent-categories/',
    updateChild: localhost + auth + '/private/child-categories/',
    delete: localhost + auth + '/private/parent-categories/',
    deleteChild: localhost + auth + '/private/child-categories/'
};
export default CategoryAPI;