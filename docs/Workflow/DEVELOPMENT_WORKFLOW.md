# Development Workflow

## Workflow

Every task follows the same lifecycle.

```
Read Docs

↓

Understand Existing Code

↓

Create Feature Branch

↓

Implement Feature

↓

Test

↓

Self Review

↓

Update Documentation

↓

Open Pull Request

↓

CI Validation

↓

Code Review

↓

Merge into develop
```

---

## Before Coding

- Read all relevant docs.
- Pull latest `develop`.
- Understand existing implementation.
- Reuse existing components first.

---

## During Development

- Work only on the assigned task.
- Keep commits focused.
- Write clean TypeScript.
- Keep components reusable.
- Handle loading, empty, and error states.

---

## Before Opening a PR

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

All commands must pass.

---

## Completion Checklist

- Feature works
- Responsive UI
- Tests updated
- Documentation updated
- Build succeeds
- Ready for review