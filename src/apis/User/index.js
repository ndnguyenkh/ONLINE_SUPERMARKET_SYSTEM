
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const UserAPI = {
    // register: 'http://localhost:9090/api/v1/register',
    register: localhost + auth + '/register',
    createAddressUser: localhost + auth + '/account/addresses',
    login: '',

    getUser: localhost + auth + '/account',
    getAddress: localhost + auth + '/account/addresses',
    editUser: localhost + auth + '/account',
    editAddressUser: localhost + auth + '/account/addresses/',
    removeAddressUser: localhost + auth + '/account/addresses/',
    changePassword: localhost + auth + '/account/change-password',
    payment: localhost + auth + '/payment/vn-pay',

    getAllUsers: localhost + auth + '/public/users',
    lock: localhost + auth + '/private/users/lock/',
    unLock: localhost + auth + '/private/users/unlock/',
    updateByAdmin: localhost + auth + '/private/users/',
};
export default UserAPI;