# ADR-0036: OTP Security State with Memory-First Provider

- Status: Accepted
- Date: 2026-11-17
- Gate: 9.1 / identity security

## Context

The OTP flow previously counted historical OTP rows to enforce request limits,
used a 60-second resend cooldown while codes lived for 120 seconds, and had no
IP-aware mobile-change limit. A user could become locked out after normal
retries, and the limit state was not configurable by administrators.

## Decision

1. OTP security state is exposed through `IOtpSecurityState`.
2. The default implementation is `InMemoryOtpSecurityState`, registered as a
   singleton. It is safe for a single API instance and uses a process lock for
   atomic check-and-record operations.
3. A Redis implementation can replace the registration later without changing
   the request/verify handlers or the public API.
4. The persisted policy is `OtpSecurityConfig`, stored in
   `identity.security_settings` and edited through the admin security page.
5. The policy covers code lifetime, resend cooldown, hourly mobile request cap,
   verify attempts, IP mobile-change window, distinct mobile cap, IP block
   duration, and IP request window.
6. Requests are rejected with a stable error code and retry duration when the
   mobile cooldown, hourly cap, IP request cap, or mobile-change cap is hit.
7. Forwarded IP headers are trusted only from a configured reverse proxy in
   production; direct connections use `RemoteIpAddress`.
8. The admin page can clear a mobile cooldown or IP block without editing the
   database.

## Consequences

- A user cannot request a second code for the same mobile during the configured
  cooldown (120 seconds by default).
- Three distinct mobiles can be requested from one IP in the window; the fourth
  blocks that IP temporarily.
- Multi-instance deployments must register a Redis-backed `IOtpSecurityState`;
  the memory provider is intentionally process-local.
- The OTP pepper and code values are never exposed through the security admin
  API.
