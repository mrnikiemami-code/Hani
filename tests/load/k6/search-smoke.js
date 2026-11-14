import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://host.docker.internal:5099';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_failed: ['rate==0'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const response = http.get(`${baseUrl}/market/v1/search?locale=en&page=1&pageSize=20`);
  check(response, {
    'search 200': (result) => result.status === 200,
    'search json': (result) => (result.headers['Content-Type'] || '').includes('application/json'),
  });
  sleep(1);
}
