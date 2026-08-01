# Deployment

## Goal

Deploy WeatherApp automatically with a reliable CI/CD pipeline.

---

## Environments

### Development

Local machine.

### Preview

Automatic deployment for Pull Requests.

### Production

Deployment from the `main` branch.

---

## Deployment Flow

```
Feature Branch

↓

Pull Request

↓

GitHub Actions

↓

Preview Deployment

↓

Merge to main

↓

Production Deployment
```

---

## Provider

- Vercel

---

## Pre-Deployment Checklist

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

All commands must pass.

---

## Environment Variables

Configure in Vercel:

```
VITE_WEATHER_API_KEY
```

Do not expose secrets in source code.

---

## Release Process

1. Merge feature into `develop`.
2. Verify Preview Deployment.
3. Merge `develop` into `main`.
4. Automatic production deployment.

---

## Rollback

If a production issue occurs:

1. Revert the faulty commit.
2. Merge the fix.
3. Redeploy automatically.

---

## Deployment Checklist

- Build successful
- CI passing
- Environment variables configured
- Documentation updated
- Production deployment verified

---

## Security Considerations

> **Note:** The current Preview deployment workflow assumes this is a trusted/private repository. If the repository is ever made public or begins accepting contributions from external forks, the deployment strategy must be re-evaluated to prevent untrusted code from accessing deployment secrets.