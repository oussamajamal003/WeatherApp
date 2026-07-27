# Testing

## Goal

Ensure every feature works correctly and prevents regressions.

---

## Testing Stack

- Vitest
- React Testing Library
- Playwright (future)

---

## Test Types

### Unit Tests

Test:

- Components
- Hooks
- Utilities

---

### Integration Tests

Test:

- API integration
- Feature workflows
- User interactions

---

### E2E Tests (Future)

Test complete user flows.

---

## Rules

- Test critical features.
- Mock external APIs.
- Keep tests independent.
- Tests should be deterministic.
- Fix failing tests before merging.

---

## What to Test

- Rendering
- User interactions
- Loading state
- Error state
- Empty state
- API responses
- Theme switching
- Search functionality

---

## Before Merge

```bash
npm test
```

All tests must pass.