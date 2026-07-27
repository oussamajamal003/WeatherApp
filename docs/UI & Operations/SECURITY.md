# Security

## Goal

Protect application secrets, user data, and project integrity.

---

## Environment Variables

Store secrets in:

```
.env.local
```

Never commit:

- API keys
- Tokens
- Secrets
- Passwords

Commit only:

```
.env.example
```

---

## API Keys

- Use environment variables.
- Never hardcode keys.
- Rotate keys if exposed.

Example:

```
VITE_WEATHER_API_KEY=
```

---

## Git Rules

Never commit:

- .env
- node_modules
- Build output
- Personal credentials

Ensure `.gitignore` is up to date.

---

## Dependencies

- Install only trusted packages.
- Keep dependencies updated.
- Remove unused packages.

---

## HTTP

- Use HTTPS endpoints.
- Validate API responses.
- Handle request failures gracefully.

---

## Validation

Validate:

- User input
- Search values
- API responses

Do not trust external data.

---

## Security Checklist

- No secrets committed
- Environment variables used
- HTTPS only
- Input validated
- Dependencies reviewed