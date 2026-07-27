# UI Guidelines

## Goal

Build a clean, modern, responsive, and accessible user interface with a consistent design system.

---

## Design Principles

- Simple
- Consistent
- Responsive
- Accessible
- Reusable

---

## Color Palette

### Primary

- Sky Blue
- Indigo

### Neutral

- White
- Gray
- Slate

### Status

- Green → Success
- Yellow → Warning
- Red → Error

Use Tailwind color tokens instead of hardcoded values.

---

## Typography

Use a clear visual hierarchy.

- H1
- H2
- H3
- Body
- Small text

Avoid inconsistent font sizes.

---

## Spacing

Use Tailwind spacing scale.

Examples:

```
p-4
m-6
gap-4
space-y-6
```

Avoid arbitrary values unless necessary.

---

## Components

Reusable components only.

Examples:

- Button
- Card
- Input
- Modal
- WeatherCard
- ForecastCard
- SearchBar

---

## Responsive Design

Support:

- Mobile
- Tablet
- Desktop

Use Tailwind breakpoints.

---

## Accessibility

- Keyboard navigation
- Visible focus states
- Labels for inputs
- Sufficient color contrast
- Semantic HTML

---

## States

Every feature should support:

- Loading
- Empty
- Error
- Success

---

## Icons

Use **Lucide React** consistently.

---

## Animations

Keep animations subtle.

Use for:

- Page transitions
- Card appearance
- Loading indicators

Avoid excessive motion.

---

## UI Checklist

- Responsive
- Accessible
- Consistent spacing
- Consistent colors
- Reusable components
- Loading/Error states implemented