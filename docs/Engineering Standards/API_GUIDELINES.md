# API Guidelines

All API communication goes through the service layer.

```
Component

↓

Hook

↓

Service

↓

API Client
```

---

## Rules

- One Axios instance.
- No API calls inside components.
- Handle errors centrally.
- Use environment variables.
- Validate responses.

---

## Services

Example

```
weather.service.ts
```

Responsibilities

- Fetch data
- Transform responses
- Throw meaningful errors

---

## Error Handling

Handle:

- Network errors
- Invalid city
- Timeout
- Rate limits