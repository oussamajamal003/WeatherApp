# Architecture

## Purpose

This document defines the architectural principles, project structure, and development rules for WeatherApp.

The architecture should remain modular, scalable, and maintainable throughout the project's lifecycle.

---

# Architecture Overview

WeatherApp follows a **Feature-Based + Layered Architecture**.

```
UI
│
├── Pages
├── Components
│
Hooks
│
Services
│
API
│
External Weather API
```

Business logic must be separated from UI components.

---

# Core Principles

- Separation of concerns
- Single Responsibility Principle
- Reusable components
- Feature-first organization
- Type safety
- Predictable state management
- Centralized API communication

---

# Folder Structure

```
src/
│
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── weather/
│   └── layout/
│
├── features/
│   ├── search/
│   ├── forecast/
│   ├── favorites/
│   └── settings/
│
├── hooks/
├── layouts/
├── pages/
├── services/
├── types/
├── utils/
├── context/
├── constants/
└── styles/
```

Each folder has a single responsibility.

---

# Layer Responsibilities

## Pages

- Route-level components
- Compose features
- Minimal logic

---

## Components

Reusable UI elements.

Examples:

- Button
- Card
- SearchBar
- WeatherCard
- ForecastCard

Components should never fetch data directly.

---

## Features

Contain business logic for a specific feature.

Example:

```
features/search/

SearchBar.tsx

SearchResults.tsx

useSearch.ts

search.types.ts
```

---

## Hooks

Shared reusable logic.

Examples:

- useWeather()
- useTheme()
- useDebounce()
- useGeolocation()

---

## Services

Handle communication with external APIs.

Example:

```
services/

weather.service.ts
```

Services should not contain UI code.

---

## API

Contains Axios configuration.

Example:

```
api/

axios.ts
```

Only one Axios instance should exist.

---

## Types

Shared TypeScript interfaces and types.

---

## Utils

Pure helper functions.

Examples:

- formatDate()
- convertTemperature()
- formatWindSpeed()

---

# Data Flow

```
Page

↓

Feature

↓

Hook

↓

Service

↓

API

↓

Weather Provider
```

Data should always flow downward.

Avoid deeply nested prop drilling; use Context only when appropriate.

---

# State Management

Use the right tool for the job.

| State | Solution |
|--------|----------|
| Server Data | React Query |
| Theme | Context |
| User Preferences | Local Storage |
| Component State | useState |
| Derived State | useMemo |

Avoid storing server data in Context.

---

# Dependency Rules

Allowed:

```
Pages

↓

Features

↓

Components

↓

Hooks

↓

Services

↓

API
```

Not allowed:

- Components importing Pages
- Services importing Components
- API importing UI
- Circular dependencies

---

# Scalability Guidelines

When adding a new feature:

- Create a dedicated feature folder.
- Reuse existing components when possible.
- Keep business logic in hooks or services.
- Update documentation if the architecture changes.

---

# Architecture Checklist

Before merging, verify:

- Feature follows folder structure.
- Components are reusable.
- No duplicated logic.
- Business logic is separated from UI.
- API calls use the service layer.
- TypeScript types are shared.
- No circular dependencies.
- Documentation updated if required.