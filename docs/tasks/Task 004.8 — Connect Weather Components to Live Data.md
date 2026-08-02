# Task 004.8 — Connect Weather Components to Live Data

## Feature

Replace all mock data with live weather data from the existing Weather Service Layer.

---

## Branch

feature/connect-live-data

---

## Target

develop

---

# Objective

The Weather Service Layer and React Query integration are complete.

This task connects the existing UI to the real OpenWeather API.

No new endpoints.

No mock props.

No duplicate business logic.

Reuse the existing architecture.

---

# Dependencies

Requires:

- ✅ Task 004.2 — Weather Service Layer
- ✅ Task 004.3 — React Query Integration
- ✅ Task 004.4 — Search
- ✅ Task 004.5 — Geolocation
- ✅ Task 004.6 — Favorites
- ✅ Task 004.7 — Error Handling & Offline Support

---

# Scope

Replace every mock prop with real data.

Connect all existing weather components.

---

## Components

Connect:

- WeatherCard
- ForecastCard
- Temperature
- Feels Like
- Wind
- Humidity
- Pressure
- Visibility
- AQI
- UV
- Sunrise
- Sunset
- Weather Icon
- Weather Description
- Today's Forecast
- 5-Day Forecast

Every displayed value must originate from the Weather Service Layer.

---

## React Query

Consume only the existing hooks.

Do NOT call Axios directly.

Do NOT call services directly from components.

Reuse:

- Current Weather Query
- Forecast Query
- AQI Query
- UV Query
- Geocoding Query

---

## Loading States

Every component must display its loading state independently when appropriate.

Skeletons should remain visible until the required data is available.

---

## Error States

Every component must gracefully handle:

- API errors
- Offline mode
- Missing data

Reuse the existing ErrorState components.

---

## Empty States

If optional data is unavailable:

Examples:

- UV unavailable
- AQI unavailable

Display an appropriate placeholder.

Never crash.

---

## Active Location

All weather components must consume the shared Active Location.

Do not independently determine which city to display.

Changing the Active Location should automatically refresh all weather components.

---

## Automatic Updates

Changing:

- Search result
- Favorite
- Geolocation

must automatically refresh every weather component.

Do not require:

- Manual refresh
- Navigation refresh
- Page reload

---

## Data Formatting

Centralize formatting.

Create reusable formatters for:

- Temperature
- Wind Speed
- Visibility
- Pressure
- Time
- Date
- Sunrise/Sunset
- AQI labels
- UV labels

Do not duplicate formatting logic across components.

---

## Performance

Reuse React Query cache.

Avoid:

- Duplicate requests
- Duplicate transformations
- Duplicate formatters

Memoize expensive computations where appropriate.

---

## Accessibility

Verify:

- Loading announcements
- Error announcements
- Dynamic weather updates
- Keyboard navigation
- Screen reader compatibility

---

## Folder Structure

Recommended:

```text
src/

formatters/
    weather.ts

hooks/

components/

features/
```

Reuse the existing architecture.

---

# Out of Scope

Do NOT:

- Add new API endpoints.
- Redesign components.
- Introduce mock data.
- Duplicate weather logic.

---

# Acceptance Criteria

The task is complete only when:

- Every weather component uses live API data.
- No mock props remain.
- All weather values are correctly formatted.
- Active Location drives every weather component.
- Search updates all weather components.
- Favorites update all weather components.
- Geolocation updates all weather components.
- Loading states work.
- Error states work.
- Offline support works.
- React Query cache is reused.
- No duplicated API requests exist.

---

# Validation

Verify:

- Search for a city.
- Select a Favorite.
- Use My Location.
- Switch Active Location.
- Offline mode.
- Loading states.
- Error states.
- Empty states.
- Refresh page.
- Cached weather.
- Responsive layouts.

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
5. Components Connected
6. React Query Hooks Used
7. Formatting Utilities Added
8. Tests Added or Updated
9. Documentation Updated
10. Validation Results
11. Build Status
12. Remaining Risks
13. Suggested Conventional Commit
14. Suggested Pull Request Title
15. Suggested Pull Request Description

---

# Completion Rules

Do NOT use mock data.

Do NOT duplicate business logic.

Do NOT call APIs directly from components.

Reuse the existing Weather Service Layer and React Query hooks.

The implementation is complete only when:

- Every weather component displays live data.
- All validation commands pass.
- No mock props remain.
- The implementation is ready for architectural review.