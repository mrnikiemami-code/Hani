# ADR-0035: Unified Admin Message System

- Status: Accepted
- Date: 2026-11-17
- Gate: 9.1 / admin UX

## Context

Admin screens had a mix of inline alerts, browser `window.confirm` dialogs,
and route-local status flags. Feedback was inconsistent, destructive actions
could not be styled, and success/error messages disappeared with navigation.
The content and media editors also need the same confirmation semantics.

## Decision

1. A single client `MessageProvider` owns all admin feedback.
2. It exposes three operations: `toast`, `confirm`, and `alert`.
3. Toasts support `success`, `warning`, `question`, and `error`, an optional
   duration, a visible remaining-time label, and auto-dismiss.
4. Destructive actions use the modal `confirm` operation; it returns a Promise
   and supports keyboard Escape and backdrop cancellation.
5. Modal alerts use the same visual system and are used for blocking messages.
6. The provider lives in the locale layout so messages survive client-side
   navigation between admin pages.
7. Admin components must not use `window.confirm`, raw `alert/confirm`, or
   page-local alert blocks for user feedback.
8. The provider is UI infrastructure; domain/application code still returns
   typed results/errors and never knows about toast or modal state.

## Consequences

- Success, warning, question, and error feedback is consistent across admin.
- Delete and bulk-delete confirmations are accessible and styled.
- Toast durations are explicit and visible to the admin.
- New admin features must consume `useMessageBox` rather than inventing another
  message pattern.
