# Security Remediation Plan

**Project**: my-smart-wallets-app  
**Branch**: cleanup/cloudflare-deploy  
**Author**: Ajay  
**Date**: 2025-11-28

## Summary
Brief summary of the audit findings and scope of remediation. Example: "npm audit produced X high, Y moderate advisories affecting direct and transitive dependencies. This plan prioritizes fixes, mitigations, and verification steps."

## Findings Overview
- **High severity**: list packages and short description of issue; indicate direct or transitive.
- **Moderate severity**: list packages.
- **Low severity**: list packages.

## Prioritization and Rationale
1. **Critical / High** — fix immediately; block releases until resolved or mitigated.
2. **Medium** — schedule within sprint; require PR and tests.
3. **Low** — track and resolve in routine dependency updates.

## Remediation Actions
For each finding include:
- **Package**: package-name
- **Severity**: High/Medium/Low
- **Type**: direct / transitive
- **Recommended fix**: upgrade to version X; apply override; replace package; remove usage
- **Owner**: @github-handle
- **ETA**: date
- **Verification**: tests to run, commands, expected result

Example entry
- **Package**: lodash
- **Severity**: High
- **Type**: transitive (via package-a)
- **Recommended fix**: upgrade package-a to version >= X which depends on patched lodash; if not available, add `overrides` in package.json to force lodash@patched-version and open PR to upstream.
- **Owner**: @dev-lead
- **ETA**: 3 business days
- **Verification**: `npm ci && npm audit --production` shows no high/critical; run unit tests.

## Temporary Mitigations
- Add runtime WAF rules or input validation for issues that cannot be patched immediately.
- Restrict access to vulnerable endpoints until fix is deployed.

## Testing and Verification
- Commands:
  - `npm ci`
  - `npm audit --json > npm-audit-report.json`
  - `npx markdownlint-cli2 "playbook/**/*.md"` (for docs)
- Acceptance: no high/critical advisories; CI passes; smoke tests green.

## Change Log
- Record PR links, commit hashes, and verification notes for each fix.

## Phase 2 — @tanstack form-core remediation

- **chore/upgrade-tanstack-form-core**
  - PR: https://github.com/opsvantagedigi/my-smart-wallets-app/pull/10
  - Purpose: Upgrade form-related `@tanstack` packages and ensure `@tanstack/form-core` resolves to `>=0.42.1` to remediate GHSA-ggv3-vmgw-xv2q (prototype pollution).
  - Changes: added direct dependencies `@tanstack/react-form@^0.42.1`, `@tanstack/zod-form-adapter@^0.42.1` and an `overrides` entry to force `@tanstack/form-core@0.42.1` during resolution.
  - Verification:
    - Run `npm install` to update the lockfile
    - Run `npm ci && npm audit --production` — expected: the `@tanstack/form-core` advisory is cleared
    - Run `npm run smoke` (form-flow smoke tests) — expected: form flows behave correctly
  - Owner: @Ajay
  - ETA: 2025-12-04
  - Notes: Audit output after applying these changes confirmed the `@tanstack` advisory removed; remaining high advisories pertain to `sanity`/`glob` and are tracked in Phase 1 PRs.

## Risk Register
- For any advisory without an immediate fix, document risk, compensating controls, and review cadence.

## Approvals
- Security Lead: @security-lead
- Tech Lead: @tech-lead
- Product Owner: @product-owner
