# Task 004.6 — Favorites

## Feature

Implement the complete Favorites system for WeatherApp.

---

## Branch

feature/favorites

---

## Target

develop

---

# Objective

Implement a production-ready Favorites feature allowing users to save, manage, and quickly access favorite locations.

The feature should integrate with the existing Weather Service Layer, React Query, and Geolocation system.

No API changes.

No UI redesign.

Reuse the existing architecture.

---

# Dependencies

Requires:

- ✅ Task 004.2 — Weather Service Layer
- ✅ Task 004.3 — React Query Integration
- ✅ Task 004.4 — Search
- ✅ Task 004.5 — Geolocation

---

# Scope

Implement ONLY the Favorites feature.

---

## Favorites Management

Support:

- Add favorite location.
- Remove favorite location.
- Toggle favorite status.
- Prevent duplicate favorites.
- Display favorite locations.
- Persist favorites locally.
- Maintain ordering.

---

## Persistence

Implement a dedicated Favorites service.

Recommended:

```text
src/
└── services/
    └── favorites.service.ts
```

Responsibilities:

- Save favorites.
- Load favorites.
- Remove favorites.
- Update favorites.
- Validate stored data.
- Prevent duplicates.
- Handle corrupted storage gracefully.

Do not access `localStorage` directly from React components.

---

## React Hooks

Implement:

- useFavorites()
- useFavorite()
- useToggleFavorite()

Reuse React Query where appropriate.

---

## Favorite Weather

Each favorite should display:

- City
- Country
- Current temperature
- Weather condition
- Weather icon
- Last updated timestamp

Reuse the Weather Service Layer.

---

## Automatic Weather Updates

Implement background refresh for favorite locations.

Requirements:

- Reuse React Query.
- Avoid duplicate API requests.
- Respect OpenWeather rate limits.
- Refresh only active favorites.

Do not poll aggressively.

---

## Startup Behavior

On application startup:

If geolocation succeeds:

- Display the current location.

Otherwise:

If favorites exist:

- Automatically display the first favorite.

Otherwise:

- Fall back to the Search experience.

The application should always have a meaningful initial state.

---

## Favorite Ordering

Support:

- Most recently added.
- Manual reordering (optional if supported by the design).
- Stable ordering after reload.

---

## Duplicate Prevention

Two favorites representing the same location must not be stored twice.

Use a stable identifier.

Prefer:

- OpenWeather City ID

or

- Latitude + Longitude

Avoid comparing only city names.

---

## React Query Integration

Reuse existing query hooks.

Never duplicate weather requests.

Favorites should consume the same cached weather data used elsewhere in the application.

---

## Performance

Optimize:

- Background refresh.
- Query reuse.
- Cache reuse.
- Memoization.
- Rendering.

Avoid unnecessary API calls.

---

## Accessibility

Ensure:

- Keyboard operability.
- Accessible favorite controls.
- Screen reader labels.
- Proper focus management.

---

## Folder Structure

Recommended:

```text
src/

features/
    favorites/

services/
    favorites.service.ts

hooks/
    use-favorites.ts
```

Reuse existing folders where appropriate.

---

# Out of Scope

Do NOT implement:

- Cloud synchronization.
- User accounts.
- Authentication.
- Shared favorites.
- Maps.
- Offline synchronization.

Only implement local favorites.

---

# Acceptance Criteria

The task is complete only when:

- Favorites can be added.
- Favorites can be removed.
- Favorites persist locally.
- Duplicate favorites are prevented.
- Favorite weather is displayed.
- Automatic weather updates work.
- Startup behavior follows the defined priority.
- Search integrates with Favorites.
- React Query is reused.
- No duplicated networking logic exists.

---

# Validation

Verify:

- Add favorite.
- Remove favorite.
- Duplicate prevention.
- Persistence after refresh.
- Automatic updates.
- Startup behavior.
- Search integration.
- Geolocation integration.
- Accessibility.

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
5. Favorites Service
6. React Hooks
7. Local Storage Implementation
8. Automatic Weather Updates
9. Startup Behavior
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

Do NOT access localStorage directly from components.

Do NOT duplicate API requests.

Do NOT bypass React Query.

Reuse the existing architecture.

The implementation is complete only when:

- Every acceptance criterion is satisfied.
- All validation commands pass.
- Favorites are production-ready.
- The implementation is ready for architectural review.