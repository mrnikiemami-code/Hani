import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://host.docker.internal:5099';

export const options = {
  scenarios: {
    search: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '15s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '15s', target: 0 },
      ],
      gracefulRampDown: '5s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
  },
};

export default function () {
  const response = http.get(`${baseUrl}/market/v1/search?locale=en&page=1&pageSize=20`);
  check(response, {
    'status is 200': (result) => result.status === 200,
  });
  sleep(1);
}
