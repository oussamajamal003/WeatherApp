# Coding Standards

## General

- Use TypeScript only.
- Never use `any`.
- Follow ESLint and Prettier.
- Prefer functional components.
- Keep functions under ~50 lines when possible.
- Use descriptive names.
- Remove dead code before merging.

---

## React

- One component, one responsibility.
- Extract repeated logic into hooks.
- Memoize only when necessary.
- Prefer composition over prop drilling.

---

## Styling

- Tailwind CSS only.
- No inline styles.
- Reuse utility classes.

---

## TypeScript

- Define interfaces/types.
- Avoid type assertions.
- Use strict mode.

---

## Naming

Components → PascalCase

```
WeatherCard.tsx
```

Hooks

```
useWeather.ts
```

Utilities

```
formatDate.ts
```

Constants

```
API_BASE_URL
```

---

## Before Merge

- ESLint passes
- TypeScript passes
- Build succeeds
- No unused imports