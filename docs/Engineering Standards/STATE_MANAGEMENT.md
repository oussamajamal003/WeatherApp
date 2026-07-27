# State Management

Choose the correct tool.

| State | Solution |
|--------|----------|
| API Data | React Query |
| Theme | Context |
| Local UI | useState |
| Complex UI | useReducer |
| Persistent | Local Storage |

---

## Rules

- Server state belongs in React Query.
- Do not duplicate server state.
- Avoid unnecessary Context.
- Keep local state local.

---

## React Query

Use for:

- Current Weather
- Forecast
- Search Results

Never fetch directly inside components.

---

## Context

Use only for:

- Theme
- User Preferences