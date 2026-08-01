Task: GitHub Actions Infrastructure Review & Hardening

Branch:
feature/github-actions-hardening

Target:
develop

Objective

Perform a complete architectural review of the entire `.github/` directory and production-harden every GitHub Actions workflow.

This is a review and improvement task.

Do not modify application code.

Do not modify React components.

Do not modify the API layer.

Only improve the GitHub infrastructure.

Review:

- .github/workflows/ci.yml
- .github/workflows/lint.yml
- .github/workflows/preview.yml

Verify the following:

• Workflow triggers
• Branch filters
• Job names
• Workflow names
• Permissions (least privilege)
• Concurrency
• Node.js version consistency
• Dependency caching
• npm ci usage
• Environment variables
• Secret usage
• Build verification
• Test verification
• Typecheck verification
• Lint verification
• Preview deployment
• Failure handling
• Duplicate logic
• Maintainability
• Security best practices
• Performance
• GitHub Actions best practices

Improve the workflows where appropriate while preserving their intended behavior.

Requirements

- Use GitHub Actions best practices.
- Use least-privilege permissions.
- Ensure workflows are deterministic.
- Ensure workflows are reusable and maintainable.
- Remove duplicated configuration where practical.
- Document every architectural improvement made.
- Do not introduce breaking workflow changes.

Validation

Verify:

- Workflows are syntactically valid.
- All workflows execute successfully.
- CI passes on `develop`.
- CI passes on feature branches.
- Preview deployment functions correctly.
- No GitHub Actions warnings remain.

Deliverables

Provide:

1. Summary of improvements
2. Files modified
3. Security improvements
4. Performance improvements
5. Maintainability improvements
6. Validation results
7. Remaining risks
8. Suggested Conventional Commit
9. Suggested Pull Request Title
10. Suggested Pull Request Description

Do not merge.

Prepare the implementation for architectural review.