import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://host.docker.internal:5099';
const token = __ENV.ACCESS_TOKEN || '';

export const options = {
  scenarios: {
    support: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 30 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '5s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<400', 'p(99)<900'],
  },
};

export default function () {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const list = http.get(
    `${baseUrl}/market/v1/support/tickets?page=1&pageSize=20`,
    { headers },
  );
  check(list, {
    'list is 200': (response) => response.status === 200,
  });
  const health = http.get(`${baseUrl}/health/ready`);
  check(health, {
    'readiness is 200': (response) => response.status === 200,
  });
  sleep(0.5);
}
