# FIGMA_IMPLEMENTATION_RULES.md

# Purpose

The `Design/` directory contains the approved WeatherApp Design System.

It is the **single source of truth** for every visual aspect of the application.

Every React implementation must faithfully reproduce the approved design.

The screenshots inside this directory are implementation specifications, not inspiration.

---

# Source of Truth

The priority order is:

1. Design screenshots in `Design/`
2. Design specifications in `Design/Specs/`
3. This document
4. Project engineering standards

If two screenshots appear inconsistent:

- Stop.
- Document the ambiguity.
- Request clarification.

Never guess.

---

# Implementation Rules

Developers must:

- Match the approved design as closely as practical.
- Follow every screenshot in the corresponding folder.
- Reuse existing components whenever possible.
- Keep components modular and reusable.
- Follow Atomic Design principles.
- Follow the existing project architecture.
- Follow `docs/` engineering standards.

---

# Prohibited

Never:

- Invent missing UI.
- Redesign components.
- Change layouts.
- Modify spacing.
- Modify typography.
- Modify colors.
- Modify shadows.
- Modify elevation.
- Modify radius.
- Modify animation.
- Modify responsive behavior.
- Create new component variants that are not documented.
- Approximate measurements when specifications exist.

---

# Visual Fidelity

The goal is production-quality implementation.

Every implemented component should match the approved design in:

- Layout
- Alignment
- Positioning
- Spacing
- Typography
- Color
- Border Radius
- Elevation
- Shadow
- Icons
- States
- Theme

Pixel-perfect implementation is expected where practical.

---

# Responsive Rules

Responsive behavior must follow the approved layouts.

Support:

- Mobile
- Tablet
- Desktop

Do not invent breakpoints.

Use only the documented responsive layouts.

---

# Theme Rules

Implement:

- Light Theme
- Dark Theme

Theme switching must follow the documented variables.

Never hardcode theme colors.

Use semantic tokens.

---

# Components

Every reusable component must match the approved component library.

Implement:

- Variants
- Sizes
- States
- Accessibility
- Keyboard navigation
- Loading
- Empty
- Error

Only if documented.

---

# Assets

Icons, illustrations, gradients and imagery must match the approved design.

Do not substitute assets without approval.

---

# Ambiguity Policy

If any screenshot is ambiguous:

Stop implementation.

Document:

- Screenshot
- Component
- Missing information
- Blocking issue

Do not invent UI.

---

# Screenshot Usage

Treat every screenshot as a specification.

Developers should inspect every screenshot before implementing the corresponding feature.

Screenshots should be consulted continuously during development.

---

# Completion Criteria

A component is complete only when:

- It matches the approved screenshots.
- It follows project coding standards.
- It passes lint.
- It passes type checking.
- It passes tests.
- It passes build.
- It satisfies accessibility requirements.
- It satisfies responsive requirements.

---

# Final Rule

The Design directory defines the visual contract.

React is the implementation.

The implementation must adapt to the design.

The design must never be adapted to simplify implementation.