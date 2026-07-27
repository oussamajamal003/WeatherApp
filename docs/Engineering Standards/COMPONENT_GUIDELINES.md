# Component Guidelines

## Principles

- Single Responsibility.
- Small and reusable.
- UI only whenever possible.

---

## Structure

```
Component/
├── Component.tsx
├── Component.test.tsx
├── Component.types.ts
└── index.ts
```

---

## Rules

- No API calls inside components.
- No business logic inside UI.
- Keep props minimal.
- Reuse common components.

---

## Good Components

- Button
- Card
- Modal
- Input
- WeatherCard
- ForecastCard

---

## Avoid

- Large components
- Duplicate UI
- Hardcoded values