# Git Workflow

## Branch Strategy

```
main
│
develop
│
├── feature/*
├── fix/*
├── refactor/*
├── docs/*
├── test/*
├── ci/*
└── chore/*
```

---

## Rules

- Never commit directly to `main`.
- Never work directly on `develop`.
- Every task gets its own branch.
- Every merge requires a Pull Request.
- CI must pass before merging.

---

## Branch Naming

```
feature/current-weather
feature/search
feature/favorites

fix/mobile-layout
fix/api-error

docs/readme

refactor/weather-card

test/search

ci/github-actions

chore/update-dependencies
```

---

## Commit Convention

```
feat(search): add city search

fix(api): handle invalid response

docs: update architecture

refactor(card): simplify component

test(search): add unit tests

ci: add GitHub Actions
```

---

## Merge Flow

```
develop

↓

feature/search

↓

Pull Request

↓

Review

↓

CI Pass

↓

Merge into develop

↓

Release

↓

main
```