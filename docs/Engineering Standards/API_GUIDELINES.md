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
---

## Offline Retry Strategy

WeatherApp relies exclusively on React Query's native capabilities for its offline strategy. Because the application currently performs only **read (GET)** operations, there is no need for a durable offline mutation queue.

### Built-In Capabilities Used:
- **Automatic Retries:** React Query handles exponential backoff and refetches when connectivity is restored.
- **Cached Data Reuse:** Stale data is kept on the screen while offline to maintain usability without showing immediate error states.
- **Manual Retry:** Recoverable error states expose a 'Retry' action that simply invokes the query's existing \efetch()\ mechanism.

> [!NOTE]
> Do **not** implement a custom offline request queue. If write operations (e.g., cloud-sync, preferences) are introduced in the future, a dedicated mutation queue should be designed at that time.
