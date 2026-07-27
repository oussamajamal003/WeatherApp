# Folder Structure

## Purpose

This document defines the official directory structure for WeatherApp.

Every file and folder should have a single responsibility. New features must follow this structure to keep the project consistent, scalable, and easy to maintain.

---

# Root Structure

```
WeatherApp/
│
├── .github/
├── docs/
├── public/
├── src/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# src/

The `src` directory contains all application source code.

```
src/
│
├── api/
├── assets/
├── components/
├── constants/
├── context/
├── features/
├── hooks/
├── layouts/
├── pages/
├── services/
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

# Folder Responsibilities

## api/

Contains API configuration.

Examples:

- Axios instance
- API interceptors
- Base URL configuration

**Do not place business logic here.**

---

## assets/

Static application assets.

Examples:

- Images
- Icons
- Fonts
- Illustrations

---

## components/

Reusable UI components shared across the application.

Example:

```
components/

common/
layout/
weather/
```

Examples:

- Button
- Card
- Modal
- Navbar
- WeatherCard
- SearchBar

Components should be reusable and independent.

---

## constants/

Application-wide constants.

Examples:

- Routes
- Theme values
- API endpoints
- Default settings

Avoid hardcoded values throughout the project.

---

## context/

React Context providers.

Examples:

- ThemeContext
- SettingsContext

Only use Context for global UI or application state.

---

## features/

Feature-based modules.

Example:

```
features/

search/
forecast/
favorites/
settings/
```

Each feature owns its:

- Components
- Hooks
- Types
- Utilities (if feature-specific)

---

## hooks/

Reusable custom hooks.

Examples:

```
useTheme()

useWeather()

useDebounce()

useGeolocation()
```

Hooks should not contain UI.

---

## layouts/

Application layouts.

Examples:

- MainLayout
- DashboardLayout

Layouts define page structure.

---

## pages/

Route-level components.

Examples:

- HomePage
- SearchPage
- SettingsPage
- FavoritesPage

Pages should compose features rather than implement business logic.

---

## services/

Business services.

Examples:

```
weather.service.ts
location.service.ts
```

Responsibilities:

- Fetch data
- Transform API responses
- Handle request errors

Components should never call external APIs directly.

---

## styles/

Global styling.

Examples:

- globals.css
- Tailwind customizations

Avoid component-specific styles here.

---

## types/

Shared TypeScript types and interfaces.

Examples:

```
Weather.ts
Forecast.ts
Location.ts
```

Store reusable types only.

---

## utils/

Pure utility functions.

Examples:

```
formatDate()

formatTemperature()

getWeatherIcon()

convertWindSpeed()
```

Utilities should have no side effects.

---

# tests/

Contains test utilities and integration tests.

Examples:

```
tests/

setup.ts
mocks/
integration/
```

Component unit tests may also live alongside the component when appropriate.

---

# public/

Static files served directly.

Examples:

- favicon
- manifest
- robots.txt

Do not place application logic here.

---

# docs/

Project documentation.

Examples:

- Architecture
- Workflow
- Coding Standards
- Roadmap

Documentation should stay synchronized with the project.

---

# Naming Conventions

Folders

- lowercase
- kebab-case

Examples:

```
weather-card
search-results
```

Files

Components

```
WeatherCard.tsx
SearchBar.tsx
```

Hooks

```
useWeather.ts

useTheme.ts
```

Services

```
weather.service.ts
```

Types

```
Weather.ts

Forecast.ts
```

Utilities

```
formatDate.ts

convertTemperature.ts
```

---

# Organization Rules

✅ Group code by feature.

✅ Reuse existing components before creating new ones.

✅ Keep files focused on a single responsibility.

✅ Share common logic through hooks, services, or utilities.

❌ Do not create deeply nested folders.

❌ Do not duplicate components.

❌ Do not mix business logic with presentation.

❌ Do not place unrelated files together.

---

# Adding a New Feature

Every new feature should follow this pattern:

```
features/

new-feature/

components/

hooks/

types/

utils/
```

If the feature grows significantly, it should remain self-contained within its own directory.

---

# Folder Structure Checklist

Before merging, verify:

- Folder placement is correct.
- Naming conventions are followed.
- No duplicate components.
- No business logic inside UI components.
- Shared code is extracted appropriately.
- New folders follow existing architecture.
- Documentation is updated if the structure changes.