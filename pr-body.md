## Summary
This PR removes accidental run logs and run-artifacts folders from the repository and adds ignore rules to prevent future commits of local logs.

## Changes
- Added `.gitignore` entries:
  - run-*.log
  - run-artifacts-*/
  - eslint-fix.log
  - build-local.log
- Removed committed files from index:
  - eslint-fix.log
  - run-19732075119.log
  - run-19732317777.log
  - run-25.log
  - run-artifacts-19732075119/*
  - run-artifacts-19732317777/*

## Verification
- `git status` is clean locally aside from untracked `build-local.log`.
- Confirmed removed files are no longer present in the repo history for current branch.

## Acceptance checklist
- [ ] `.gitignore` contains the new entries
- [ ] Removed files are not present in the repo tree
- [ ] CI passes on this branch
- [ ] At least one approval from CODEOWNERS

## Next steps after merge
- Run `npm audit` and create remediation plan (see attached `security/remediation-plan.md`).
- Optionally run `git gc` and repository maintenance if large artifacts were removed historically.

## Reviewers
- @product-owner
- @tech-lead
- @security-lead

## Secrets and environment variables required for downstream tasks
- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- PAGES_ENV_VARS
