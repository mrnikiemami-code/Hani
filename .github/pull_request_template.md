## What changed

<!-- One or two sentences. Link the task (TC-xxx). -->

## Module / boundary

- [ ] Change is contained in one module (or explicitly listed)
- [ ] No new module-to-module reference
- [ ] No new package without license review

## Architecture checklist

- [ ] `scripts/verify.ps1` is green
- [ ] Command/Query has Handler + Validator
- [ ] Handlers are `internal sealed`
- [ ] Endpoint is thin (only `ISender`)
- [ ] No `DbContext` in Application/Presentation
- [ ] No banned APIs (`DateTime.Now`, `Guid.NewGuid`, `HttpClient`, `Console`)
- [ ] Migration added if the model changed
- [ ] OpenAPI/event contract updated if the contract changed
- [ ] Idempotency added for financial POST
- [ ] Logs are English with `ErrorCode`; user messages localized
- [ ] Docs/ADR updated if architecture changed

## Tests

<!-- What did you test and how? -->

## Risk / rollback

<!-- Any migration, breaking change, or feature flag? -->
