
const localhost = 'http://localhost:9090';

const auth = '/api/v1';

const ScheduleAPI = {
    create: localhost + auth + '/private/schedules',
    getAll: localhost + auth + '/private/schedules',
    getByUser: localhost + auth + '/private/schedules/account',
    delete: localhost + auth + '/private/schedules/',
};

export default ScheduleAPI;