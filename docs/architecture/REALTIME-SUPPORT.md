# Real-Time Support

## Transport

- SignalR hub: `/hubs/support`
- The hub is authenticated with the existing JWT. For browser clients the API
  reads the HttpOnly `hani_access_token` cookie on the hub path and also accepts
  a standard bearer token for non-browser clients.
- CORS is enabled with credentials for explicit `Cors:AllowedOrigins`.

## Groups and access

- A client calls `JoinTicket(ticketId)`.
- Customers can join only tickets where `user_id` equals their JWT user id.
- `Admin` and custom roles with `support.view` can join any ticket.
- Events carry ids only; clients call the authorized server-rendered page again
  instead of receiving internal note bodies.

## Events

- `SupportMessageAdded`: `{ ticketId, messageId, authorType, isInternal }`
- `SupportDisputeUpdated`: `{ ticketId, disputeId, status }`

Customer clients ignore `isInternal=true`; admin clients may refresh for
internal notes. A 60-second visible-tab polling fallback keeps the page usable
when the hub is unavailable.

## Frontend configuration

- `NEXT_PUBLIC_API_BASE_URL` must point at the API origin used by the browser,
  for example `https://api.hani.ir`.
- The browser cookie must be shared by the frontend and API origins in
  production, or the auth cookie must use a common parent domain.
