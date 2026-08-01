# Task 004.2 — Weather Service Layer

## Feature

Implement the production-ready Weather Service Layer using the API Foundation created in Task 004.1.

---

## Branch

feature/weather-services

---

## Target

develop

---

# Objective

Implement the complete OpenWeather service layer.

This task is responsible for communicating with the OpenWeather APIs.

The service layer must be reusable, fully typed, testable, and independent of React.

No UI changes.

No React Query.

No business logic.

---

# Dependencies

Requires:

- ✅ Task 004.1 — API Foundation

Reuse:

- Axios client
- Configuration layer
- Environment validation
- Error handling
- Validators
- API types

Do not duplicate existing infrastructure.

---

# Scope

Implement ONLY the Weather Service Layer.

Required services:

## Weather

- Current Weather
- 5-Day Forecast

## Geocoding

- Direct Geocoding
- Reverse Geocoding

## Air Quality

- Air Pollution (AQI)

## UV

Implement the approved UV solution.

If the selected OpenWeather API version does not expose a dedicated UV endpoint, derive UV support using the official supported endpoint or documented replacement.

Do not invent unsupported endpoints.

---

# Endpoints

Implement support for:

```text
GET /weather

GET /forecast

GET /geo/1.0/direct

GET /geo/1.0/reverse

GET /air_pollution
```

Use only officially supported OpenWeather endpoints.

---

# Service Architecture

Recommended structure:

```text
src/

api/
    client.ts
    weather.service.ts
    geocoding.service.ts
    air-quality.service.ts
```

Reuse existing folders if they already exist.

Every service should have a single responsibility.

---

# Requirements

Every service must:

- Reuse the shared Axios client.
- Reuse request interceptors.
- Reuse response interceptors.
- Use centralized error handling.
- Use centralized validators.
- Return fully typed responses.
- Never expose Axios directly.
- Never expose raw API responses if transformation is required.

---

# Request Validation

Validate before sending requests:

- Latitude
- Longitude
- City name
- Country code
- Units
- Language
- Limits

Reject invalid requests before they reach the API.

---

# Error Handling

Use only the custom API error hierarchy created in Task 004.1.

Never throw AxiosError.

Never expose implementation details.

Every service must return meaningful typed errors.

---

# Response Models

Create reusable response models where required.

Examples:

- CurrentWeatherResponse
- ForecastResponse
- AQIResponse
- DirectGeocodingResponse
- ReverseGeocodingResponse

Do not use `any`.

Use strict TypeScript.

---

# Out of Scope

Do NOT implement:

- React Query
- Custom React Hooks
- UI changes
- Search functionality
- Favorites
- Settings
- Geolocation
- Caching
- Local storage
- Business logic

Only implement reusable services.

---

# Testing Requirements

Add or update tests covering:

- Successful requests
- Invalid requests
- Validation failures
- Network errors
- Timeout errors
- API error mapping

Mock external HTTP requests.

Do not depend on the live OpenWeather API during automated tests.

---

# Acceptance Criteria

The task is complete only when:

- Weather Service is implemented.
- Forecast Service is implemented.
- Direct Geocoding is implemented.
- Reverse Geocoding is implemented.
- Air Quality Service is implemented.
- UV solution is implemented according to the selected API.
- All responses are fully typed.
- Validation is centralized.
- Error handling is centralized.
- No React code exists.
- No React Query code exists.
- No duplicated networking logic exists.

---

# Validation

Verify:

- Current Weather
- Forecast
- Direct Geocoding
- Reverse Geocoding
- Air Pollution
- Error handling
- Validation
- Type safety

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
5. Services Implemented
6. Endpoints Implemented
7. Response Models Added
8. Validation Added
9. Error Handling Verified
10. Tests Added or Updated
11. Documentation Updated
12. Validation Results
13. Build Status
14. Remaining Risks
15. Suggested Conventional Commit
16. Suggested Pull Request Title
17. Suggested Pull Request Description

---

# Completion Rules

Do NOT implement React Query.

Do NOT implement UI integration.

Do NOT implement business logic.

Do NOT implement caching.

The implementation is complete only when:

- Every acceptance criterion is satisfied.
- All validation commands pass.
- Every service is reusable.
- Every response is fully typed.
- The implementation is ready for architectural review.