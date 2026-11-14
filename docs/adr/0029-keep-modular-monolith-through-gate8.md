# ADR-0029: Keep the modular monolith through Gate 8

- Status: Accepted
- Date: 2026-11-14
- Gate: 8

## Context

Hani is a modular monolith. Each module owns a PostgreSQL schema, an
application layer, and a presentation layer. Cross-module reads go through
contract projects. Integration events and the MassTransit outbox are already
wired for the supply module.

Gate 8 asks for a microservice extraction decision. Extraction is justified by
independent scaling, independent deployment cadence, failure isolation, or team
ownership. It is not justified only by a desire for a distributed diagram.

## Decision

Keep the modular monolith for Gate 8.

The following seams are mandatory and already enforced:

- one schema per module (`catalog`, `supply`, `content`, `identity`, `booking`,
  `payment`, `settlement`);
- no direct references to another module's domain or infrastructure;
- cross-module reads through `Hani.Contracts.*` interfaces;
- integration events through `IIntegrationEventPublisher` and the outbox;
- module migrations are independent;
- the API composition root is the only place that wires modules together.

## Extraction candidates and triggers

| Candidate | Extract when | Why |
|---|---|---|
| Catalog/Search | Search traffic or index size needs independent scaling | Read-heavy and naturally cacheable |
| Settlement | Finance closes on a different cadence or has separate compliance ownership | Strong consistency and audit boundary |
| Payments | PSP/PCI scope requires a separate deployable | Security and vendor isolation |
| Content | Editorial publishing needs an independent release train | Low coupling to transactions |

Extraction requires a new ADR. The extraction order must preserve the
contracts listed above; a move is a deployment change, not a domain rewrite.

## Consequences

- One deployable keeps operational complexity low while the product and team
  are still stabilizing.
- The schema and contract boundaries make a later extraction mechanical rather
  than a rewrite.
- A monolith failure domain remains. Gate 8 mitigates it with health probes,
  rate limiting, SLOs, and a tested logical restore path.

## Evidence

- `docs/adr/0003-three-api-models.md`
- `docs/adr/0009-postgres-schema-per-module.md`
- `docs/adr/0015-architecture-governance.md`
- `tests/Hani.ArchitectureTests`
