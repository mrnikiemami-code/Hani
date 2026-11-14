import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://host.docker.internal:5099';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

export default function () {
  const responses = http.batch([
    ['GET', `${baseUrl}/sitemap.xml`],
    ['GET', `${baseUrl}/content-sitemap.xml`],
    ['GET', `${baseUrl}/robots.txt`],
  ]);

  check(responses[0], { 'sitemap 200': (result) => result.status === 200 });
  check(responses[1], { 'content sitemap 200': (result) => result.status === 200 });
  check(responses[2], { 'robots 200': (result) => result.status === 200 });
  sleep(1);
}
