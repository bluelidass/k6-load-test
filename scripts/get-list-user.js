import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
    stages: [
        {duration: '5s', target: 100},
        {duration: '10s', target: 100},
        {duration: '5s', target: 0}
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500']
    }
};

const BASE_URL = 'https://gorest.co.in';

export default () => {
    const listUser = http.get(`${BASE_URL}/public/v2/users/`);

    check(listUser, {
        // 'get list user': (resp) => resp.status == 200,
        'get list user': (obj) => obj.length > 0
    });

    sleep(1);
};