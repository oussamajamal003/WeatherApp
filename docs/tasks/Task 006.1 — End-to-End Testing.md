# Task 006.1 — End-to-End Testing

## Feature

Implement a comprehensive Playwright End-to-End (E2E) test suite covering the application's critical user journeys.

---

## Branch

feature/e2e-testing

---

## Target

develop

---

# Objective

Validate the WeatherApp from the user's perspective by automating the most important workflows.

The E2E suite should verify that the application behaves correctly across supported browsers and viewport sizes.

This task is focused on **behavior verification**, not unit or integration testing.

---

# Scope

Implement:

- Playwright test suite
- Critical user journeys
- Cross-browser execution
- Mobile viewport testing
- Accessibility smoke tests
- CI integration

---

# Test Structure

Recommended:

```text
tests/
├── e2e/
│   ├── search.spec.ts
│   ├── favorites.spec.ts
│   ├── settings.spec.ts
│   ├── geolocation.spec.ts
│   ├── offline.spec.ts
│   ├── localization.spec.ts
│   ├── theme.spec.ts
│   ├── navigation.spec.ts
│   ├── responsive.spec.ts
│   └── accessibility.spec.ts
```

---

# Required User Journeys

## Search

Verify:

- Search page loads.
- Typing displays suggestions.
- Debounce functions correctly.
- Selecting a suggestion loads weather.
- Keyboard navigation (↑ ↓ Enter Esc).
- Empty search results.
- Invalid city handling.

---

## Favorites

Verify:

- Add city to Favorites.
- Remove city from Favorites.
- Favorite persists after refresh.
- Favorite persists after reopening.
- Favorite timestamp is displayed correctly.
- Duplicate favorites are prevented.

---

## Theme

Verify:

- Light Theme.
- Dark Theme.
- System Theme.
- Theme persistence.
- Theme updates without refresh.

---

## Language

Verify:

- English.
- Arabic.
- RTL layout.
- Weather descriptions are localized.
- UI translations update correctly.
- Language persists after refresh.

---

## Geolocation

Verify:

- Permission granted.
- Permission denied.
- Position unavailable.
- Retry.
- Manual search fallback.

---

## Offline Mode

Verify:

- Offline banner appears.
- Cached weather remains visible.
- Retry works after reconnect.
- No application crash.

---

## Settings

Verify:

- Temperature unit.
- Wind speed unit.
- Pressure unit.
- Theme.
- Language.

Confirm persistence after refresh.

---

## Navigation

Verify:

- Home.
- Search.
- Favorites.
- Settings.
- About.

Back/Forward browser navigation should behave correctly.

---

## Responsive Layout

Verify:

Desktop

Tablet

Mobile

Confirm:

- No horizontal scrolling.
- Header layout.
- Card layout.
- Search input.
- Navigation.
- Dialogs.

---

## Accessibility Smoke Tests

Verify:

- Keyboard navigation.
- Focus indicators.
- Buttons accessible.
- Search accessible.
- Dialog accessibility.
- No focus traps.

---

# Cross-Browser

Run E2E suite against:

- Chromium
- Firefox
- WebKit

All tests must pass.

---

# CI

Update GitHub Actions.

E2E tests should run automatically on:

- Pull Requests
- develop
- main

The pipeline should fail if any E2E test fails.

---

# Validation

Run:

```bash
npm run test:e2e
```

Run all browsers:

```bash
npx playwright test
```

Verify:

- All tests pass.
- No flaky tests.
- No skipped critical tests.

---

# Deliverables

Provide:

1. Test Summary
2. Test Coverage
3. Browser Matrix
4. Responsive Matrix
5. Accessibility Results
6. CI Integration
7. Files Added
8. Files Modified
9. Remaining Risks
10. Suggested Conventional Commit
11. Suggested PR Title
12. Suggested PR Description

---

# Completion Rules

The implementation is complete only when:

- Every critical user journey has an automated E2E test.
- Chromium, Firefox, and WebKit pass.
- CI executes the Playwright suite.
- No flaky tests remain.
- The suite is ready for production release.