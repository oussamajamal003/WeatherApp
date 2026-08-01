# Task 004.4 — Search Experience

## Feature

Implement the complete Weather Search experience using the existing Weather Service Layer and React Query integration.

---

## Branch

feature/search

---

## Target

develop

---

# Objective

Implement the application's search functionality.

This task is responsible for:

- Search page functionality
- Search input
- Debounced searching
- City suggestions
- Search results
- Recent searches
- Keyboard navigation
- Search history persistence

Reuse all existing UI components.

No redesign.

---

# Dependencies

Requires:

- ✅ Task 003.3 — Foundation Components
- ✅ Task 003.4 — Weather Components
- ✅ Task 003.5 — Application Pages
- ✅ Task 004.2 — Weather Service Layer
- ✅ Task 004.3 — React Query Integration

---

# Scope

Implement ONLY the Search feature.

---

## Search Page

Complete the existing Search page.

Reuse:

- SearchBar
- Search Results
- Existing Layout System

---

## Search Input

Implement:

- Controlled input
- Clear button
- Loading indicator
- Empty state
- Error state

---

## Debounce

Implement debounced search.

Requirements:

- 300–500 ms debounce
- Cancel previous pending requests
- Avoid unnecessary API calls
- Prevent duplicate searches

---

## Suggestions

Use Direct Geocoding.

Display:

- City
- State / Region (when available)
- Country

Limit:

- Maximum 5 suggestions

Hide suggestions when:

- Input is empty
- Input is below the minimum search length

---

## Search History

Persist recent searches.

Store locally.

Requirements:

- Maximum 10 recent searches
- Remove duplicates
- Most recent first
- Allow individual removal
- Allow clearing all history

Use a dedicated storage abstraction.

Do not access localStorage directly from UI components.

---

## Keyboard Navigation

Support:

- Arrow Up
- Arrow Down
- Enter
- Escape
- Tab

Selection should be fully accessible.

---

## React Query

Reuse existing hooks.

Do not call services directly from components.

Use query invalidation only where appropriate.

---

## Performance

Optimize:

- Debouncing
- Request cancellation
- Query caching
- Memoization
- Component rendering

Avoid unnecessary API requests.

---

## Accessibility

Ensure:

- Keyboard navigation
- Screen reader support
- Proper ARIA attributes
- Focus management
- Accessible suggestion list

---

# Folder Structure

Recommended:

```text
src/

features/
    search/

        components/
        hooks/
        utils/
        types/

        SearchPage.tsx
```

Reuse existing folders where appropriate.

---

# Out of Scope

Do NOT implement:

- Favorites
- Geolocation
- Weather API integration beyond search
- Settings
- Offline mode
- Voice search

---

# Acceptance Criteria

The task is complete only when:

- Search page is functional.
- Debounce works correctly.
- Suggestions are displayed.
- Direct Geocoding is integrated.
- Recent searches persist locally.
- Keyboard navigation works.
- Search history management works.
- React Query hooks are reused.
- No duplicated networking logic exists.
- Accessibility requirements are satisfied.

---

# Validation

Verify:

- Debounced requests
- Query cancellation
- Suggestion accuracy
- Keyboard navigation
- Search history persistence
- Loading states
- Empty states
- Error states
- Accessibility

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
5. Search Components Added
6. Search Hooks Added
7. Search History Implementation
8. React Query Integration
9. Accessibility Improvements
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

Do NOT redesign the UI.

Do NOT duplicate API calls.

Do NOT bypass React Query.

Do NOT access localStorage directly from components.

Reuse the existing architecture.

The implementation is complete only when:

- Every acceptance criterion is satisfied.
- All validation commands pass.
- The Search experience is production-ready.
- The implementation is ready for architectural review.