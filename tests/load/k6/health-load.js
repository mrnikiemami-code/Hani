import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://host.docker.internal:5099';

export const options = {
  scenarios: {
    readiness: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300', 'p(99)<800'],
  },
};

export default function () {
  const health = http.get(`${baseUrl}/health/ready`);
  check(health, {
    'readiness is 200': (response) => response.status === 200,
    'readiness is json': (response) =>
      String(response.headers['Content-Type'] || '').includes('application/json'),
  });

  const search = http.get(
    `${baseUrl}/market/v1/search?locale=en&page=1&pageSize=10`,
  );
  check(search, {
    'search is 200': (response) => response.status === 200,
  });
  sleep(0.5);
}
