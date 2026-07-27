# CI / CD

## Goal

Automatically verify code quality and deploy the application.

---

## Continuous Integration

Every Pull Request runs:

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

---

## GitHub Actions

Workflows:

- ci.yml
- lint.yml
- preview.yml

---

## Merge Requirements

CI must pass before merging.

Blocked if:

- Build fails
- Tests fail
- ESLint fails
- TypeScript fails

---

## Continuous Deployment

```
Feature Branch

↓

Pull Request

↓

CI

↓

Merge to develop

↓

Preview Deployment

↓

Merge to main

↓

Production Deployment
```

---

## Deployment

Provider:

- Vercel

Preview:

- Every Pull Request

Production:

- Every merge to `main`