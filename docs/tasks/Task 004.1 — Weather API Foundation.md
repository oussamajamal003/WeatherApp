# Task 004.1 — Weather API Foundation

## Feature

Build the production-ready Weather API foundation for the WeatherApp.

---

## Branch

feature/api-foundation

---

## Target

develop

---

# Objective

Establish the API infrastructure that all weather services will use.

This task creates the networking foundation only.

No UI redesign.

No page implementation.

No business logic.

No React Query.

No weather feature integration.

---

# Dependencies

Requires:

- ✅ Task 003.1 — Theme Foundation
- ✅ Task 003.2 — Layout System
- ✅ Task 003.3 — Foundation Components
- ✅ Task 003.4 — Weather Components
- ✅ Task 003.5 — Application Pages

---

# Scope

Implement ONLY the API foundation.

## API Client

Create:

- Axios instance
- Base configuration
- Timeout configuration
- Default headers
- Request interceptor
- Response interceptor

Use a single reusable client.

---

## Environment Variables

Configure:

```text
VITE_OPENWEATHER_API_KEY=
VITE_OPENWEATHER_BASE_URL=
VITE_OPENWEATHER_GEO_URL=
```

Create:

```
.env.example
```

Validate missing environment variables.

Fail gracefully.

Never hardcode secrets.

---

## Configuration

Create a centralized configuration layer.

Example:

```
src/config/
```

Store:

- API URLs
- Timeouts
- Request limits
- Feature flags (if needed)

---

## API Types

Create reusable TypeScript types.

Examples:

- Coordinates
- Units
- Language
- WeatherRequest
- ForecastRequest
- APIError
- APIResponse

No `any`.

Use strict typing.

---

## Validation

Validate:

- Coordinates
- City names
- API parameters
- Units
- Language

Reject invalid requests before sending them.

---

## Error Handling

Create centralized API errors.

Support:

- Network Error
- Timeout
- Invalid API Key
- Unauthorized
- Forbidden
- Not Found
- Rate Limit
- Server Error
- Unknown Error

Return typed errors.

Never expose raw Axios errors to UI components.

---

## Utilities

Create reusable helpers.

Examples:

- URL builder
- Query builder
- Error mapper
- Response parser

---

# Folder Structure

Recommended:

```
src/

api/
    client.ts
    config.ts
    interceptors.ts
    errors.ts
    validators.ts

config/
    env.ts

types/
    api.ts
    weather.ts

utils/
    api.ts
```

Reuse existing folders if they already exist.

Do not duplicate responsibilities.

---

# Out of Scope

Do NOT implement:

- Current Weather endpoint
- Forecast endpoint
- Geocoding endpoint
- React Query
- Search
- Favorites
- Settings
- Geolocation
- UI changes
- Weather Cards
- Business logic

Only create the reusable API foundation.

---

# Security Requirements

- Never expose API keys.
- Never commit `.env`.
- Commit `.env.example`.
- Read secrets only from `import.meta.env`.
- Validate configuration during application startup.
- Fail gracefully if configuration is invalid.

---

# Code Quality

Always:

- Follow existing architecture.
- Follow Coding Standards.
- Keep modules small.
- Keep functions focused.
- Use dependency inversion where appropriate.
- Avoid duplicated code.
- Use strict TypeScript.

---

# Acceptance Criteria

The task is complete only when:

- Axios client exists.
- Environment configuration exists.
- API configuration exists.
- API types exist.
- Validation layer exists.
- Error handling layer exists.
- Interceptors exist.
- Utilities exist.
- No API calls have been implemented.
- No UI changes have been introduced.

---

# Validation

Verify:

- Environment variables load correctly.
- Missing variables produce meaningful errors.
- Axios client initializes successfully.
- Interceptors execute correctly.
- Validators reject invalid input.
- Error mapping works correctly.
- TypeScript has zero errors.

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Every command must succeed.

---

# Deliverables

Provide:

1. Feature Summary
2. Architecture Decisions
3. Files Created
4. Files Modified
5. API Foundation Components Implemented
6. Environment Variables Added
7. Types Implemented
8. Validation Layer Implemented
9. Error Handling Implemented
10. Documentation Updated
11. Validation Results
12. Build Status
13. Remaining Risks
14. Suggested Conventional Commit
15. Suggested Pull Request Title
16. Suggested Pull Request Description

---

# Completion Rules

Do NOT implement weather endpoints.

Do NOT implement React Query.

Do NOT implement UI integration.

Do NOT implement business logic.

The implementation is complete only when:

- Every acceptance criterion is satisfied.
- All validation commands pass.
- The API foundation is reusable.
- The implementation is ready for architectural review.