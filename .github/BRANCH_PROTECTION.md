# Branch Protection Policy — Dormio

To ensure stability, code quality, and compliance with the project's zero-regression rules, the `main` branch must have branch protection configured in GitHub.

## 1. Protected Branch: `main`

### Required Settings:

1. **Require a pull request before merging:**
   - Require approvals: `1`
   - Dismiss stale pull request approvals when new commits are pushed: `Checked`
   - Require review from CodeRabbit AI assistant.

2. **Require status checks to pass before merging:**
   - Require branches to be up to date before merging: `Checked`
   - Required status checks:
     - `ci/build` (pnpm build)
     - `ci/lint` (pnpm lint)
     - `ci/test` (pnpm test)
     - `ci/no-typescript` (bash scripts/check-no-typescript.sh)
     - `ci/ui-provenance` (bash scripts/check-ui-provenance.sh)
     - `ci/ui-rules` (bash scripts/check-ui-rules.sh)

3. **Require conversation resolution before merging:**
   - All comments, reviews, and CodeRabbit feedback must be resolved.

4. **Do not allow bypassing the above settings:**
   - Include administrators: `Checked`

5. **Disallow force pushes & branch deletions:**
   - Allow force pushes: `Unchecked` (NEVER allowed)
   - Allow deletions: `Unchecked`

## 2. GitHub CLI Setup (Owner can run once)

```bash
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/:owner/dormio/branches/main/protection \
  -f required_status_checks.strict=true \
  -f enforce_admins=true \
  -f required_pull_request_reviews.dismiss_stale_reviews=true \
  -f required_pull_request_reviews.require_code_owner_reviews=false \
  -f required_pull_request_reviews.required_approving_review_count=1 \
  -F restrictions=null
```
