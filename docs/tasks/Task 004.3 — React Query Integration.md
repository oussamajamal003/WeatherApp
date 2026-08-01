# Task 004.3 — React Query Integration

## Feature

Integrate TanStack React Query into the WeatherApp using the Weather Service Layer implemented in Task 004.2.

---

## Branch

feature/react-query-integration

---

## Target

develop

---

# Objective

Implement the complete React Query integration layer.

This task is responsible for:

- Query Hooks
- Query Keys
- Cache Management
- Retry Strategy
- Stale Time
- Refetch Policies
- Loading States
- Error States
- Background Refresh
- QueryClient Configuration

No UI redesign.

No API implementation.

No business logic.

---

# Dependencies

Requires:

- ✅ Task 004.1 — API Foundation
- ✅ Task 004.2 — Weather Service Layer

Reuse:

- Axios Client
- Weather Services
- Geocoding Services
- Air Quality Service
- Error Handling
- Validation

Do not duplicate service logic.

---

# Scope

Implement ONLY the React Query layer.

## Query Client

Configure:

- QueryClient
- QueryClientProvider
- Default Options
- Global Error Handling

---

## Query Keys

Create centralized query keys.

Example:

```text
src/api/query-keys.ts
```

Example:

```ts
export const QUERY_KEYS = {
  weather: (city: string) => ["weather", city],
  forecast: (city: string) => ["forecast", city],
  geocode: (query: string) => ["geocode", query],
  reverseGeocode: (lat: number, lon: number) => ["reverse-geocode", lat, lon],
  airQuality: (lat: number, lon: number) => ["aqi", lat, lon],
} as const;
```

Never hardcode query keys.

---

## Hooks

Implement:

- useCurrentWeather()
- useForecast()
- useDirectGeocoding()
- useReverseGeocoding()
- useAirQuality()

Each hook must:

- Use the existing service layer.
- Return typed data.
- Expose loading state.
- Expose error state.
- Expose refetch.
- Expose status.

---

## Cache Strategy

Configure:

- staleTime
- gcTime (cacheTime if applicable)
- retry
- retryDelay
- refetchOnWindowFocus
- refetchOnReconnect
- refetchOnMount

Choose sensible defaults and document them.

---

## Forecast Optimization

Implement memoization for forecast aggregation.

The aggregation logic created in Task 004.2 should execute only when new forecast data is received.

Do not recompute identical forecast data on every component render.

Prefer React Query's `select` option or an equivalent memoized transformation rather than duplicating aggregation logic.

---

## Loading States

Support:

- Initial Loading
- Background Fetching
- Refetching

---

## Error Handling

Integrate with the custom API error hierarchy.

Never expose Axios errors.

---

## Folder Structure

Recommended:

```text
src/

api/
    hooks/
        use-current-weather.ts
        use-forecast.ts
        use-geocoding.ts
        use-air-quality.ts

    query-client.ts
    query-keys.ts
```

---

# Out of Scope

Do NOT implement:

- UI redesign
- Weather Pages
- Favorites
- Settings
- Offline Mode
- Mutations
- Authentication
- Business Logic

Only integrate React Query.

---

# Acceptance Criteria

The task is complete only when:

- QueryClient is configured.
- QueryClientProvider is integrated.
- Query keys are centralized.
- Hooks are implemented.
- Caching is configured.
- Retry strategy is configured.
- Refetch policies are configured.
- Forecast aggregation is optimized through React Query.
- Services remain unchanged.
- No duplicated networking logic exists.

---

# Validation

Verify:

- Query caching
- Background refetch
- Retry behavior
- Cache invalidation
- Loading states
- Error states
- Type safety

Run:

npm run lint

npm run typecheck

npm test

npm run build

Every command must succeed.

---

# Deliverables

Provide:

1. Feature Summary
2. Architecture Decisions
3. Files Created
4. Files Modified
5. Query Hooks Implemented
6. Query Keys Added
7. Cache Configuration
8. Retry Strategy
9. Forecast Optimization
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

Do NOT modify the Weather Service Layer.

Do NOT duplicate API calls.

Do NOT introduce business logic.

Use the existing service layer exclusively.

The implementation is complete only when:

- Every acceptance criterion is satisfied.
- All validation commands pass.
- Forecast aggregation is optimized using React Query.
- The implementation is ready for architectural review.